import { memo } from "react";
import Loader from "../../../components/loader";

import Slider from "react-slick";
import { useGetAllCategory } from "../../../api/categories/queries";
import { useNavigate } from "react-router-dom";

const settings = {
  slidesToShow: 3,
  slidesToScroll: 3,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
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

const CategoryListHome = memo(function CategoryListHome() {
  const { data, isLoading } = useGetAllCategory();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div className="mx-5 sm:mx-10 my-10">
      <Slider className="flex sm:space-x-5" {...settings}>
        {data?.slice(0, 5).map((category) => {
          return (
            <div
              onClick={() => navigate(`/search?category=${category.name}`)}
              className="flex bg-gradient-to-br from-purple-400 to-violet-500 hover:to-violet-700 h-32 shadow-md p-5 rounded-lg"
            >
              <p className="text-white font-bold tracking-widest uppercase">
                {category.name}
              </p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
});

export default CategoryListHome;
