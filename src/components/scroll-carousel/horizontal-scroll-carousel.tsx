import { motion, useTransform, useScroll } from "framer-motion";
import { memo, useRef } from "react";

const CAROUSEL_DATA = [
  {
    url: "/home-slider/spray1.jpg",
    title: "Rashiqa",
    id: 1,
  },
  {
    url: "/home-slider/spray2.jpg",
    title: "ood",
    id: 2,
  },
  {
    url: "/home-slider/spray3.jpg",
    title: "mushq",
    id: 3,
  },
  {
    url: "/home-slider/spray4.jpg",
    title: "kiary",
    id: 4,
  },
  {
    url: "/home-slider/spray5.jpg",
    title: "smart-x",
    id: 5,
  },
  {
    url: "/home-slider/spray1.jpg",
    title: "star",
    id: 6,
  },
];

const HorizontalScrollCarousel = memo(function HorizontalScrollCarousel() {
  return (
    <div className="bg-neutral-800">
      <div className="flex h-48 items-center justify-center">
        <h2>best selling products</h2>
      </div>
      <CarouselCardsContainer />
    </div>
  );
});

const CarouselCardsContainer = memo(function CarouselCardsContainer() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {CAROUSEL_DATA.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
});

type TCardProps = { id: number; title: string; url: string };

const Card = memo(function Cards(props: { card: TCardProps }) {
  return (
    <div
      key={props.card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${props.card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black rounded-lg uppercase text-white backdrop-blur-lg">
          {props.card.title}
        </p>
      </div>
    </div>
  );
});

export default HorizontalScrollCarousel;
