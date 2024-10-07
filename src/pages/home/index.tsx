import { memo } from "react";
import Slider from "./components/slider";
import OurCollections from "./components/our-collections";
import NewArrivals from "./components/new-arrivals";
import CustomizePage from "../customize";
import ScentsHomeCards from "./components/ScentsCards";
import CategoryListHome from "./components/category-list";

const HomePage = memo(function HomePage() {
  return (
    <div>
      <Slider />
      <CategoryListHome />
      <ScentsHomeCards />
      {/* <HorizontalScrollCarousel /> */}
      <OurCollections />
      <CustomizePage />
      {/* new arrivals is best selling products */}
      <NewArrivals />
    </div>
  );
});

export default HomePage;
