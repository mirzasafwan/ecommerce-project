import { useState, useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './AkEnterprise.css'
import { getAllProducts } from '../features/products/productSlice';
import { useDispatch, useSelector } from "react-redux"
import Rating from 'react-rating-stars-component';
import { useNavigate } from 'react-router-dom';

function AkEnterprise() {
    const navigate = useNavigate()
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
            breakpoint: { max: 1024, min: 464 },
            items: 2.5
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const dispatch = useDispatch();
    const getProducts = () => {
        dispatch(getAllProducts())
    }
    const productState = useSelector((state) => state.product.product) || [];

    const featuredProducts = Array.isArray(productState) ? productState.filter((item) => item.tags && item.tags.includes('Footwear')) : [];
    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div>
            <div className='shoes-banner'>
                <img src='https://i.pinimg.com/originals/9e/42/e0/9e42e09a0fb02a3e4a969ce224255ca6.jpg' alt='' loading='lazy' className="shoes-banner-img" />
            </div>
            <div>
                <h1 className='title'>Our Footwear</h1>
            </div>
            <div className='carousel-container'>
                <Carousel responsive={responsive}>
                    {featuredProducts.map((product) => (
                        <div className='product'>
                            <div key={product.id} className='product-card'>
                                {product.images && product.images.length > 0 && (
                                    <img src={product.images[0].url} className="card-img-top-footwear" alt={product.name} loading="lazy"
                                        onClick={() => navigate("/product/" + product._id)}
                                    />
                                )}
                                <h2>{product.name}</h2>
                                <p className='price'>Rs:-{product.price}</p>
                                <p>{product.description}</p>
                                <Rating size={24} value={product.totalrating} edit={false} activeColor="#ffd700" />
                                <button className='addToCart'>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default AkEnterprise