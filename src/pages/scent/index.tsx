// import { memo } from "react";
// import { useGetPaginationProducts } from "../../api/products/queries";
// import Loader from "../../components/loader";
// import ProductCard from "../../components/cards/product-card";
// import { BASE_URL } from "../../constants/urls";
// import { Pagination } from "../../components/pagination";
// import { useLocation } from "react-router-dom";

// // NOTE: CENTS PAGE IS ACTUALLY TASTES
// const PAGE_SIZE: number = 8;
// const ScentPage = memo(function ScentPage() {
//   const getPageValue = useLocation();
//   //   const [data, setData] = useState();
//   const pageNumber = Number(getPageValue.search.split("=")[1] || 1); // Get the page number. Default to 1 if not provided.

//   const take = PAGE_SIZE;
//   const skip = (pageNumber - 1) * take; // Calculate skip based on page number.
//   const { data, isLoading } = useGetPaginationProducts(skip, take);

//   return (
//     <div>
//       <h2 className="my-10">our products</h2>
//       <div className="grid justify-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-10">
//         {isLoading ? (
//           <div className="flex justify-center w-screen">
//             <Loader size="big" />
//           </div>
//         ) : (
//           data?.data?.map((it) => (
//             <ProductCard
//               price={it.price!}
//               id={it.id!}
//               key={it.id}
//               name={it.name}
//               src={`${BASE_URL}/${
//                 it.productImage && it.productImage[0]?.image
//               }`}
//             />
//           ))
//         )}
//       </div>
//       <Pagination page={pageNumber} {...data?.metadata} />
//     </div>
//   );
// });

// export default ScentPage;

import { memo } from "react";
import Loader from "../../components/loader";
import { BASE_URL } from "../../constants/urls";
import { useGetAllTaste } from "../../api/taste/queries";
import { useNavigate } from "react-router-dom";

// NOTE: CENTS PAGE IS ACTUALLY TASTES

const ScentPage = memo(function ScentPage() {
  const { data, isLoading } = useGetAllTaste();
  const navigate = useNavigate();

  return (
    <>
      <h2 className="my-10">Find your best signature scents</h2>
      <div className="grid justify-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-10 my-10">
        {isLoading ? (
          <div className="flex justify-center w-screen">
            <Loader size="big" />
          </div>
        ) : (
          data?.map((taste) => {
            return (
              <div
                onClick={() => navigate(`/search?taste=${taste.name}`)}
                className="flex flex-col rounded-md hover:rounded-none hover:shadow-md overflow-hidden relative"
              >
                <img
                  src={`${BASE_URL}/${taste?.image}`}
                  alt={taste.name}
                  className="h-[250px]"
                />
                <div className="absolute hover:bg-transparent cursor-pointer bg-black/40 inset-0 flex justify-center items-center">
                  <p className="text-white capitalize font-bold tracking-widest text-3xl md:text-5xl">
                    {taste.name}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
});

export default ScentPage;
