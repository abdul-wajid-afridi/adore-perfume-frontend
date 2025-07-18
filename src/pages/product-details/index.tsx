import { memo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetProductById,
  useGetSimilarProducts,
} from "../../api/products/queries";
import { BASE_URL } from "../../constants/urls";
import Navigation from "../../components/Navigation";
import ViewImage from "../../components/view-image";
import { Button } from "../../components/ui/button";
import { ShoppingCart } from "lucide-react";
import ProductCard from "../../components/cards/product-card";
import Loader from "../../components/loader";
import { addToCart, calculateTotal } from "../../redux/feature/cartSlice";
import { useAppDispatch } from "../../hooks/hook";
import useCurrency from "../../hooks/useCurrency";

const ProductDetailsPage = memo(function ProductDetailsPage() {
  const dispatch = useAppDispatch();
  const [index, setIndex] = useState(0);
  // const [currencyRate, setCurrencyRate] = useState(0);
  const [close, setClose] = useState(false);
  const { productId } = useParams();
  const { data, isLoading: singleProductLoading } = useGetProductById(
    Number(productId)
  );

  const [currency, currencyRate] = useCurrency(Number(data?.price));

  // const [currency, setCurrency] = useState(
  //   localStorage.getItem("currency") || ""
  // );

  // useEffect(() => {
  //   const handleCurrencyChange = () => {
  //     setCurrency(localStorage.getItem("currency") || "");
  //   };

  //   window.addEventListener("currencyChange", handleCurrencyChange);

  //   return () => {
  //     window.removeEventListener("currencyChange", handleCurrencyChange);
  //   };
  // }, []);

  // useEffect(() => {
  //   const convertCurrency = async () => {
  //     const value = await Convert(Number(data?.price)).from("USD").to(currency);
  //     setCurrencyRate(value);
  //   };
  //   convertCurrency();
  // }, [data?.price, currency]);

  const { data: similarProducts, isLoading } = useGetSimilarProducts(
    Number(data?.category?.id)
  );

  if (singleProductLoading) {
    return (
      <div className="h-screen grid place-items-center">
        <Loader size="big" />
      </div>
    );
  }

  return (
    <>
      <section className="flex flex-col px-5 sm:px-40 py-20 relative">
        {close && (
          <ViewImage
            data={data!}
            index={index}
            close={close}
            setClose={setClose}
          />
        )}
        <Navigation url="/" />
        <div className="flex justify-evenly w-full flex-wrap ">
          <div className="w-full sm:w-1/2  sm:h-[70vh] flex flex-col gap-5">
            <img
              src={`${BASE_URL}/${
                data?.productImage && data?.productImage[index]?.image
              }`}
              onClick={() => {
                setClose(true);
              }}
              className="w-full h-[70vh] sm:h-full rounded-md"
            />
            <div className="flex gap-5  ">
              {data?.productImage?.map((img, ind) => {
                return (
                  <img
                    key={ind}
                    onClick={() => setIndex(ind)}
                    src={`${BASE_URL}/${img?.image}`}
                    className="h-20 w-20 rounded-md hover:shadow-md hover:scale-105"
                  />
                );
              })}
            </div>
          </div>

          <div className="flex  flex-col justify-center w-full sm:w-1/3 mt-10 text-slate-800 capitalize gap-3">
            <h2 className="text-start border-b-2">{data?.name}</h2>
            <Button className="w-fit" disabled>
              {data?.ml}
            </Button>

            <p>
              {currency}:{currencyRate}
            </p>
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
            <Button
              className="w-fit"
              onClick={() => {
                dispatch(addToCart(data!));
                dispatch(calculateTotal());
              }}
            >
              Add To Cart <ShoppingCart />
            </Button>
          </div>
        </div>
      </section>

      <h2 className="my-10">Similar products</h2>
      <div className="grid justify-center gap-5 sm:grid-cols-2 lg:grid-cols-3 px-5 sm:px-40 my-10">
        {isLoading ? (
          <div className="flex justify-center w-screen">
            <Loader size="big" />
          </div>
        ) : (
          similarProducts?.map((it) => (
            <ProductCard
              price={it.price!}
              id={it.id!}
              key={it.id}
              name={it.name}
              src={`${BASE_URL}/${
                it?.productImage && it?.productImage[0]?.image
              }`}
            />
          ))
        )}
      </div>
    </>
  );
});

export default ProductDetailsPage;
