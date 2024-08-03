import { memo } from "react";
import ProductCard from "../../../components/cards/product-card";
import { useGetNewArrivalProduct } from "../../../api/products/queries";
import Loader from "../../../components/loader";
import { BASE_URL } from "../../../constants/urls";

const NewArrivals = memo(function NewArrivals() {
  const { data, isLoading } = useGetNewArrivalProduct();

  return (
    <div className="my-10 sm:my-20">
      <h2>Top Selling products</h2>
      <div className="grid justify-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-10 my-10">
        {isLoading ? (
          <div className="flex justify-center w-screen">
            <Loader size="big" />
          </div>
        ) : (
          data?.map((it) => (
            <ProductCard
              price={it.price!}
              id={it.id!}
              key={it.id}
              name={it.name}
              src={`${BASE_URL}/${
                it.productImage && it.productImage[0]?.image
              }`}
            />
          ))
        )}
      </div>
    </div>
  );
});

export default NewArrivals;
