import React from 'react'
import './Footwear.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getAllProducts } from '../features/products/productSlice';
import { useDispatch, useSelector } from "react-redux"
import Rating from 'react-rating-stars-component';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Footwear() {
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
    const navigate = useNavigate()

    return (
        <div>
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="carousel-container">
                            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src="https://storage.pixteller.com/designs/designs-images/2020-12-21/05/running-shoes-sales-banner-1-5fe0c45f6cee4.png" className="footwear-banner-img1" alt="Slide 1" />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h2 className='fs-4'>Shoes </h2>
                                            <p className='text-white fs-5' > Designed for the modern athlete, these shoes seamlessly blend style and performance.<br /> Featuring a sleek and streamlined design with vibrant color accents <br /> he 'StrideFlex' shoes are sure to turn heads on and off the track</p>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="http://assets.matchesfashion.com/content/img/EDITORIALS/2014/MENS/JUNE/04-06/MW-HW/banner.jpg" className="footwear-banner-img1" alt="Slide 2" />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h2 className='fs-4 text-white'>Our Branded Men Sandals </h2>
                                            <p className='text-white fs-5' >  Designed for the modern athlete, these shoes seamlessly blend style and performance.<br /> Featuring a sleek and streamlined design with vibrant color accents <br /> he 'StrideFlex' shoes are sure to turn heads on and off the track</p>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://i.ytimg.com/vi/jIgWCKFctjY/maxresdefault.jpg" className="footwear-banner-img1" alt="Slide 3" />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h2 className='fs-4 text-white'>Premium Shoes </h2>
                                            <p className='text-white fs-5' >  Designed for the modern athlete, these shoes seamlessly blend style and performance.<br /> Featuring a sleek and streamlined design with vibrant color accents <br /> he 'StrideFlex' shoes are sure to turn heads on and off the track</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                               
                                            </div>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                           
                        </div>


                    </div>
                </div>



            </div>
        </div>
    )
}

export default Footwear