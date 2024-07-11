import { memo } from "react";
import ProductCard from "../../../components/cards/product-card";

const SLIDER_IMAGES = [
  "/home-slider/spray1.jpg",
  "/home-slider/spray2.jpg",
  "/home-slider/spray3.jpg",
  "/home-slider/spray4.jpg",
  "/home-slider/spray5.jpg",
];

const NewArrivals = memo(function NewArrivals() {
  return (
    <>
      <h2 className="my-10">New Arrivals</h2>
      <div className="grid justify-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-10">
        {SLIDER_IMAGES.map((it) => (
          <ProductCard key={it} name="product name" src={it} />
        ))}
      </div>
    </>
  );
});

export default NewArrivals;
