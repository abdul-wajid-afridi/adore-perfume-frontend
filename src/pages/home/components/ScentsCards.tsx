// import { memo } from "react";

// import { Button } from "../../../components/ui/button";
// import { useNavigate } from "react-router-dom";

// const ScentsHomeCards = memo(function ScentsHomeCards() {
//   const navigate = useNavigate();

//   return (
//     <div className="mb-10 sm:mb-20">
//       <h2 className="">Discover your signature scent</h2>
//       <p className="text-center text-sm text-slate-500 mt-5">
//         A scent that matches your personality.
//       </p>
//       <div className="gallery px-5 sm:w-[70vw] md:h-screen m-auto pt-20">
//         <figure className="gallery__item gallery__item--1">
//           <img src="/images/flower.jpg" alt="img" className="gallery__img" />
//         </figure>
//         <figure className="gallery__item gallery__item--3">
//           <img src="/images/lemon.jpg" alt="img" className="gallery__img" />
//         </figure>
//         <figure className="gallery__item gallery__item--4">
//           <img src="/images/fruit.jpg" alt="img" className="gallery__img" />
//         </figure>
//         <figure className="gallery__item gallery__item--6">
//           <img src="/images/aqua.jpg" alt="img" className="gallery__img" />
//         </figure>
//         <div className="flex justify-center items-center sm:w-[70vw]">
//           <Button
//             onClick={() => navigate("/scent")}
//             className=" w-[300px] h-[45px] rounded-full text-xs uppercase tracking-widest"
//           >
//             discover all scents
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// });

// export default ScentsHomeCards;

import { memo } from "react";

import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";

const ScentsHomeCards = memo(function ScentsHomeCards() {
  const navigate = useNavigate();

  return (
    <div className="px-5 sm:px-0 mb-10 sm:mb-20">
      <h2 className="">Discover your signature scent</h2>
      <p className="text-center text-sm text-slate-500 mt-5">
        A scent that matches your personality.
      </p>
      <div className="gallery sm:w-[90vw] m-auto pt-20">
        <figure className="gallery__item gallery__item--1 relative">
          <img src="/images/floral.jpg" alt="img" className="gallery__img" />
          <h1 className="absolute top-[40%] right-[20%] sm:right-[28%]  sm:text-5xl md:text-7xl z-50 text-white">
            Floral
          </h1>
        </figure>
        <figure className="gallery__item gallery__item--3 relative">
          <h1 className="absolute top-[40%] right-[20%] sm:right-[28%]  sm:text-5xl md:text-7xl z-50 text-white">
            woody
          </h1>
          <img src="/images/woody.jpg" alt="img" className="gallery__img" />
        </figure>
        <figure className="gallery__item gallery__item--4 relative">
          <h1 className="absolute top-[40%] right-[20%] sm:right-[28%]  sm:text-5xl md:text-7xl z-50 text-white">
            amber
          </h1>
          <img src="/images/amber.jpg" alt="img" className="gallery__img" />
        </figure>
        <figure className="gallery__item gallery__item--6 relative">
          <img src="/images/citrust.jpg" alt="img" className="gallery__img" />
          <h1 className="absolute top-[40%] right-[20%] sm:right-[28%]  sm:text-5xl md:text-7xl z-50 text-white">
            citrus
          </h1>
        </figure>
      </div>
      <div className="flex justify-center items-center sm:w-[90vw] m-auto mb-10">
        <Button
          onClick={() => navigate("/scent")}
          className=" w-[300px] h-[45px] rounded-full text-xs uppercase tracking-widest"
        >
          discover all scents
        </Button>
      </div>
    </div>
  );
});

export default ScentsHomeCards;
