import { motion, AnimatePresence } from "framer-motion";
import { memo, useEffect, useState } from "react";

const TextTransition = memo(function TextTransition() {
  const textItems = [
    // please always keep upto 4 words in each index because we kept initial={{ x: 50 }} so that  it does not jerk the view on mobile screen of customization screen
    "Personalise your name on the perfumes bottles for free.",
    "Discover our latest creations",
    "Free Shipping UAE & KSA orders over 200 AED. Other GCC 500 AED",
    "buy now pay later via Tabby",
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
          initial={{ y: 0 }}
          animate={{ x: 0 }}
          exit={{ y: -50 }}
        >
          <span className="text-xs text-white">
            {/* <span className="text-xs bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text"> */}
            {textItems[count % 4]}
          </span>
        </motion.span>
      </AnimatePresence>
    </>
  );
});

export default TextTransition;
