import { memo } from "react";
import HorizontalScrollCarousel from "../../components/scroll-carousel/horizontal-scroll-carousel";
import Slider from "./components/slider";
import OurCollections from "./components/our-collections";
import NewArrivals from "./components/new-arrivals";

const HomePage = memo(function HomePage() {
  return (
    <div>
      <Slider />
      <HorizontalScrollCarousel />
      <NewArrivals />
      <OurCollections />
    </div>
  );
});

export default HomePage;
