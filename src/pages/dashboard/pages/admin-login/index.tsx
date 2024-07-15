import { memo, useCallback } from "react";

import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Loader from "../../../../components/loader";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/hook";
import { useMutation } from "@tanstack/react-query";
import { asyncLoginUsers } from "../../../../api/user/fetchers";

export type User = {
  password: string;
  email: string;
  role: string;
};

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "password is required"),
  role: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const AdminSignInForm = memo(function Form() {
  const { loading } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const loginUserMutation = useMutation({
    mutationFn: asyncLoginUsers,
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "admin@gmail.com",
      password: "123456",
      role: "ADMIN",
    },
    resolver: zodResolver(formSchema),
  });

  return (
    <form
      className="flex justify-center items-center"
      onSubmit={handleSubmit(
        useCallback(
          async function submitUserSignInForm(user: FormValues) {
            loginUserMutation.mutate(user);
          },
          [loginUserMutation.mutate]
        )
      )}
    >
      <div className="flex flex-col gap-4 w-full lg:w-1/2 border mx-5 p-5 md:p-10 my-10 rounded-md shadow-md">
        <Input {...register("email")} placeholder="Email" />
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}

        <Input {...register("password")} placeholder="Password" />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}

        <Button type="submit">
          {loading ? <Loader color="bg-secondary" /> : "Login"}
        </Button>
      </div>
    </form>
  );
});

export default AdminSignInForm;
