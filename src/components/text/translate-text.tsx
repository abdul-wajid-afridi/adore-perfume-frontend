import { motion, AnimatePresence } from "framer-motion";
import { memo, useEffect, useState } from "react";

const TextTransition = memo(function TextTransition() {
  const textItems = [
    "hi fellows ",
    "we are Adore parfum",
    "we provide",
    "Free shipping",
  ];

  // keep a counter of the number of cycles
  const [count, setCount] = useState(1);

  useEffect(
    function animatedTextOnEveryProvidedSeconds() {
      const timer = setInterval(() => {
        setCount(count + 1);
      }, 3000);
      // clearing interval
      return () => clearInterval(timer);
    },
    [count]
  );

  return (
    <>
      {/* add `mode="wait"` here to wait for the old component to exit before adding the new one */}
      <AnimatePresence mode="wait">
        <motion.span
          key={count}
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          exit={{ y: -100 }}
        >
          <span className="text-xs bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            {textItems[count % 4]}
          </span>
        </motion.span>
      </AnimatePresence>
    </>
  );
});

export default TextTransition;
