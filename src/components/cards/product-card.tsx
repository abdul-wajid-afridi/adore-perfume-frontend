import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useCurrency from "../../hooks/useCurrency";

type TProductCardProps = {
  name: string;
  src: string;
  id: number;
  price: number;
};

const ProductCard = memo(function ProductCard(props: TProductCardProps) {
  const [currency, currencyRate] = useCurrency(Number(props?.price));

  const navigate = useNavigate();
  return (
    <div
      onClick={useCallback(() => {
        navigate("/product-details/" + props.id);
      }, [navigate, props.id])}
      className="relative group overflow-hidden h-[400px]"
    >
      <img
        className="group-hover:scale-105 duration-300 rounded-sm w-full h-full"
        src={props.src}
        alt={props.name}
      />

      <p className="absolute bottom-3 left-3 text-white z-50 group-hover:border-b border-slate-700 w-fit opacity-0 group-hover:opacity-100 duration-300">
        {props.name}
      </p>
      <p className="absolute bottom-3 right-3 text-white z-50 group-hover:border-b border-slate-700 w-fit opacity-0 group-hover:opacity-100 duration-300">
        <span className="text-xs">{currency}</span>:{currencyRate}
      </p>
      <p className="text-xs text-secondary z-50 absolute top-0 right-0 hidden group-hover:flex bg-primary p-1 rounded-full rounded-bl-none animate-pulse">
        Adore Perfume
      </p>
      <span className="absolute inset-0 bg-black/50 hidden group-hover:flex" />
    </div>
  );
});

export default ProductCard;
