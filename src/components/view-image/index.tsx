import { Cross } from "lucide-react";
import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { BASE_URL } from "../../constants/urls";
import { TProductResponse } from "../../api/products/fetchers";

type TViewImageProps = {
  close: boolean;
  setClose: Dispatch<SetStateAction<boolean>>;
  data: TProductResponse;
  index: number;
};

const ViewImage = memo(function ViewImage(props: TViewImageProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex justify-center items-center">
      <img
        src={`${BASE_URL}/${
          props.data?.productImage &&
          props.data?.productImage[props.index]?.image
        }`}
        className=" w-[90vw] aspect-video"
      />
      <span
        className="absolute top-4 right-4 rotate-[45deg] bg-primary text-secondary p-2 rounded-full hover:rotate-0 duration-100"
        onClick={useCallback(() => {
          props.setClose(false);
        }, [props.setClose])}
      >
        <Cross />
      </span>
    </div>
  );
});

export default ViewImage;
