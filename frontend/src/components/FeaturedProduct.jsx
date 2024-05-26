import { useState, useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from './Product';
import './FeaturedProduct.css'
import { getAllProducts } from '../features/products/productSlice';
import { useDispatch, useSelector } from "react-redux"

function FeaturedProduct() {
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

    // Check if productState is an array before filtering
    const featuredProducts = Array.isArray(productState) ? productState.filter((item) => item.tags && item.tags.includes('Featured')) : [];

    useEffect(() => {
        getProducts()
    }, [])
    const product = featuredProducts.map((item) => (
        <Product
            key={item._id} product={item}
        />
    ))
    return (
        <div>
            <div>
                <h1 className='title'>Featured Product</h1>
            </div>
            <div className='carousel-container'>
                <Carousel responsive={responsive}>
                    {product}
                </Carousel>
            </div>

            <div className='feature-banner'>
                <img src='https://t4.ftcdn.net/jpg/03/30/99/39/360_F_330993924_OZX9xMEK1Axyo0sqB9X4tIM8inZVTBsi.jpg' className='feature-banner-img' alt='' />
            </div>
        </div>
    )
}

export default FeaturedProduct