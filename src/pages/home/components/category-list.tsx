import { memo } from "react";
import Loader from "../../../components/loader";

import { useGetAllCategory } from "../../../api/categories/queries";
import { useNavigate } from "react-router-dom";

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

  const bannerImages = [
    "/banner/car.jpg",
    "/banner/interior.jpg",
    "/banner/men.jpg",
    "/banner/private.jpg",
    "/banner/women.jpg",
  ];
  return (
    <div className="flex justify-center">
      <div className="mx-[30px] sm:mx-10 my-10 overflow-x-scroll no-scrollbar h-44 sm:w-[70vw] flex gap-10 ">
        {data?.slice(0, 5).map((category, ind) => {
          return (
            <div
              style={{
                backgroundImage: `url(${bannerImages[ind]})`,
              }}
              className={`flex items-center flex-col justify-center cursor-pointer bg-cover bg-center h-32 shadow-md p-5 rounded-lg aspect-video bg-black/50 bg-blend-overlay`}
              onClick={() => navigate(`/search?category=${category.name}`)}
            >
              <p className="text-white font-bold tracking-widest uppercase z-40">
                {category.name}
              </p>
              <button className="text-xs text-white border-b cursor-pointer">
                shop-now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default CategoryListHome;
