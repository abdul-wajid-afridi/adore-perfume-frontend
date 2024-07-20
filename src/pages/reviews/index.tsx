import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useMutation } from "@tanstack/react-query";
import Loader from "../../components/loader";
import { asyncAddReviews } from "../../api/reviews/fetchers";

const ReviewsFormSchema = z.object({
  name: z.string().min(3, "name is required"),
  email: z.string().email(),
  message: z.string().min(3, "message is required"),
  stars: z.number(),
  image: z.any(),
});

type FormValues = z.infer<typeof ReviewsFormSchema>;
const ReviewsPage = memo(function ReviewsPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(ReviewsFormSchema),
  });

  const reviewsMutation = useMutation({
    mutationFn: asyncAddReviews,
    onSuccess: () => {
      reset();
    },
  });

  return (
    <>
      <h2 className="my-10">Add Reviews</h2>

      <form
        className="flex justify-center items-center"
        onSubmit={handleSubmit(
          useCallback(
            async function submitCOntactUsForm(data: FormValues) {
              const formData = new FormData();
              formData.append("name", data.name);
              formData.append("email", data.email);
              formData.append("message", data.message);
              formData.append("image", data.image[0]);
              formData.append("stars", data.stars as any);
              reviewsMutation.mutate(formData as any);
            },
            [reviewsMutation.mutate]
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

          <Input type="file" {...register("image")} placeholder="image" />

          <Input
            {...register("message")}
            placeholder="Message..."
            className="h-20"
          />
          {errors.message && (
            <p className="text-red-500 text-xs">{errors.message.message}</p>
          )}
          <StarRating
            register={{ ...register("stars") }}
            setValue={setValue}
            name="stars"
          />

          <Button type="submit">
            {isSubmitting ? <Loader color="bg-secondary" /> : "Add Review"}
          </Button>
        </div>
      </form>
    </>
  );
});

type TStarProps = {
  filled: any;
  onClick?: () => void;
  size?: string;
};
export const Star = memo((props: TStarProps) => {
  return (
    <span
      onClick={props.onClick}
      className={`cursor-pointer ${props.size} ${
        props.filled ? "text-[#FFD700]" : "text-[#CCC]"
      }`}
    >
      ★
    </span>
  );
});

type TStarRatingProps = {
  register: any;
  setValue: any;
  name: string;
};
const StarRating = memo((props: TStarRatingProps) => {
  const [rating, setRating] = useState(0);

  const handleClick = (value: number) => {
    setRating(value);
    props.setValue(props.name, value);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          size="text-2xl sm:text-3xl"
          key={value}
          filled={value <= rating}
          onClick={() => handleClick(value)}
        />
      ))}
    </div>
  );
});

export default ReviewsPage;
