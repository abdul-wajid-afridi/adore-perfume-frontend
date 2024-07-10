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
              <SignUpForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Tabs activeTab={activeTab} onTabClick={setActiveTab} />
    </div>
  );
});

export type User = {
  name: string;
  email: string;
};

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3, "name must be at least 3 characters"),
});

type FormValues = z.infer<typeof formSchema>;

// this is the actual SignInForm to be used at the top
const LoginForm = memo(function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const submitUserSignInForm = useCallback(async function submitUserSignInForm(
    data: FormValues
  ) {
    console.log(data);
  },
  []);

  return (
    <form
      className="flex flex-col gap-4 border p-5 md:p-10 my-10 rounded-md shadow-md"
      onSubmit={handleSubmit(submitUserSignInForm)}
    >
      <Input {...register("name")} placeholder="First name" />
      {errors.name && <div className="text-red-500">{errors.name.message}</div>}

      <Input {...register("email")} placeholder="Email" />
      {errors.email && (
        <div className="text-red-500">{errors.email.message}</div>
      )}

      <Button type="submit" className="">
        {isSubmitting ? <Loader color="bg-secondary" /> : "Login"}
      </Button>
    </form>
  );
});

export default SignInForm;
