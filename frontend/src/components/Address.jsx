import React from 'react'
import './Address.css'
import { FiLock } from 'react-icons/fi';
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"
import { createAnOrder, deleteUserCart, resetCart, resetState } from '../features/user/userSlice';
import { toast } from "react-toastify"
import { config } from '../features/user/userService';
import { getUserProdCart } from '../features/user/userSlice'

function Address() {
    const dispatch = useDispatch()
    const cartState = useSelector((state) => state.auth.cartProducts)
    const [totalAmount, setTotalAmount] = useState(null)
    const [shippingInfo, setShippingInfo] = useState(null)
    const [paymentInfo, setPaymentInfo] = useState({ razorpayOrderId: "", razorpayPaymentId: "" })
    const [cartProductState, setCartProductState] = useState([])
    const authState = useSelector((state) => state?.auth)
    const navigate = useNavigate()
    // console.log(paymentInfo,shippingInfo)
    // console.log(cartState)

    // const calculateTotalAmount = () => cartState.reduce((total, item) => total + (item.price * item.quantity), 0);

    // console.log(calculateTotalAmount)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        state: '',
        city: '',
        country: '',
        pincode: '',
        other: '',
    });
    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
        address: '',
        state: '',
        city: '',
        country: '',
        pincode: '',
        other: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        let items = [];
        for (let index = 0; index < cartState?.length; index++) {
            items.push({ product: cartState[index].productId._id, quantity: cartState[index].quantity, price: cartState[index].price })
            //    color: cartState[index].color._id
        }
        setCartProductState(items)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform validation
        let errors = {};
        if (!formData.firstName) {
            errors.firstName = 'First Name is required';
        }
        if (!formData.lastName) {
            errors.lastName = 'Last Name is required';
        }
        if (!formData.address) {
            errors.address = 'Address is required';
        }
        if (!formData.state) {
            errors.state = 'State is required';
        }
        if (!formData.city) {
            errors.city = 'City is required';
        }
        if (!formData.country) {
            errors.country = 'Country is required';
        }
        if (!formData.pincode) {
            errors.pincode = 'Pincode is required';
        }
        // Similarly, add validation rules for other fields

        if (Object.keys(errors).length === 0) {
            console.log(formData)
            await setShippingInfo(formData)
            setTimeout(() => {
                checkOutHandler()
            }, 300);
            // checkOutHandler()
            // checkoutOrder()
        } else {
            setFormErrors(errors);
        }
    };
    useEffect(() => {
        let sum = 0;
        if (cartState) {
            cartState.forEach((item) => {
                sum += Number(item.quantity) * item.price;
            });
        }
        setTotalAmount(sum);
    }, [cartState]);


    const loadScriptRazorPay = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const checkOutHandler = async () => {
        try {
            const scriptLoaded = await loadScriptRazorPay("https://checkout.razorpay.com/v1/checkout.js");
            if (!scriptLoaded) {
                alert('Razorpay SDK failed to load. Are you online?');
                return;
            }

            const response = await axios.post('http://localhost:5000/api/user/order/checkout', { amount: totalAmount }, config);
            console.log(response)
            const { amount, id: order_id, currency } = response.data.order;

            const options = {
                key: "rzp_test_34RuGdtmXbfWkb",
                amount: amount.toString(),
                currency: currency,
                name: "Al-Akbar",
                description: cartProductState?.description,
                order_id: order_id,
                handler: async function (response) {
                    const data = {
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };

                    const result = await axios.post("http://localhost:5000/api/user/order/paymentVerification", data, config);
                    setTimeout(() => {
                        // dispatch(createAnOrder({totalPrice:totalAmount,totalPriceAfterDiscount:totalAmount,orderItems:cartProductState,paymentInfo:result.data,shippingInfo}))
                        // toast.success('Product Ordered Successfully!')
                        // dispatch(deleteUserCart(config2))
                        const resultAction =  dispatch(createAnOrder({totalPrice:totalAmount,totalPriceAfterDiscount:totalAmount,orderItems:cartProductState,paymentInfo:result.data,shippingInfo}));
                        if (createAnOrder.fulfilled.match(resultAction)) {
                            dispatch(deleteUserCart(config2))
                            dispatch(resetCart());
                        }

                    }, 3000)
                },
                prefill: {
                    name: "AL-Akbar",
                    email: "alakbar@example.com",
                    contact: "9082670335",
                },
                notes: {
                    address: "ssssiiiiiiiiiuuuuuu",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Something went wrong during checkout.');
        }
    };
    useEffect(() => {
        if (authState?.orderedProducts?.order !== null && authState?.orderedProducts?.success === true) {
            navigate('/getmyorder')
        }
    }, [authState])

    const getTokenFromLocalStorage = localStorage.getItem("customer")
        ? JSON.parse(localStorage.getItem("customer"))
        : null;

    const config2 = {
        headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
                }`,
            Accept: "application/json",
        },
    };
    useEffect(() => {
        dispatch(getUserProdCart(config2))
    }, [])




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
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-5 sm-12">
                        <div className='card mt-3'>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <h6 className='contact-title'>Shipping Details</h6>

                                    <div className="mb-3">
                                        <label htmlFor="firstName" className="form-label">First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            onBlur={handleInputChange}
                                        />
                                        {formErrors.firstName && !formData.firstName && <div className='error ms-2 my-1'>{formErrors.firstName}</div>}
                                    </div>


                                    <div className="mb-3">
                                        <label htmlFor="lastName" className="form-label">Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            onBlur={handleInputChange}
                                        />
                                        {formErrors.lastName && !formData.lastName && <div className='error ms-2 my-1'>{formErrors.lastName}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            onBlur={handleInputChange}
                                        />
                                        {formErrors.address && !formData.address && <div className='error ms-2 my-1'>{formErrors.address}</div>}

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="state" className="form-label">State</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="state"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            onBlur={handleInputChange}
                                        />
                                        {formErrors.state && !formData.state && <div className='error ms-2 my-1'>{formErrors.state}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            onBlur={handleInputChange}
                                        />
                                        {formErrors.city && !formData.city && <div className='error ms-2 my-1'>{formErrors.city}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="country" className="form-label">Country</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="country"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            onBlur={handleInputChange}
                                        />
                                        {formErrors.country && !formData.country && <div className='error ms-2 my-1'>{formErrors.country}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="pincode" className="form-label">Pincode</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="pincode"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                            onBlur={handleInputChange}
                                        />
                                        {formErrors.pincode && !formData.pincode && <div className='error ms-2 my-1'>{formErrors.pincode}</div>}

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="other" className="form-label">Other</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="other"
                                            name="other"
                                            value={formData.other}
                                            onChange={handleInputChange}
                                            onBlur={handleInputChange}
                                        />
                                        {/* {formErrors.other && <div className='error ms-2 my-1'>{formErrors.other}</div>} */}
                                    </div>

                                    <div class="mb-3 form-check">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                                    </div>
                                    {/* <div className="place-cart-order"> */}
                                    {/* <Link to = '/cart' className='link'>
                                <button type="submit" class="btn btn-return-cart">Return To Cart</button>
                                </Link> */}

                                    {/* <Link to = '/continue-shipping' className='link'> */}
                                    {/* <button type="submit" class="btn btn-continue">Continue Shipping</button> */}
                                    {/* </Link> */}
                                    {/* <Link to = '/place-order' className='link'> */}
                                    <button type="submit" className="btn-submit">Place Order</button>

                                    {/* </Link> */}

                                    {/* </div> */}

                                </form>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-4 sm-12 mt-3">
                        <div>
                            <h5>Price Detail &nbsp; ({cartState?.length}Item)</h5>
                        </div>
                        {
                            cartState && cartState.map((item, index) => {
                                return (
                                    <div key={index} className="main-parent">
                                        <div className="child-parent">
                                            <div className="order-img">
                                                <img src={item?.productId?.images[0]?.url} alt='not found' />
                                            </div>
                                            <div className="title">
                                                <h5>{item?.productId?.title}</h5>
                                            </div>
                                        </div>
                                        <div className="price-detail-div">
                                            <p>Total MRP</p>
                                            <h6>₹{item?.price * item?.quantity}</h6>
                                        </div>
                                        <div className="price-discount-div">
                                            <p>Brand</p>
                                            <h6>{item?.productId?.brand}</h6>
                                        </div>
                                        <div className="price-coupon-div">
                                            <p>Discount On Mrp</p>
                                            <h6>₹{item?.price * 0.1}</h6>
                                        </div>
                                        <div className="price-shipping-div">
                                            <p>Shipping  <span>Know More</span></p>
                                            <h6>₹100</h6>
                                        </div>
                                        <hr />
                                    </div>
                                )
                            })
                        }
                        <div className="price-total-div">
                            <p>Total Amount</p>
                            <h6>₹{totalAmount + 100}</h6>
                        </div>
                    </div>
                    <div className="col-md-12 mt-3">
                        <div className="symbol-div">
                            <img src='https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png' />
                            <img src='https://pngimg.com/uploads/mastercard/mastercard_PNG14.png' />
                            <img src='https://freepngimg.com/thumb/paypal/2-2-paypal-logo-transparent-png.png' />
                            <img src='http://cdn.onlinewebfonts.com/svg/img_462181.png' />
                            <img src='https://wowjohn.com/wp-content/uploads/2022/05/rupay-logo-png-Transparent-Images-Free-768x542.png' />
                            <img src='https://tse1.mm.bing.net/th?id=OIP.FO-_Q6L7ipKAxoXtMK1AygHaE_&pid=Api&P=0&h=180' />
                            <img src='https://static.vecteezy.com/system/resources/previews/017/221/854/original/google-pay-logo-transparent-free-png.png' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Address