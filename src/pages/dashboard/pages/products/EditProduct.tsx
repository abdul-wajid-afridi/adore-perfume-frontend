import { memo } from "react";
import { useParams } from "react-router-dom";
import AddProduct from "./AddProduct";
import { useGetProductById } from "../../../../api/products/queries";

const EditProduct = memo(function Form() {
  const { productId } = useParams();
  const { data } = useGetProductById(Number(productId));

  return <AddProduct data={data!} />;
});

export default EditProduct;
