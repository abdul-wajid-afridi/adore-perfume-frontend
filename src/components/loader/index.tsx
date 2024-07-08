import { motion } from "framer-motion";
import { memo } from "react";

type TLoaderProps = {
  size?: "small" | "default" | "big";
  color?: string;
};

const Loader = memo(function Loader(propsTemp: TLoaderProps) {
  const { size = "small", ...props } = propsTemp;

  const variants = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 1,
        ease: "linear",
      },
    },
  } as const;
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      {/* use array of map where to pass number and size for it using dynamic */}

      <motion.div
        variants={variants}
        className={`rounded-full ${props.color ? props.color : "bg-primary"} ${
          size === "small"
            ? "h-2 w-2"
            : size === "default"
            ? "h-4 w-4"
            : "h-8 w-8"
        }`}
      />
      <motion.div
        variants={variants}
        className={`rounded-full ${props.color ? props.color : "bg-primary"} ${
          size === "small"
            ? "h-2 w-2"
            : size === "default"
            ? "h-4 w-4"
            : "h-8 w-8"
        }`}
      />
      <motion.div
        variants={variants}
        className={`rounded-full ${props.color ? props.color : "bg-primary"} ${
          size === "small"
            ? "h-2 w-2"
            : size === "default"
            ? "h-4 w-4"
            : "h-8 w-8"
        }`}
      />
    </motion.div>
  );
});

export default Loader;
