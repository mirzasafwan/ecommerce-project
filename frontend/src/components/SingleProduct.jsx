import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './SingleProduct.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BsBag } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiDetail } from "react-icons/bi";
import { addRating, getAProduct, getAllProducts } from '../features/products/productSlice';
import { useDispatch, useSelector } from "react-redux";
import Rating from 'react-rating-stars-component';
import { useState } from "react"
import Color from './color/Color';
import { addProdToCart } from '../features/user/userSlice';
import { useNavigate } from "react-router-dom"
import FeaturedProduct from './FeaturedProduct';
import Product from './Product';
import Footwear from './Footwear';
import FragnanceProduct from './FragnanceProduct';
import Carousel from "react-multi-carousel";
import ReactStars from 'react-stars'
import {toast} from 'react-toastify'
import { addToWishList } from '../features/products/productSlice';



function SingleProduct() {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 600 },
            items: 2.5
        },
        tablet: {
            breakpoint: { max: 464, min: 600 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const [color, setColor] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [alreadyAdded, setAlreadyAdded] = useState(false)
    const { productId } = useParams();
    const location = useLocation();
    const getProductId = location.pathname.split('/')[2];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAProduct(getProductId));
        dispatch(getAllProducts())
    }, [dispatch, getProductId]);

    const { images, title, brand, category, tags, description, price, totalrating } = useSelector(state => state.product.product);

    const productState = useSelector((state) => state?.product?.product)
    const cartState = useSelector((state) => state?.auth?.cartProducts)
    const productsState = useSelector((state) => state?.product?.product) || [];

    // console.log(productState?._id)
    const uploadCart = () => {
        dispatch(addProdToCart({ productId: productState?._id, quantity, price: productState?.price }))
        navigate('/cart')
    }

    useEffect(() => {
        if (cartState) {
            for (let index = 0; index < cartState?.length; index++) {
                if (getProductId === cartState[index]?.productId?._id) {
                    setAlreadyAdded(true);
                    break;
                }
            }
        }
    }, [cartState, getProductId]);

    const navigate = useNavigate()


    const [popularProduct, setPopularProduct] = useState([])
    useEffect(() => {
        let data = []
        for (let index = 0; index < productsState.length; index++) {
            const element = productsState[index];
            if (element.tags.includes('Fragnance')) {
                data.push(element)
            }
            setPopularProduct(data)
        }
    }, [productState])
    console.log(popularProduct)
    const [star,setStar] = useState(null)
    const [comment,setComment] = useState(null)

    const addRatingToProduct = (e) => {
        e.preventDefault();
        if(star===null){
            toast.error('Please Give Star To Our Product')
            return false
        }else if(comment===null){
            toast.error('Please Write Review About The Product')
            return false
        }else{
            dispatch(addRating({star:star,comment:comment,prodId:getProductId}))
        toast.success('Review added successfully');
        
        }
        return false
    }
    const handleAddToWishlist = (prodId) => {
        // alert(prodId)
        dispatch(addToWishList(prodId));
        toast.success('Item Added To WishList!.');
    };
 

    return (
        <>
            <Navbar />
            <h2 className='product-detail-title'>Viewing Single Product &nbsp;/ {productState?.title}</h2>
            <div className="single-product-container">
                <div className="product-details">
                    <div className="product-img">
                        {images && images.length > 0 && (
                            <div className='map-product-img-card'>
                                <img src={images[0].url} alt="Product" className='map-prod-detail-img img-fluid' />
                            </div>
                        )}
                    </div>

                    <div className='product-info'>
                        <div className="product-detail-card">
                            <h3 className='title-product-id'>{title}</h3>
                            <h2 className='brand-product-id'>{brand}</h2>
                            <h5 className='title-product-id'>Rs:-<span className='category-gray'>{price}</span> </h5>
                            <hr />
                            <h5 className='title-product-id'>Category: <span className='category-gray'>
                                {category}   </span></h5>
                            <h5 className='title-product-id'>Tags: <span className='category-gray'>
                                {tags && tags.join(', ')} </span></h5>
                            <h5 className='title-product-id'>Rating: <span className='category-gray'>
                                {totalrating}/5   </span></h5>
                            {
                                alreadyAdded === false &&
                                <>
                                    <div className="quantity">
                                        <h5>Quantity</h5>
                                        <input type='number' name="" onChange={(e) => setQuantity(e.target.value)} value={quantity} className='rating-other' />
                                    </div>
                                </>
                            }
                            {/* <div className="quantity">
                            <h5>Color</h5>
                           <Color colorData={productState?.color}/>
                            </div> */}

                            <hr />
                            <h5 className='text-tax'>Inclusive of All Taxes.</h5>
                            <p className='category-gray'>{description}</p>
                            <hr />
                            <div className='parent-btn'>
                                <div className='btn-add-div'>
                                    <button className='add'>  <BsBag className='text-white' />&nbsp; &nbsp;<span className='pt-1 text-white'
                                        onClick={() => { alreadyAdded ? navigate('/cart') : uploadCart() }}
                                    >{alreadyAdded ? "Go To Cart" : "Add To Cart"}</span> </button>
                                </div>
                                <div className='btn-add-div'>
                                    <button className='wish' onClick={() => handleAddToWishlist(productState?._id)}>  <AiOutlineHeart className='text-dark' />&nbsp; &nbsp;<span className='pt-1 text-dark' >WishList</span> </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-rating">
                <h4 className='text-center'>Write A Review</h4>
                <div className="form-parent">
                <form className='d-flex flex-column gap-15 form-div' >
                    <div>
                        <h6 className='text-white'>Customer Review</h6>
                        <ReactStars count={5}  size={24}
                        value={4}
                        edit={true}
                        size={24}
                        color2={'#ffd700'}
                        />
                        
                    </div>
                    <hr />
                    <div>
                        <label htmlFor="rating">Rating</label>
                        <ReactStars count={5}  size={24}
                        value={star}
                        edit={true}
                        size={24}
                        color2={'#ffd700'}
                        onChange={(newRating) => setStar(newRating)}
                        />
                    </div>
                    <div>
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height:"100px"}} 
                     onChange={(e)=>{
                        setComment(e.target.value)
                    }}
                    ></textarea>


                      
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button className='btn-review' type='submit' onClick={addRatingToProduct}>Submit Review</button>
                    </div>
                    <hr />
                    <div className='form-bottom'>
                       {
                        productState && productState.ratings?.map((item,index)=>{
                            return(
                               <>
                                <div className='user-parent'key={index}>
                                <div>
                                {/* <h5 className='text-white'>UserName</h5> */}
                                </div>
                                <div>
                                <ReactStars count={5}  size={24}
                                 value={item?.star}
                                 edit={false}
                                 size={24}
                                 color2={'#ffd700'}
                                 />
                                </div>
                                 </div>
                                 <p className='text-white'>{item?.comment}</p>
                                 <hr />
                               </>
                            )
                        })
                       }
                    </div>
                </form>
                
                </div>
               
            </div>
            <div className="featured-product">
                <h2 className='text-center mt-5 mb-5'>View Our Popular Product</h2>
                <Carousel responsive={responsive}>


                    {
                        popularProduct.map((item, index) => {
                            return (

                                <div key={item.id} className='popular-parent'>
                                    <div className='popular-item-card'>
                                        <img src={item.images[0].url} alt='not found' className='img-fluid popular-item-img' />
                                        <h5 className='item-title'>{item.title}</h5>
                                        <h5 className='item-price'>{item.price}</h5>
                                        <p className='text-center'>{item.description}</p>
                                    </div>
                                </div>

                            )
                        })
                    }
                </Carousel>
            </div>
            <Footer />
        </>
    );
}

export default SingleProduct;
