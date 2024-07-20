import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { asyncCreateUsers } from "../../api/user/fetchers";

export type User = {
  name: string;
  email: string;
  // address: string;
  password: string;
  phoneNo: string;
};

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3, "name must be at least 3 characters"),
  // address: z.string().min(5, "Address must be at least 5 characters"),
  password: z.string().min(4, "password must be at least 4 characters"),
  phoneNo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;
type TSignUpFormProps = { setActiveTab: Dispatch<SetStateAction<string>> };
const SignUpForm = memo(function Form(props: TSignUpFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const createUserMutation = useMutation({
    mutationFn: asyncCreateUsers,
    onSuccess: () => {
      props.setActiveTab("login");
      reset();
    },
  });

  return (
    <form
      className="flex flex-col gap-4 border p-5 md:p-10 my-10 rounded-md shadow-md"
      onSubmit={handleSubmit(
        useCallback(
          async function submitUserSignInForm(user: FormValues) {
            createUserMutation.mutate(user);
          },
          [createUserMutation.mutate]
        )
      )}
    >
      <Input {...register("name")} placeholder="First name" />
      {errors.name && (
        <p className="text-red-500 text-xs">{errors.name.message}</p>
      )}

      <Input {...register("email")} placeholder="Email" />
      {errors.email && (
        <p className="text-red-500 text-xs">{errors.email.message}</p>
      )}

      {/* <Input {...register("address")} placeholder="Address" />
      {errors.address && (
        <p className="text-red-500 text-xs">{errors.address.message}</p>
      )} */}
      <Input {...register("password")} placeholder="Password" />
      {errors.password && (
        <p className="text-red-500 text-xs">{errors.password.message}</p>
      )}
      <Input {...register("phoneNo")} placeholder="Phone No" />
      {errors.phoneNo && (
        <p className="text-red-500 text-xs">{errors.phoneNo.message}</p>
      )}

      <Button type="submit">
        {isSubmitting ? <Loader color="bg-secondary" /> : "Sign-Up"}
      </Button>
    </form>
  );
});

export default SignUpForm;
