import {
  Dispatch,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { motion, useMotionValue } from "framer-motion";

const SLIDER_IMAGES = [
  "/home-slider/spray1.jpg",
  "/home-slider/spray2.jpg",
  "/home-slider/spray3.jpg",
  "/home-slider/spray4.jpg",
  "/home-slider/spray5.jpg",
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 5;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

const Slider = memo(function Slider() {
  const [imgIndex, setImgIndex] = useState(0);

  const dragX = useMotionValue(0);

  useEffect(
    function SlideNextImageOnTimeInterval() {
      const intervalRef = setInterval(() => {
        const x = dragX.get();

        if (x === 0) {
          setImgIndex((pv) => {
            if (pv === SLIDER_IMAGES.length - 1) {
              return 0;
            }
            return pv + 1;
          });
        }
      }, AUTO_DELAY);

      return () => clearInterval(intervalRef);
    },
    [dragX]
  );

  const onDragEnd = useCallback(
    function onDragEnd() {
      const x = dragX.get();

      if (x <= -DRAG_BUFFER && imgIndex < SLIDER_IMAGES.length - 1) {
        setImgIndex((pv) => pv + 1);
      } else if (x >= DRAG_BUFFER && imgIndex > 0) {
        setImgIndex((pv) => pv - 1);
      }
    },
    [dragX, imgIndex]
  );

  return (
    <div className="relative overflow-hidden bg-neutral-950 py-8">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing"
      >
        <LoopImages imgIndex={imgIndex} />
      </motion.div>

      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
      <GradientEdges />
    </div>
  );
});

type TLoopImages = { imgIndex: number };

const LoopImages = memo(function LoopImages(props: TLoopImages) {
  return (
    <>
      {SLIDER_IMAGES.map((imgSrc, idx) => {
        return (
          <motion.div
            key={idx}
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            animate={{
              scale: props.imgIndex === idx ? 0.95 : 0.85,
            }}
            transition={SPRING_OPTIONS}
            className="aspect-video w-screen shrink-0 rounded-xl bg-neutral-800 object-cover"
          />
        );
      })}
    </>
  );
});

type TDotsProps = {
  imgIndex: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
};

const Dots = memo(function Dots(props: TDotsProps) {
  return (
    <div className="mt-4 flex w-full justify-center gap-2">
      {SLIDER_IMAGES.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => props.setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === props.imgIndex ? "bg-neutral-50" : "bg-neutral-500"
            }`}
          />
        );
      })}
    </div>
  );
});

const GradientEdges = memo(function GradientEdges() {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
    </>
  );
});

export default Slider;
