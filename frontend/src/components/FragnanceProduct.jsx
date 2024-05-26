import { useState, useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './FragnanceProduct.css'
import { getAllProducts } from '../features/products/productSlice';
import { useDispatch, useSelector } from "react-redux"
import Rating from 'react-rating-stars-component';
import { useNavigate } from "react-router-dom"

function FragnanceProduct() {
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
    const featuredProducts = Array.isArray(productState) ? productState.filter((item) => item.tags && item.tags.includes('Fragnance')) : [];

    useEffect(() => {
        getProducts()
    }, [])
    const navigate = useNavigate()
    return (
        <div>
            <div>
                <h1 className='title'>Our Fragnance</h1>
            </div>
            <div className='carousel-container'>
                <Carousel responsive={responsive}>
                    {featuredProducts.map((product) => (
                        <div className='fragnance'>
                            <div key={product.id} className='fragnance-card'>
                                {product.images && product.images.length > 0 && (
                                    <img src={product.images[0].url} className="card-img-top-fragnance" alt={product.name} loading="lazy"
                                        onClick={() => navigate("/product/" + product._id)}
                                    />
                                )}
                                <h2>{product.title}</h2>
                                {/* <h2>{product.brand}</h2> */}
                                <p className='price text-center'>Rs:-{product.price}</p>
                                <p className='text-center'>{product.description}</p>
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

export default FragnanceProduct