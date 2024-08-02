// import { Dispatch, SetStateAction, memo, useCallback, useState } from "react";

// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown, ChevronUp } from "lucide-react";

// const OurCollections = memo(function OurCollections() {
//   const [expanded, setExpanded] = useState<boolean | number>(false);

//   const accordionData = [
//     {
//       title: "Woody Fragrances",
//       description:
//         " Discover the rich and earthy notes of our woody fragrances. Indulge in the warm and comforting scents of sandalwood, cedarwood, and vetiver, bringing a touch of nature to your everyday life.",
//     },
//     {
//       title: "Citrus Fragrances",
//       description:
//         "Refresh and revitalize with our citrus-inspired scents. Enjoy the zesty and invigorating aromas of lemon, orange, and grapefruit, perfect for a burst of energy.",
//     },
//     {
//       title: "Dive into Refreshing Elegance",
//       description:
//         "Dive into a realm of Aqua Perfumes, where scents evoke freshness and vitality. Experience the essence of nature with every spray.",
//     },
//     {
//       title: "Revitalize Your Regimen",
//       description:
//         "Nurture your body with our luxurious body care range. Immerse yourself in self-care rituals that embrace your skin with gentle nourishment.",
//     },
//     {
//       title: "Floral Fragrances",
//       description:
//         "Immerse yourself in the delicate and captivating scents of our floral perfumes. Experience the essence of blooming gardens with notes of rose, jasmine, and lavender.",
//     },
//   ];

//   return (
//     <>
//       <h2 className="my-5 sm:my-8">our collection</h2>
//       <div className="flex flex-wrap gap-10 px-5 sm:px-10 my-10 sm:my-14 md:h-[500px]">
//         <div className="flex flex-col w-full md:w-[50%]">
//           {accordionData.map((item, i) => (
//             <Accordion
//               key={i}
//               i={i}
//               expanded={expanded}
//               setExpanded={setExpanded}
//               title={item.title}
//               description={item.description}
//             />
//           ))}
//         </div>
//         <div className="flex w-full md:w-[40%]">
//           <img
//             src="/images/collection.jpg"
//             alt="collection image"
//             className="aspect-video"
//           />
//         </div>
//       </div>
//     </>
//   );
// });

// type TAccordionProps = {
//   i: number;
//   expanded: boolean | number;
//   setExpanded: Dispatch<SetStateAction<boolean | number>>;
//   title: string;
//   description: string;
// };

// const Accordion = memo((props: TAccordionProps) => {
//   const isOpen = props.i === props.expanded;

//   return (
//     <>
//       <motion.div
//         initial={false}
//         onClick={useCallback(
//           function expandAccordion() {
//             props.setExpanded(isOpen ? false : props.i);
//           },
//           [isOpen, props.i, props.expanded]
//         )}
//       >
//         <p className="p-2 flex bg-secondary text-primary justify-between rounded-t-md mt-3 cursor-pointer">
//           {props.title} <span>{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
//         </p>
//       </motion.div>
//       <AnimatePresence initial={false}>
//         {isOpen && (
//           <motion.section
//             initial="collapsed"
//             animate="open"
//             exit="collapsed"
//             variants={{
//               open: { opacity: 1, height: "auto" },
//               collapsed: { opacity: 0, height: 0 },
//             }}
//             transition={{
//               duration: 0.5,
//               ease: [0.42, 0, 0.58, 1],
//             }}
//           >
//             <p className="text-sm p-2 cursor-pointer bg-secondary text-primary mb-3 rounded-b-md">
//               {props.description}
//             </p>
//           </motion.section>
//         )}
//       </AnimatePresence>
//     </>
//   );
// });

// export default OurCollections;

import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";

const OurCollections = memo(function OurCollections() {
  const navigate = useNavigate();

  const collectionData = [
    {
      title: "Women's Collection",
      description: "A Sensitive Touch JUST FOR HER",
      img: "/images/men.jpg",
      link: "/search?category=men",
    },

    {
      title: "Citrus Fragrances",
      description: "Wear It With Style JUST FOR HIM",
      img: "/images/women.jpg",
      link: "/search?category=women",
    },
  ];

  return (
    <>
      <h2 className="my-5 sm:my-8">Naturally Luxurious Fragrances</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-5 sm:p-10 items-center md:h-screen bg-black">
        {collectionData.map((col) => {
          return (
            <div className="flex flex-col justify-center items-center h-[500px] text-white border border-slate-200/20 group">
              <img
                src={col.img}
                alt={col.title}
                className="w-full h-[300px] group-hover:opacity-60  transition-all duration-300"
              />
              <div className="flex flex-col gap-3 sm:gap-6">
                <h2>{col.title}</h2>
                <p>{col.description}</p>
                <Button
                  onClick={() => navigate(col.link)}
                  className="py-5 rounded-full hover:translate-y-2 transition-all duration-300"
                >
                  Browse the collection
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
});

export default OurCollections;
