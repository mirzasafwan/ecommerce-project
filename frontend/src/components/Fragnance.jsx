import { useState, useEffect } from 'react';
import './Fragnance.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getAllProducts } from '../features/products/productSlice';
import { useDispatch, useSelector } from "react-redux"
import Rating from 'react-rating-stars-component';
import { useNavigate } from "react-router-dom"

function Fragnance() {
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
                                    <img src="https://e00-marca.uecdn.es/assets/multimedia/imagenes/2017/09/08/15048626048822.jpg" className="fragnance-banner-img1" alt="Slide 1" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h2 className='fs-4'>CR7 Perfume </h2>
                                        <p className='text-white fs-5' > a captivating floral fragrance inspired by the delicate beauty of spring blooms.<br /> Crafted by renowned perfumer Jasmine Smith,this enchanting scent opens <br /> with a burst of fresh citrus notes, leading into a <br /> heart of jasmine and peony.</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src="https://image.freepik.com/free-vector/womens-realistic-perfume-advertising-banner-template_213110-28.jpg" className="fragnance-banner-img1" alt="Slide 2" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h2 className='fs-4 text-black'>CR7 Perfume </h2>
                                        <p className='text-black fs-5' > a captivating floral fragrance inspired by the delicate beauty of spring blooms.<br /> Crafted by renowned perfumer Jasmine Smith,this enchanting scent opens <br /> with a burst of fresh citrus notes, leading into a <br /> heart of jasmine and peony.</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src="https://tse1.mm.bing.net/th?id=OIP.LMRqewIDFPNRTLg4aAotswHaC7&pid=Api&P=0&h=180" className="fragnance-banner-img1" alt="Slide 3" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h2 className='fs-4 text-black'>All Perfumes </h2>
                                        <p className='text-black fs-5' > a captivating floral fragrance inspired by the delicate beauty of spring blooms.<br /> Crafted by renowned perfumer Jasmine Smith,this enchanting scent opens <br /> with a burst of fresh citrus notes, leading into a <br /> heart of jasmine and peony.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='shoes-banner'>
                            <img src='https://static.vecteezy.com/system/resources/previews/000/962/811/original/cosmetic-advertising-banner-with-3d-bottle-set-vector.jpg' alt='' loading='lazy' className="shoes-banner-img" />
                        </div>
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
                                           
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                       
                    </div>
                </div>
            </div>


        </div>

    );
}

export default Fragnance;
