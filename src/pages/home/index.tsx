import { memo } from "react";
import HorizontalScrollCarousel from "../../components/home/horizontal-scroll-carousel";
import Slider from "./components/slider";

const HomePage = memo(function HomePage() {
  return (
    <div>
      <Slider />
      <HorizontalScrollCarousel />
    </div>
  );
});

export default HomePage;
