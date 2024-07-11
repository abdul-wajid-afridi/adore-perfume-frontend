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
import axios from "axios";
import { BASE_URL } from "../../constants/urls";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
});

type FormValues = z.infer<typeof formSchema>;

// this is the actual SignInForm to be used at the top
const LoginForm = memo(function Form() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const submitUserSignInForm = useCallback(
    async function submitUserSignInForm(data: FormValues) {
      try {
        await axios.post(`${BASE_URL}/api/v1/login`, {
          ...data,
          role: "USER",
        });
        navigate("/cart");
      } catch (error: any) {
        toast.error(error.response.data.error);
      }
    },
    [navigate]
  );

  return (
    <form
      className="flex flex-col gap-4 border p-5 md:p-10 my-10 rounded-md shadow-md"
      onSubmit={handleSubmit(submitUserSignInForm)}
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
        {isSubmitting ? <Loader color="bg-secondary" /> : "Login"}
      </Button>
    </form>
  );
});

export default SignInForm;
