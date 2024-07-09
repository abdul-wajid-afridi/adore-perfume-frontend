import { memo } from "react";
import HorizontalScrollCarousel from "../../components/scroll-carousel/horizontal-scroll-carousel";
import Slider from "./components/slider";
import OurCollections from "./components/our-collections";

const HomePage = memo(function HomePage() {
  return (
    <div>
      <Slider />
      <HorizontalScrollCarousel />
      <OurCollections />
    </div>
  );
});

export default HomePage;
