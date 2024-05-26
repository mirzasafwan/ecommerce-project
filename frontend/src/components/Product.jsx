
import React from "react"
import './Product.css'
import Rating from 'react-rating-stars-component';
import { Link,useNavigate } from 'react-router-dom';


function Product(props) {
    // const { imageUrl, name, price, description } = props.product;
    const navigate = useNavigate()

    return (
        <div className='feature'>
              
               <div className="feature-card" >
                {props.product.images && props.product.images.length > 0 && (
                    <img className="feature--img" src={props.product.images[0].url} alt={props.name} loading="lazy"
                    onClick={()=>navigate("/product/"+props.product._id)}
                    />
                )}
                    <h2 className='featured-product-tile text-center'>{props.product.title}</h2>
                    <p className='text-center'>{props.product.description}</p>
                    <p className='price text-center'>Rs:-{props.product.price}</p>
                    <Rating count={5} size={24} value={props.product.totalrating} edit={false} activeColor="#ffd700" />
                    {/* <button className='addToCart'>Add to Cart</button> */}
                </div>
              
                
        </div>
    )
}
export default Product