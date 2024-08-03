// import {
//   Dispatch,
//   SetStateAction,
//   memo,
//   useCallback,
//   useEffect,
//   useState,
// } from "react";
// import { motion, useMotionValue } from "framer-motion";
// import ImageSlider from "react-slick";

// const SLIDER_IMAGES = [
//   {
//     text: "Dive into the world of scent composition with our Mixology Collection",
//     img: "/home-slider/spray1.jpg",
//   },
//   {
//     text: "Every perfume set is a wish, each fragrance is noted",
//     img: "/home-slider/spray2.jpg",
//   },
//   {
//     text: "The Scent of alcohol free perfume oil is far cleaner than one with alcohol",
//     img: "/home-slider/spray3.jpg",
//   },
//   {
//     text: "pure perfume oils",
//     img: "/home-slider/spray4.jpg",
//   },
//   {
//     text: "Indulge your senses in the gentle glow of Perfume Candles",
//     img: "/home-slider/spray5.jpg",
//   },
// ];

// const ONE_SECOND = 1000;
// const AUTO_DELAY = ONE_SECOND * 5;
// const DRAG_BUFFER = 50;

// const SPRING_OPTIONS = {
//   type: "spring",
//   mass: 3,
//   stiffness: 400,
//   damping: 50,
// };

// const Slider = memo(function Slider() {
//   const [imgIndex, setImgIndex] = useState(0);

//   const dragX = useMotionValue(0);

//   useEffect(
//     function SlideNextImageOnTimeInterval() {
//       const intervalRef = setInterval(() => {
//         const x = dragX.get();

//         if (x === 0) {
//           setImgIndex((pv) => {
//             if (pv === SLIDER_IMAGES.length - 1) {
//               return 0;
//             }
//             return pv + 1;
//           });
//         }
//       }, AUTO_DELAY);

//       return () => clearInterval(intervalRef);
//     },
//     [dragX]
//   );

//   const onDragEnd = useCallback(
//     function onDragEnd() {
//       const x = dragX.get();

//       if (x <= -DRAG_BUFFER && imgIndex < SLIDER_IMAGES.length - 1) {
//         setImgIndex((pv) => pv + 1);
//       } else if (x >= DRAG_BUFFER && imgIndex > 0) {
//         setImgIndex((pv) => pv - 1);
//       }
//     },
//     [dragX, imgIndex]
//   );

//   return (
//     <div className="relative overflow-hidden">
//       <motion.div
//         drag="x"
//         dragConstraints={{
//           left: 0,
//           right: 0,
//         }}
//         style={{
//           x: dragX,
//         }}
//         animate={{
//           translateX: `-${imgIndex * 100}%`,
//         }}
//         transition={SPRING_OPTIONS}
//         onDragEnd={onDragEnd}
//         className="flex cursor-grab items-center active:cursor-grabbing"
//       >
//         <LoopImages imgIndex={imgIndex} />
//       </motion.div>

//       {/* <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} /> */}
//       {/* <GradientEdges /> */}
//     </div>
//   );
// });

// type TLoopImages = { imgIndex: number };

// const LoopImages = memo(function LoopImages(props: TLoopImages) {
//   return (
//     <>
//       {SLIDER_IMAGES.map((slider, idx) => {
//         return (
//           <motion.div
//             key={idx}
//             style={{
//               backgroundImage: `url(${slider.img})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//             // animate={
//             //   {
//             //     // scale: props.imgIndex === idx ? 0.95 : 0.85,
//             //   }
//             // }
//             transition={SPRING_OPTIONS}
//             className="aspect-video h-[60vh] w-screen shrink-0 object-cover flex justify-end items-center px-10 sm:px-20 bg-black/50 bg-blend-overlay"
//           >
//             <h2 className="sm:w-[50vw] mt-20 text-start text-white">
//               {slider.text}
//             </h2>
//           </motion.div>
//         );
//       })}
//     </>
//   );
// });

// type TDotsProps = {
//   imgIndex: number;
//   setImgIndex: Dispatch<SetStateAction<number>>;
// };

// const Dots = memo(function Dots(props: TDotsProps) {
//   return (
//     <div className="mt-4 flex w-full justify-center gap-2">
//       {SLIDER_IMAGES.map((_, idx) => {
//         return (
//           <button
//             key={idx}
//             onClick={() => props.setImgIndex(idx)}
//             className={`h-3 w-3 rounded-full transition-colors ${
//               idx === props.imgIndex ? "bg-neutral-50" : "bg-neutral-500"
//             }`}
//           />
//         );
//       })}
//     </div>
//   );
// });

// const GradientEdges = memo(function GradientEdges() {
//   return (
//     <>
//       <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
//       <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
//     </>
//   );
// });

// export default Slider;

import { memo } from "react";

const SLIDER_IMAGES = [
  {
    text: "Dive into the world of scent composition with our Mixology Collection",
    img: "/home-slider/spray1.jpg",
  },
  {
    text: "Every perfume set is a wish, each fragrance is noted",
    img: "/home-slider/spray2.jpg",
  },
  {
    text: "The Scent of alcohol free perfume oil is far cleaner than one with alcohol",
    img: "/home-slider/spray3.jpg",
  },
  {
    text: "pure perfume oils",
    img: "/home-slider/spray4.jpg",
  },
  {
    text: "Indulge your senses in the gentle glow of Perfume Candles",
    img: "/home-slider/spray5.jpg",
  },
];
import Slider from "react-slick";

const SETTINGS = {
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};
const HomeSlider = memo(() => {
  return (
    <div>
      <Slider {...SETTINGS}>
        {SLIDER_IMAGES.map((slider) => {
          return (
            <div key={slider.img} className="h-[60vh] w-screen relative">
              <img
                src={slider.img}
                alt={slider.img}
                className="h-[60vh] w-screen"
              />
              <h2 className="sm:w-[50vw] mt-20 text-start text-white absolute z-50 right-0 bottom-[30%] px-10 sm:px-20">
                {slider.text}
              </h2>
              <span className="bg-black/50 absolute inset-0" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
});

export default HomeSlider;
