import { memo } from "react";

import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";

const ScentsHomeCards = memo(function ScentsHomeCards() {
  const navigate = useNavigate();

  return (
    <>
      <h2 className="mt-10">Discover your signature scent</h2>
      <p className="text-center text-sm text-slate-500 mt-5">
        A scent that matches your personality.
      </p>
      <div className="gallery px-5 sm:w-[70vw] md:h-screen m-auto pt-20">
        <figure className="gallery__item gallery__item--1">
          <img src="/images/flower.jpg" alt="img" className="gallery__img" />
        </figure>
        <figure className="gallery__item gallery__item--3">
          <img src="/images/lemon.jpg" alt="img" className="gallery__img" />
        </figure>
        <figure className="gallery__item gallery__item--4">
          <img src="/images/fruit.jpg" alt="img" className="gallery__img" />
        </figure>
        <figure className="gallery__item gallery__item--6">
          <img src="/images/aqua.jpg" alt="img" className="gallery__img" />
        </figure>
        <div className="flex justify-center items-center sm:w-[70vw]">
          <Button
            onClick={() => navigate("/scent")}
            className=" w-[300px] h-[45px] rounded-full text-xs uppercase tracking-widest"
          >
            discover all scents
          </Button>
        </div>
      </div>
    </>
  );
});

export default ScentsHomeCards;
