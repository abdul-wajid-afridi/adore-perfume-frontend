// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { ProductType } from "@/app/types/productType";

// type InitProps = {
//   products: ProductType[];
//   loading: boolean;
//   editProduct: boolean;
//   error: string | null;
// };
// const initialState: InitProps = {
//   products: [],
//   editProduct: true,
//   error: null,
//   loading: false,
// };

// // createProduct
// export const asynCreateProduct = createAsyncThunk(
//   "asynCreateProduct/post",
//   async (data) => {
//     try {
//       const { toast, productData } = data;

//       const product = await API.post("/product", productData);
//       const result = await product.data;
//       toast.success("Product added");
//       return result;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// // GetProduct
// export const asyncGetProduct = createAsyncThunk(
//   "asyncGetProduct/get",
//   async () => {
//     try {
//       const product = await API.get("/product");
//       const result = await product.data;
//       return result;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// // SingleGetProduct
// export const asyncGetSingleProduct = createAsyncThunk(
//   "asyncGetSingleProduct/singleget",
//   async (id, { dispatch }) => {
//     try {
//       const product = await API.get(`/product/${id}`);
//       const result = await product.data;
//       dispatch(asyncGetProduct());
//       return result;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// //DeleteProduct
// export const asyncDeleteProduct = createAsyncThunk(
//   "asyncDeleteProduct/delete",
//   async (data, { dispatch }) => {
//     try {
//       const { toast, id } = data;
//       const product = await API.delete(`product/${id}`);
//       const result = await product.data;
//       dispatch(asyncGetProduct());
//       toast.success("Product Deleted");
//       return result;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// //UpdateProduct
// export const asyncUpdateProduct = createAsyncThunk(
//   "asyncUpdateProduct/put",
//   async (data, { dispatch }) => {
//     try {
//       const { toast, navigate, id, productData } = data;
//       const product = await API.put(`/product/${id}`, productData);
//       const result = await product.data;
//       // dispatch(asyncGetProduct());
//       toast.success("Product Updated");
//       // setTimeout(() => {
//       //   return navigate("/");
//       // }, [1000]);
//       return result;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
// export const asyncLikeProduct = createAsyncThunk(
//   "asyncLikeProduct/put",
//   async (data, { dispatch }) => {
//     try {
//       const { toast, navigate, id, productData } = data;
//       const product = await API.put(`/product/${id}`, productData);
//       const result = await product.data;
//       // dispatch(asyncGetProduct());
//       toast.success("Product Updated");
//       // setTimeout(() => {
//       //   return navigate("/");
//       // }, [1000]);
//       return result;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// const productSlice = createSlice({
//   name: "productSlice",
//   initialState,
//   reducers: {
//     RemoveEditProduct: (state: any) => {
//       state.editProduct = null;
//     },
//   },
//   extraReducers: {
//     // createProduct
//     [asynCreateProduct.pending]: (state: any) => {
//       state.error = null;
//       state.loading = true;
//     },
//     [asynCreateProduct.fulfilled]: (state: any, { payload }: any) => {
//       state.loading = false;
//       state.error = null;
//       state.products = [payload];
//     },
//     [asynCreateProduct.rejected]: (state: any, { payload }: any) => {
//       state.error = payload;
//       state.loading = false;
//     },
//     // Get Product
//     [asyncGetProduct.pending]: (state: any) => {
//       state.error = null;
//       state.loading = true;
//     },
//     [asyncGetProduct.fulfilled]: (state: any, { payload }: any) => {
//       state.error = null;
//       state.loading = false;
//       state.products = payload;
//     },
//     [asyncGetProduct.rejected]: (state: any, { payload }: any) => {
//       state.error = payload;
//       state.loading = false;
//     },
//     // Single Get Product
//     [asyncGetSingleProduct.pending]: (state: any) => {
//       state.error = null;
//       state.loading = true;
//     },
//     [asyncGetSingleProduct.fulfilled]: (state: any, { payload }: any) => {
//       state.loading = false;
//       state.error = null;
//       state.products = payload;
//     },
//     [asyncGetSingleProduct.rejected]: (state: any, { payload }: any) => {
//       state.error = payload;
//       state.loading = false;
//     },
//     // Delete Product
//     [asyncDeleteProduct.pending]: (state: any) => {
//       state.error = null;
//       state.loading = true;
//     },
//     [asyncDeleteProduct.fulfilled]: (state: any, { payload }: any) => {
//       state.loading = false;
//       state.error = null;
//       state.products = payload;
//     },
//     [asyncDeleteProduct.rejected]: (state: any, { payload }: any) => {
//       state.error = payload;
//       state.loading = false;
//     },
//     // Update Product
//     [asyncUpdateProduct.pending]: (state: any) => {
//       state.error = null;
//       state.loading = true;
//     },
//     [asyncUpdateProduct.fulfilled]: (state: any, { payload }: any) => {
//       state.loading = false;
//       state.error = null;
//       state.products = payload;
//     },
//     [asyncUpdateProduct.rejected]: (state: any, { payload }: any) => {
//       state.error = payload;
//       state.loading = false;
//     },
//   },
// });

// export const { RemoveEditProduct } = productSlice.actions;
// export default productSlice.reducer;
