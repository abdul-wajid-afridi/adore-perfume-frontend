import { memo } from "react";
import ProductCard from "../../../components/cards/product-card";
import { useGetNewArrivalProduct } from "../../../api/products/queries";
import Loader from "../../../components/loader";
import { BASE_URL } from "../../../constants/urls";

const NewArrivals = memo(function NewArrivals() {
  const { data, isLoading } = useGetNewArrivalProduct();
  console.log(data);

  return (
    <>
      <h2 className="my-10">New Arrivals</h2>
      <div className="grid justify-center gap-5 sm:grid-cols-2 lg:grid-cols-3 px-5 sm:px-10">
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
    </>
  );
});

export default NewArrivals;
