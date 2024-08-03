import { memo } from "react";
import { useGetBestSellingProducts } from "../../api/products/queries";
import Loader from "../../components/loader";
import ProductCard from "../../components/cards/product-card";
import { BASE_URL } from "../../constants/urls";
import PageBanner from "../../components/banner";

const BestSelling = memo(() => {
  const { data, isLoading } = useGetBestSellingProducts();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="big" />
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <PageBanner bannerImages="/banner/car.jpg" title="Best Selling" />
      {data?.length == 0 && <h2 className="my-10">No products found</h2>}
      <div className="grid justify-center gap-5 sm:grid-cols-2 lg:grid-cols-3 px-5 sm:px-10 my-10">
        {data?.map((cat) => {
          return (
            <ProductCard
              key={cat.id}
              id={cat.id!}
              name={cat.name}
              price={cat.price!}
              src={`${BASE_URL}/${
                cat.productImage && cat.productImage[0]?.image
              }`}
            />
          );
        })}
      </div>
    </div>
  );
});

export default BestSelling;
