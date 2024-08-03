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
    <div className="mb-10 sm:mb-20">
      <h2 className="">Discover your signature scent</h2>
      <p className="text-center text-sm text-slate-500 mt-5">
        A scent that matches your personality.
      </p>
      <div className="gallery sm:w-[90vw] m-auto pt-20">
        <figure className="gallery__item gallery__item--1">
          <img src="/images/floral.jpg" alt="img" className="gallery__img" />
        </figure>
        <figure className="gallery__item gallery__item--3">
          <img src="/images/woody.jpg" alt="img" className="gallery__img" />
        </figure>
        <figure className="gallery__item gallery__item--4">
          <img src="/images/amber.jpg" alt="img" className="gallery__img" />
        </figure>
        <figure className="gallery__item gallery__item--6">
          <img src="/images/citrust.jpg" alt="img" className="gallery__img" />
        </figure>
      </div>
      <div className="flex justify-center items-center sm:w-[90vw] m-auto my-10">
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
