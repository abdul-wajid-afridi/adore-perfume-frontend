import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchProducts } from "../../api/products/queries";
import Loader from "../../components/loader";
import ProductCard from "../../components/cards/product-card";
import { BASE_URL } from "../../constants/urls";

const Search = memo(() => {
  const category = useSearchParams()[0].get("category");
  const name = useSearchParams()[0].get("name");
  const taste = useSearchParams()[0].get("taste");
  const brand = useSearchParams()[0].get("brand");
  const { data, isLoading } = useSearchProducts(
    name || "",
    category || "",
    taste || "",
    brand || ""
  );

  const displayValues = [name, taste, category].filter(Boolean).join(" ");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="big" />
      </div>
    );
  }
  return (
    <>
      <h2 className="my-10">{displayValues}</h2>
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
    </>
  );
});

export default Search;
