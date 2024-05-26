import React from 'react';
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import './WishList.css';
import { useDispatch, useSelector } from "react-redux"
import { getUserProductWishList } from '../features/user/userSlice';
import { useEffect } from "react"
import { IoMdClose } from "react-icons/io";
import { addToWishList } from '../features/products/productSlice';
import { toast } from 'react-toastify';



function WishList() {
    const dispatch = useDispatch()
    const getWishListFromDb = () => {
        dispatch(getUserProductWishList())

    }
    useEffect(() => {
        console.log("Dispatching getUserProductWishList action...");
        getWishListFromDb();
    }, [])

    const WishListState = useSelector((state) => state.auth.wishlist);
    const wishlistItems = WishListState ? WishListState.wishlist : [];
    console.log(wishlistItems)

    const wishlistItemCount = wishlistItems.length;

    const removeFromWishList = (id) => {
        dispatch(addToWishList(id))
        setTimeout(() => {
            dispatch(getUserProductWishList)
            toast.success('Item removed from wishlist successfully !');
        }, 300)

    }


    return (
        <div>
            <div className='w-100'>
                <Navbar />
            </div>
            <div className='wishlist-title'>
                <h3 className='wishlist-item-title'>My WishList</h3>
                <h5 className='wishlist-item-count'>My WishList Item({wishlistItemCount})</h5>
            </div>
            <div className="wishlist-div">
                {
                    wishlistItems.length === 0 && (
                        <div className="text-center pt-2" style={{ margin: "auto" }}>
                            <h5>No Item In Your WishList😞😞😞!</h5>
                        </div>
                    )
                }

                {
                    wishlistItems.map(item => (
                        <>
                            <div className='wishlist-card-parent'>
                                <div key={item.id} className="card mt-4 wishlist-card">

                                    {item.images && item.images.length > 0 && (
                                        <img
                                            src={item.images[0].url}
                                            className="img-fluid wishlist-img"
                                            alt={item.title}
                                            loading="lazy"
                                        />
                                    )}
                                    <IoMdClose onClick={() => { removeFromWishList(item._id) }} className="cancel-icon" />

                                    <div className="card-body">
                                        <h5 className="card-title text-center">{item.title}</h5>
                                        <p className="card-text text-center">{item.description}</p>
                                        <p className='text-center'>Rs.{item.price}</p>
                                        <hr />
                                        <button className="btn btn-cart-bag">
                                            <Link to='/cart' className='text-white'>Move To Bag</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </>

                    ))
                }

            </div>
        </div>
    );
}

export default WishList;
