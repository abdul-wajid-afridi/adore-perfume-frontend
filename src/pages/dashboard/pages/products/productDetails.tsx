import { memo, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductById } from "../../../../api/products/queries";
import { BASE_URL } from "../../../../constants/urls";
import Navigation from "../../../../components/Navigation";

const AdminProductDetails = memo(function AdminProductDetails() {
  const { productId } = useParams();
  const { data } = useGetProductById(Number(productId));
  const [index, setIndex] = useState(0);
  return (
    <section className="flex flex-col px-5 py-10 relative">
      <Navigation url="/dashboard/products" />
      <div className="flex justify-between w-full flex-wrap">
        <div className="w-full sm:w-1/2 sm:h-[300px] flex flex-col gap-5">
          <img
            src={`${BASE_URL}/${
              data?.productImage && data?.productImage[index]?.image
            }`}
            className="w-full h-full"
          />
          <div className="flex gap-5 ">
            {data?.productImage?.map((img, ind) => {
              return (
                <img
                  onClick={() => setIndex(ind)}
                  src={`${BASE_URL}/${img?.image}`}
                  className="h-20 w-20 rounded-md hover:shadow-md hover:scale-105"
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col w-full sm:w-1/3 h-[300px] mt-5 sm:mt-0 text-slate-800 capitalize gap-3">
          <p className="font-bold">
            <span className="text-slate-500">Name: </span>
            {data?.name}
          </p>
          <p>${data?.price}</p>
          <p>
            <span className="text-slate-500">stock: </span>
            {data?.stock}
          </p>
          <p>
            <span className="text-slate-500">category: </span>
            {data?.category?.name}
          </p>
          <p>
            <span className="text-slate-500">Description: </span>
            {data?.description}
          </p>
        </div>
      </div>
    </section>
  );
});

export default AdminProductDetails;
