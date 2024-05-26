import axios from 'axios';
import { base_url } from '../../utils/axiosConfig';

const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};
const register = async (userData) => {
    const response = await axios.post(`${base_url}user/register`, userData,config);
    if (response.data) {
        // localStorage.setItem('customerToken', JSON.stringify(response.data)); // Assuming the response contains the user data
        localStorage.setItem('customer', JSON.stringify(response.data)); // Storing the entire user data object
        return response.data;
    }
}

const login = async (userData) => {
    const response = await axios.post(`${base_url}user/login`, userData,config);
    if (response.data) {
        // localStorage.setItem('customerToken', JSON.stringify(response.data)); // Assuming the response contains the user data
        localStorage.setItem('customer', JSON.stringify(response.data)); // Storing the entire user data object
        return response.data;
    }
}

const getUserWishList = async () =>{
    const response = await axios.get(`${base_url}user/wishlist`,config)
   
    if(response.data){
        return response.data
    }
}

const addToCart = async (cartData) =>{
    const response = await axios.post(`${base_url}user/cart`,cartData,config)
    console.log(response,'response')
    if(response.data){
        return response.data
    }
}

const removeProductFromCart = async (cartItemId) =>{
    const response = await axios.delete(`${base_url}user/delete-product-cart/${cartItemId}`,config)
    console.log(response,'response')
    if(response.data){
        return response.data
    }
}



const getCart = async () => {
    try {
      const response = await axios.get(`${base_url}user/cart`, config);
      console.log(response); // Log the response
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.error('Error fetching cart:', error); // Log any errors
      throw error; // Rethrow the error to be handled elsewhere if needed
    }
  }

  const updateProductFromCart = async (cartDetail) => {
    try {
        const response = await axios.put(`${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`, config);

        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            // If the response status is not 200 or response data is missing
            throw new Error('Failed to update product in cart. Unexpected response from server.');
        }
    } catch (error) {
        // Handle errors gracefully
        console.error('Error updating product in cart:', error);
        throw new Error('Failed to update product in cart. Please try again later.');
    }
};

const createOrder = async (orderDetail) => {
    
    const response = await axios.post(`${base_url}user/cart/create-order`,orderDetail,config)
    // console.log(response)
    if(response.data){
        return response.data
    }
}

const emptyCart = async (data) => {
   
    const response = await axios.delete(`${base_url}user/empty-cart`,data)
    // console.log(response)
    if(response.data){
        return response.data
    }
}

//get user order

const getUserOrders = async()=>{
    const response = await axios.get(`${base_url}user/getmyorders`,config)
    if(response.data){
        return response.data
    }
}

//update user
const updateaUser = async (data) => {
    const response = await axios.put(`${base_url}user/edit-user`,data.data,data.config2)
    if(response.data){
        return response.data
    }
}

//forgot password
const forgotPassToken = async (data) => {
    const response = await axios.post(`${base_url}user/forgot-password-token`,data)
    if(response.data){
        return response.data
    }
}

//reset password
const resetPass = async (data) => {
    const response = await axios.put(`${base_url}user/reset-password/${data.token}`,{password:data?.password})
    if(response.data){
        return response.data
    }
}
export const authService = {
    register,
    login,
    getUserWishList,
    addToCart,
    getCart,
    removeProductFromCart,
    updateProductFromCart,
    createOrder,
    getUserOrders,
    updateaUser,
    forgotPassToken,
    resetPass,
    emptyCart
}
