import { motion, useTransform, useScroll } from "framer-motion";
import { memo, useCallback, useRef } from "react";
import { useGetBestSellingProducts } from "../../api/products/queries";
import Loader from "../loader";
import { BASE_URL } from "../../constants/urls";
import { TProductResponse } from "../../api/products/fetchers";
import { useNavigate } from "react-router-dom";

const HorizontalScrollCarousel = memo(function HorizontalScrollCarousel() {
  return (
    <div className="bg-neutral-800">
      <div className="flex h-20 md:h-48 items-center justify-center">
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
  const { data, isLoading } = useGetBestSellingProducts();
  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {isLoading ? (
            <div className="flex justify-center w-screen">
              <Loader size="big" />
            </div>
          ) : (
            data?.map((card) => {
              return <Card card={card} key={card.id} />;
            })
          )}
        </motion.div>
      </div>
    </section>
  );
});

const Card = memo(function Cards(props: { card: TProductResponse }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={useCallback(() => {
        navigate("/product-details/" + props.card.id);
      }, [navigate, props.card.id])}
      key={props.card.id}
      className="group relative h-[350px] w-[350px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${BASE_URL}/${
            props.card?.productImage && props.card?.productImage[0]?.image
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black rounded-lg uppercase text-white backdrop-blur-lg">
          {props.card.name}
        </p>
      </div>
    </div>
  );
});

export default HorizontalScrollCarousel;
