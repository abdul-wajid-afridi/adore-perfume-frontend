import { memo } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../../constants/urls";
import Navigation from "../../../../components/Navigation";
import { useGetGiftBoxById } from "../../../../api/gift-box/queries";

const AdminGiftBoxDetails = memo(function AdminGiftBoxDetails() {
  const { giftBoxId } = useParams();
  const { data } = useGetGiftBoxById(Number(giftBoxId));

  return (
    <section className="flex flex-col px-5 py-10 relative">
      <Navigation url="/dashboard/gift-box" />
      <div className="flex justify-between w-full flex-wrap">
        <div className="w-full sm:w-1/2 sm:h-[300px] flex flex-col gap-5">
          <img src={`${BASE_URL}/${data?.image}`} className="w-full h-full" />
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
            <span className="text-slate-500">Description: </span>
            {data?.description}
          </p>
        </div>
      </div>
    </section>
  );
});

export default AdminGiftBoxDetails;
