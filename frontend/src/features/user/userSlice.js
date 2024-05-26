import { createSlice, createAsyncThunk,createAction } from "@reduxjs/toolkit";
import { authService } from "./userService";
import {toast} from 'react-toastify'


export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        return await authService.register(userData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || 'Unknown error occurred';
        return thunkAPI.rejectWithValue(message);
    }
});

export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    console.log(userData)
    try {
        const response = await authService.login(userData);
        return response;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || 'Unknown error occurred';
        return thunkAPI.rejectWithValue(message);
    }
});


//user wishlist
export const getUserProductWishList = createAsyncThunk("user/wishlist",async(thunkAPI)=>{
    try {
        return await authService.getUserWishList()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

//add to cardt

export const addProdToCart = createAsyncThunk("user/cart/add",async(cartData,thunkAPI)=>{
    try {
        return await authService.addToCart(cartData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

//get user cart

export const getUserProdCart = createAsyncThunk("user/cart/get",async(thunkAPI)=>{
    try {
        return await authService.getCart()
     
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteUserCart = createAsyncThunk("user/cart/delete",async(data,thunkAPI)=>{
    try {
        return await authService.emptyCart(data)
     
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
//delete from cart
export const deleteCartProduct = createAsyncThunk("user/cart/product/delete",async(cartItemId,thunkAPI)=>{
    try {
        return await authService.removeProductFromCart(cartItemId)
     
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateCartProduct = createAsyncThunk(
    "user/cart/product/update",
    async (cartDetail, thunkAPI) => {
      try {
        const updatedProduct = await authService.updateProductFromCart(cartDetail);
        return updatedProduct;
      } catch (error) {
        // Throwing an error will cause the rejection with this value
        throw new Error("Failed to update product in cart. Please try again later.");
      }
    }
  );
  export const createAnOrder = createAsyncThunk(
    "user/cart/create-order",
    async (orderDetail, thunkAPI) => {
      try {
        const createOrder = await authService.createOrder(orderDetail);
        return createOrder;
      } catch (error) {
        // Throwing an error will cause the rejection with this value
        throw new Error("Failed to update product in cart. Please try again later.");
      }
    }
  );

  //get user order
  export const getOrders = createAsyncThunk(
    "user/order/get",
    async ( thunkAPI) => {
      try {
        const getOrders = await authService.getUserOrders();
        
        return getOrders;
      } catch (error) {
        // Throwing an error will cause the rejection with this value
        throw new Error("Failed to get order. Please try again later.");
      }
    }
  );

  export const updateProfile = createAsyncThunk(
    "user/profile/update",
    async (data,thunkAPI) => {
      try {
        const updateaUser = await authService.updateaUser(data);
        return updateaUser;
      } catch (error) {
        throw new Error("Failed to update product in cart. Please try again later.");
      }
    }
  );

  export const forgotPasswordToken = createAsyncThunk(
    "user/password/token",
    async (data, thunkAPI) => {
      try {
        const forgotPassword = await authService.forgotPassToken(data);
        return forgotPassword;
      } catch (error) {
        throw new Error("Failed to update product in cart. Please try again later.");
      }
    }
  );

  export const resetPassword = createAsyncThunk(
    "user/password/reset",
    async (data, thunkAPI) => {
      try {
        const resetPassword = await authService.resetPass(data);
        return resetPassword;
      } catch (error) {
        throw new Error("Failed to update product in cart. Please try again later.");
      }
    }
  );

  export const resetCart = createAction('user/cart/reset');



const getCustomerFromLocalStorage = localStorage.getItem('customer')
?JSON.parse(localStorage.getItem('customer'))
:null;
// console.log("customer-toke",getCustomerFromLocalStorage)

const initialState = {
    user: getCustomerFromLocalStorage,
    isError: false,
    isLoading: false,
    isSuccess: false,
    isAuthenticated:false,
    message: "",
    cart: [], // Ensure cart is part of the initial state
    cartTotal: 0,
    cartTotalItems: 0,
};

 // localStorage.setItem('user-token',action.payload.token)
export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    wishlist:[],
    // cart:[],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isAuthenticated=false;
                state.isSuccess = true; // removed the trailing comma here
                state.user=action.payload;
                if(state.isSuccess === true){
                    toast.info('User Created Successully')
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // isAuthenticated=false,
                state.message = action.payload; // action.payload contains the error message

                // Display toast notification with the error message
                if (state.isError && action.payload) {
                    toast.error(action.payload);
                } else {
                    toast.error('An unknown error occurred');
                }
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess=true;
                state.isAuthenticated=true;
                state.user=action.payload;
                if(state.isSuccess === true){
                   
                    toast.info('User Logged In Successfully')
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
               state.message = action.payload; // action.payload contains the error message

                // Display toast notification with the error message
                if (state.isError && action.payload) {
                    toast.error(action.payload);
                } else {
                    toast.error('An unknown error occurred');
                }
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedUser = action.payload;
            
                let currentUserData = JSON.parse(localStorage.getItem('customer'));
                let newUserData = {
                    _id: currentUserData?._id,
                    token: currentUserData?.token,
                    firstname: action.payload?.firstname,
                    lastname: action.payload?.lastname,
                    email: action.payload?.email,
                    mobile: action.payload?.mobile,
                };
            
                localStorage.setItem("customer", JSON.stringify(newUserData));
                state.user = newUserData;
            
                toast.success('Profile Updated Successfully Please Logout And Enter Updated Credentials!');
            })            
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.isError = action.error;
                if(state.isError === true){
                    toast.error('Something went wrong')
                }
            })
            .addCase(getUserProductWishList.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(getUserProductWishList.fulfilled,(state,action)=>{

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishlist=action.payload;
                
            })
            .addCase(getUserProductWishList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.isError = action.error;
            })
            .addCase(addProdToCart.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(addProdToCart.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProduct=action.payload;
                if(state.isSuccess){
                    toast.success("Product Added To Cart")
                }
            })
            .addCase(addProdToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.isError = action.error;
            })
            .addCase(getUserProdCart.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(getUserProdCart.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProducts=action.payload; 
            })
            .addCase(getUserProdCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.isError = action.error;
            })
            .addCase(deleteCartProduct.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(deleteCartProduct.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCartProduct=action.payload; 
                if(state.isSuccess){
                    toast.success("Product Deleted From Cart!")
                }
            })
            .addCase(deleteCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.isError = action.error;
                if(state.isSuccess === false){
                    toast.error("Something Went Wrong!")
                }
            })
            .addCase(updateCartProduct.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(updateCartProduct.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCartProducts=action.payload; 
                if(state.isSuccess){
                    toast.success("Product Updated From Cart!")
                }
            })
            .addCase(updateCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.isError = action.error;
                if(state.isSuccess === false){
                    toast.error('Something Went Wrong')
                }
            })
            .addCase(createAnOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAnOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true; // removed the trailing comma here
                state.orderedProducts=action.payload;
                if(state.isSuccess === true){
                    toast.info('Product Ordered Successully')
                }
            })
            .addCase(createAnOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.isError = action.error;
                if(state.isError === true){
                    toast.error('Something went wrong')
                }
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true; // removed the trailing comma here
                state.getorderedProduct=action.payload;
                
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.isError = action.error; 
            })
            
            .addCase(forgotPasswordToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPasswordToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true; // removed the trailing comma here
                state.token=action.payload;
                if(state.isSuccess === true){
                    toast.success('Forgot Password Email Sent Successully')
                }
            })
            .addCase(forgotPasswordToken.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.isError = action.error;
                if(state.isError === true){
                    toast.error('Something went wrong')
                }
            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true; // removed the trailing comma here
                state.pass=action.payload;
                if(state.isSuccess === true){
                    toast.success('Password Updated Successully')
                }
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.isError = action.error;
                if(state.isError === true){
                    toast.error('Something went wrong')
                }
            })
            .addCase(deleteUserCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true; // removed the trailing comma here
                state.deletedCartProduct=action.payload;
              
            })
            .addCase(deleteUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.isError = action.error;
                
            })
            .addCase(resetCart, (state) => {
                state.cartProducts = [];
                state.cartTotal = 0;
                state.cartTotalItems = 0;
            })
            
    }
});

export default authSlice.reducer;
