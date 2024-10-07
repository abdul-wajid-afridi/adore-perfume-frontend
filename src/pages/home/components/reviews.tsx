import { memo } from "react";
import { useGetVisibleReviews } from "../../../api/reviews/queries";
import Loader from "../../../components/loader";
import { Star } from "../../reviews";
import { BASE_URL } from "../../../constants/urls";
import { UserCircle } from "lucide-react";
import Slider from "react-slick";

const settings = {
  dots: true,
  // infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  // autoplay: true,
  // speed: 30000,
  // autoplaySpeed: 1000,
  // cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const HomeReview = memo(function HomeReview() {
  const { data, isLoading } = useGetVisibleReviews();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div className="lg:pl-32">
      <div className="mx-[30px] sm:mx-10 my-10 sm:my-20 sm:w-[70vw] self-center">
        <h2 className="my-10">what our clients says</h2>
        <p className="text-xs text-center mb-5 sm:mb-10">
          our clients are our first priority to provide them quality products
        </p>

        <Slider className="flex sm:space-x-4 gap-10 " {...settings}>
          {data?.slice(0, 5).map((review) => {
            return (
              <div className="flex flex-col gap-4 h-96 shadow-md rounded-lg">
                <img
                  src={BASE_URL + "/" + review.image}
                  alt={review.name}
                  className="h-full w-full"
                />
              </div>
            );
          })}
        </Slider>

        <div className="p-10 border shadow-xl my-10 sm:my-20 bg-slate-100 rounded-sm">
          <p>
            The "Our Customers Say..." page is a testament to the satisfaction
            of our customers. Here, you can read genuine feedback from our
            customers about their experiences with our products and services. We
            take pride in the quality of our products, from the handcrafted
            perfumes made from natural ingredients to the excellent customer
            service we provide. You can trust that each review is authentic, as
            we believe in transparency and honesty. Our aim is to create a
            community of happy customers who feel confident in their purchases
            and satisfied with their overall experience with us. Read through
            the reviews and discover how our products have transformed the lives
            and routines of our valued customers.
          </p>
        </div>
        {data?.map((review) => {
          return (
            <div className="flex flex-col gap-4 h-44 shadow-md p-5 rounded-lg">
              <div className="flex items-center gap-2">
                {review.image ? (
                  <img
                    src={BASE_URL + "/" + review.image}
                    alt={review.name}
                    className="h-14 w-14 rounded-full"
                  />
                ) : (
                  <UserCircle className="h-14 w-14 rounded-full" />
                )}
                <div>
                  <p className="text-xs">{review.name}</p>
                  {[1, 2, 3, 4, 5].map((it) => (
                    <Star filled={it <= review.stars} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-500">{review.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default HomeReview;
