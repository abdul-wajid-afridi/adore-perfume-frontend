import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchProducts } from "../../api/products/queries";
import Loader from "../../components/loader";
import ProductCard from "../../components/cards/product-card";
import { BASE_URL } from "../../constants/urls";

const Search = memo(() => {
  const category = useSearchParams()[0].get("category");
  const name = useSearchParams()[0].get("name");
  const { data, isLoading } = useSearchProducts(name || "", category || "");
  console.log(data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="big" />
      </div>
    );
  }
  return (
    <>
      <h2 className="my-10">products</h2>
      {data?.length == 0 && <h2 className="my-10">No products found</h2>}
      <div className="grid justify-center gap-5 sm:grid-cols-2 lg:grid-cols-3 px-5 sm:px-10 my-10">
        {data?.map((category) => {
          return (
            <ProductCard
              key={category.id}
              id={category.id!}
              name={category.name}
              price={category.price!}
              src={`${BASE_URL}/${
                category.productImage && category.productImage[0]?.image
              }`}
            />
          );
        })}
      </div>
    </>
  );
});

export default Search;
