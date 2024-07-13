import { memo, useCallback, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import Tabs from "../../components/tabs";
import SignUpForm from "../sign-up";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Loader from "../../components/loader";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hook";
import { useMutation } from "@tanstack/react-query";
import { asyncLoginUsers } from "../../api/user/fetchers";

const SignInForm = memo(function SignInForm() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex flex-col justify-center items-center gap-20 h-screen px-5">
      <div className="relative md:w-[500px] w-full">
        <AnimatePresence>
          {activeTab === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="my-4">Sign-in Form</h2>
              <LoginForm />
            </motion.div>
          )}

          {activeTab === "signup" && (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Sign-up Form</h2>
              <SignUpForm setActiveTab={setActiveTab} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Tabs activeTab={activeTab} onTabClick={setActiveTab} />
    </div>
  );
});

export type User = {
  password: string;
  email: string;
};

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "password is required"),
  role: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

// this is the actual SignInForm to be used at the top
const LoginForm = memo(function Form() {
  const { loading } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const loginUserMutation = useMutation({
    mutationFn: asyncLoginUsers,
    onSuccess: () => {
      navigate("/cart");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "wajidafridi8554@gmail.com",
      password: "123456",
      role: "USER",
    },
    resolver: zodResolver(formSchema),
  });

  return (
    <form
      className="flex flex-col gap-4 border p-5 md:p-10 my-10 rounded-md shadow-md"
      onSubmit={handleSubmit(
        useCallback(
          async function submitUserSignInForm(user: FormValues) {
            loginUserMutation.mutate(user);
          },
          [loginUserMutation.mutate]
        )
      )}
    >
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
    </form>
  );
});

export default SignInForm;
