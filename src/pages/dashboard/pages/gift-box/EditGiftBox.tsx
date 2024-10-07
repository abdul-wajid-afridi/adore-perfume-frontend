import { memo } from "react";
import { useParams } from "react-router-dom";
import { useGetGiftBoxById } from "../../../../api/gift-box/queries";
import AddGiftBox from "./AddGiftBox";

const EditGiftBox = memo(function Form() {
  const { giftBoxId } = useParams();
  const { data } = useGetGiftBoxById(Number(giftBoxId));

  return <AddGiftBox data={data!} />;
});

export default EditGiftBox;
