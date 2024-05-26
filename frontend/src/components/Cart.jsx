
import React, { useState, useEffect } from 'react'
import './Cart.css'
import { FiLock } from 'react-icons/fi';
import { FaTag } from 'react-icons/fa';
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { deleteCartProduct, getUserProdCart, updateCartProduct } from '../features/user/userSlice';
import {toast} from "react-toastify"
// import { getUserCart } from '../features/user/userSlice';

function Cart() {
  const [productUpdateDetail, setProductUpdateDetail] = useState(null)
  const [totlaAmount,setTotalAmount] = useState(null)
  console.log(totlaAmount)
  // console.log(productUpdateDetail)
  const dispatch = useDispatch()
  const userCartState = useSelector((state) => state.auth.cartProducts);

  console.log(userCartState)
  useEffect(() => {
    dispatch(getUserProdCart())
  }, [])

  useEffect(()=>{
   if(productUpdateDetail !== null){
    // updateCartProduct({cartItemId:productUpdateDetail?.cartItemId,quantity:productUpdateDetail?.quantity})
    dispatch(updateCartProduct({cartItemId:productUpdateDetail?.cartItemId,quantity:productUpdateDetail?.quantity}))
    // toast.success('Product Updated from cart')
    setTimeout(()=>{
  dispatch(getUserProdCart())
},200)
   }
  },[productUpdateDetail])
  const deleteAcartProduct = (id) =>{
    dispatch(deleteCartProduct(id))
    setTimeout(()=>{
      dispatch(getUserProdCart())
    },200)
  }

  useEffect(()=>{
    let sum=0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum = sum+(Number(userCartState[index].quantity) * userCartState[index].price)
      // console.log(sum)
      setTotalAmount(sum)
    }
  },[userCartState])

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 cart-header">
            <div>
              <Link to='/'>
                <h2 className='Al-Akbar'>Al-Akbar</h2>
              </Link>

            </div>

            <div className='slide-cart-div'>
              <h5>Bag <span>-------</span></h5>
              <h5>Address<span> -------</span></h5>
              <h5>Payment</h5>
            </div>
            <div className='secure-div'>
              <FiLock className="secure-icon" />
              <h5>100% Secure</h5>
            </div>
          </div>
          <div className="col-md-1"></div>

          <div className="col-md-5 lg-6">
            <h2>Your Orders</h2>
            <div className="card mb-3 card-div">
              {
                userCartState && userCartState.map((item, index) => {
                  return (
                    <>
                      <div className="card-body card-body-div">
                        <div className="parent-cart-element">
                        <div>
                          
                          {item.productId && item.productId.images && item.productId.images.length > 0 && (
                            <img
                              src={item.productId.images[0].url} // Displaying the first image
                              className="card-img-top-product img-fluid"
                              alt="Product Image"
                            />
                          )}
                        </div>
                        <div className="product-title">
                          <h2>{item.productId?.title}</h2>
                          <h2 className='brand-title'>{item.productId?.brand}</h2>
                        </div>
                        </div>
                        

                      </div>
                      <div className="price-quantity">
                        <div>
                          <h5>Rs:- <span className='money'>{item?.price * item?.quantity}</span></h5>
                        </div>

                        <div className="quantity">
                          <h5>Quantity</h5>
                          <input type='number' name="" onChange={(e) => setProductUpdateDetail({cartItemId:item?._id,quantity:e.target.value})} value={item?.quantity} className='rating-other' />
                        </div>
                      </div>
                      {/* <div className='d-flex gap-3 pl-5'>
                  <p>Color:-<ul>
                    <li style={{backgroundColor:item.color?.title }}></li>
                    </ul></p>
                </div> */}
                      <div className="btn-remove-div">
                        <button className="btn-remove" onClick={()=>{deleteAcartProduct(item?._id)}}>Remove</button>
                      </div>
                      <hr />
                    </>

                  )
                })
              }


            </div>

          </div>
          {/* <div className="col-md-1"></div> */}
          <div className="col-md-4 lg-6">
            <h2> Orders Details</h2>
            <div className="card mb-3">
              <div className="card-body">
                <div>
                  <h6 className='coupon-title'>COUPONS</h6>
                  <div className="price-apply-coupon-div">

                    <div className='coupon-1'>
                      <FaTag />
                      <h6>Apply coupon</h6>
                    </div>
                    <div>
                      <button className='btn-coupon'>APPLY</button>
                    </div>
                  </div>
                  <div>
                    <h6 className='know'>
                      Know More
                    </h6>
                  </div>
                </div>
                <hr />
                <div>
                  <h5>Price Detail(1 item)</h5>
                </div>
                <div className="price-detail-div">
                  <p>Total MRP</p>
                  <h6>{totlaAmount}</h6>
                </div>
                <div className="price-discount-div">
                  <p>Discount On MRP</p>
                  <h6>₹{totlaAmount * 0.1}</h6>
                </div>
                <div className="price-coupon-div">
                  <p>Coupon Discount</p>
                  <h6>Apply Coupon</h6>
                </div>
                <div className="price-shipping-div">
                  <p>Shipping Free <span>Know More</span></p>
                  <h6>Apply Coupon</h6>
                </div>
                <hr />
                {
                  (totlaAmount !== null || totlaAmount !==0) &&
                  <div className="price-total-div">
                  <p>Total Amount</p>
                  <h6>₹{totlaAmount}</h6>
                </div>
                }
                <div className="btn-place-order">

                  <button className='btn-place'><Link to='/checkout' >CHECKOUT</Link></button>

                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>

    </div>
  )
}

export default Cart