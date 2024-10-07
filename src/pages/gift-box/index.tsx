import { memo } from "react";
import Loader from "../../components/loader";
import { BASE_URL } from "../../constants/urls";
import PageBanner from "../../components/banner";
import { useGetAllGiftBoxes } from "../../api/gift-box/queries";
import GiftBoxCard from "../../components/cards/gift-box-card";

const GiftBoxPage = memo(function GiftBoxPage() {
  const { data, isLoading } = useGetAllGiftBoxes();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="big" />
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <PageBanner bannerImages="/banner/car.jpg" title="Gift Boxes" />
      {data?.length == 0 && <h2 className="my-10">No products found</h2>}
      <div className="grid justify-center gap-5 sm:grid-cols-2 lg:grid-cols-3 px-5 sm:px-10 my-10">
        {data?.map((giftBox) => {
          return (
            <GiftBoxCard
              key={giftBox.id}
              id={giftBox.id!}
              name={giftBox.name!}
              price={giftBox.price!}
              src={`${BASE_URL}/${giftBox.image}`}
            />
          );
        })}
      </div>
    </div>
  );
});

export default GiftBoxPage;
