import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { asyncAddContactUs } from "../../api/contact-us/fetchers";
import { SocialMediaIcons } from "../../components/footer";
import Loader from "../../components/loader";
import { companyData } from "../../constants/data";

const contactFormSchema = z.object({
  name: z.string().min(3, "name is required"),
  email: z.string().email(),
  message: z.string().min(3, "message is required"),
  subject: z.string().optional(),
});

type FormValues = z.infer<typeof contactFormSchema>;
const ContactUs = memo(function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const contactUsMutation = useMutation({
    mutationFn: asyncAddContactUs,
    onSuccess: () => {
      reset();
    },
  });

  return (
    <>
      <h2>Contact Us</h2>
      <p className="text-center my-5 text-xs">
        For More information, details, about our products, collections and
        offers please contact:
      </p>
      <div className="flex justify-center text-sm">
        <div className="flex flex-col my-10 gap-10 divide-primary divide-y-[1px] space-y-4">
          {/* address */}
          <div className="flex">
            <div className="w-[150px]">
              <p>UAE</p>
            </div>
            <div className="flex flex-col gap-5">
              <p className="flex gap-10">
                ADDRESS
                <span className="text-slate-500">{companyData.address}</span>
              </p>

              <p className="flex gap-10">
                PHONE
                <span className="text-slate-500">{companyData.phone}</span>
              </p>
            </div>
          </div>
          {/* social media */}

          <div className="flex py-5">
            <div className="w-[150px] ">
              <p>SOCIAL MEDIA</p>
            </div>
            <SocialMediaIcons />
          </div>
        </div>
      </div>

      <h2>get in touch</h2>

      <form
        className="flex justify-center items-center"
        onSubmit={handleSubmit(
          useCallback(
            async function submitContactUsForm(data: FormValues) {
              contactUsMutation.mutate(data);
            },
            [contactUsMutation.mutate]
          )
        )}
      >
        <div className="flex flex-col gap-4 w-full lg:w-1/2 border mx-5 p-5 md:p-10 my-10 rounded-md shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2">
            <div>
              <Input {...register("name")} placeholder="First name" />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Input {...register("email")} placeholder="Email" />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>
          </div>

          <Input {...register("subject")} placeholder="Subject" />
          {errors.subject && (
            <p className="text-red-500 text-xs">{errors.subject.message}</p>
          )}
          <Input
            {...register("message")}
            placeholder="Message..."
            className="h-20"
          />
          {errors.message && (
            <p className="text-red-500 text-xs">{errors.message.message}</p>
          )}

          <Button type="submit">
            {isSubmitting ? <Loader color="bg-secondary" /> : "contact-us"}
          </Button>
        </div>
      </form>
    </>
  );
});

export default ContactUs;
