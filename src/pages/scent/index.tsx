import { memo } from "react";
import { useGetPaginationProducts } from "../../api/products/queries";
import Loader from "../../components/loader";
import ProductCard from "../../components/cards/product-card";
import { BASE_URL } from "../../constants/urls";
import { Pagination } from "../../components/pagination";
import { useLocation } from "react-router-dom";

const PAGE_SIZE: number = 8;
const ScentPage = memo(function ScentPage() {
  const getPageValue = useLocation();
  //   const [data, setData] = useState();
  const pageNumber = Number(getPageValue.search.split("=")[1] || 1); // Get the page number. Default to 1 if not provided.

  const take = PAGE_SIZE;
  const skip = (pageNumber - 1) * take; // Calculate skip based on page number.
  const { data, isLoading } = useGetPaginationProducts(skip, take);

  return (
    <div>
      <h2 className="my-10">our products</h2>
      <div className="grid justify-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-10">
        {isLoading ? (
          <div className="flex justify-center w-screen">
            <Loader size="big" />
          </div>
        ) : (
          data?.data?.map((it) => (
            <ProductCard
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
      <Pagination page={pageNumber} {...data?.metadata} />
    </div>
  );
});

export default ScentPage;
