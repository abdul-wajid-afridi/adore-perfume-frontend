import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Loader } from "lucide-react";

export type User = {
  name: string;
  email: string;
  address: string;
  password: string;
  phone: string;
};

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3, "name must be at least 3 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  password: z.string().min(4, "password must be at least 4 characters"),
  phone: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const SignUpForm = memo(function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const submitUserRegistrationForm = useCallback(
    async function submitUserRegistrationForm(data: FormValues) {
      console.log(data);
    },
    []
  );

  return (
    <form
      className="flex flex-col gap-4 border p-5 md:p-10 my-10 rounded-md shadow-md"
      onSubmit={handleSubmit(submitUserRegistrationForm)}
    >
      <Input {...register("name")} placeholder="First name" />
      {errors.name && <div className="text-red-500">{errors.name.message}</div>}

      <Input {...register("email")} placeholder="Email" />
      {errors.email && (
        <div className="text-red-500">{errors.email.message}</div>
      )}

      <Input {...register("address")} placeholder="Address" />
      {errors.address && (
        <div className="text-red-500">{errors.address.message}</div>
      )}
      <Input {...register("password")} placeholder="Password" />
      {errors.password && (
        <div className="text-red-500">{errors.password.message}</div>
      )}
      <Input {...register("phone")} placeholder="Phone No" />
      {errors.phone && (
        <div className="text-red-500">{errors.phone.message}</div>
      )}

      <Button type="submit" className="">
        {isSubmitting ? <Loader color="bg-secondary" /> : "Sign-Up"}
      </Button>
    </form>
  );
});

export default SignUpForm;
