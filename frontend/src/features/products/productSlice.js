
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { authService } from "./userService";
import { toast } from 'react-toastify'
import { productService } from "./productService";



export const getAllProducts = createAsyncThunk("product/get", async (data,thunkAPI) => {
    try {
        return await productService.getProducts(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getAProduct = createAsyncThunk("product/getaProduct", async (id,thunkAPI) => {
    try {
        return await productService.getSingleProduct(id);
    } catch (error) {
        const serializedError = {
            message: error.message,
            status: error.response?.status || 500, // Extract status code if available
            // You can include additional properties as needed
          };
          throw serializedError;
        return thunkAPI.rejectWithValue(error);
    }
});

export const addToWishList = createAsyncThunk("product/wishlist", async (prodId,thunkAPI) => {
    try {
        return await productService.addToWishList(prodId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error); 
    }
});

export const addRating = createAsyncThunk("product/rating", async (data,thunkAPI) => {
    try {
        return await productService.rateProduct(data);
        console.log(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error); 
    }
});

const productState = {
    product: {},
    products: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}
export const productSlice = createSlice({
    name: "product",
    initialState: productState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true; // removed the trailing comma here
                state.product = action.payload;

            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(addToWishList.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(addToWishList.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true; 
                state.addToWishList = action.payload;
                state.message = 'Product Added to Wishlist'
            })
            .addCase(addToWishList.rejected,(state,action)=>{
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getAProduct.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(getAProduct.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true; 
                state.product = action.payload;
                state.message = 'Product Fetched Successfully'
            })
            .addCase(getAProduct.rejected,(state,action)=>{
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(addRating.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(addRating.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true; 
                state.rating = action.payload;
                state.message = 'Rating Added Successfully'
            })
            .addCase(addRating.rejected,(state,action)=>{
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

    }
});

export default productSlice.reducer;
