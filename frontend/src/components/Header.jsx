import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BsSearch } from "react-icons/bs"
import "./Header.css"
import { IoCartOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoMdPeople } from "react-icons/io";




function Header() {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <header className='header-top-strip py-3'>
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-6">
                            <p className='text-white mb-0'>Free Shipping Over $100 & Free Returns</p>
                        </div>
                        <div className="col-6">
                            <p className="text-end text-white mb-0">
                                Hotline : <a href='tel: +91 9082670335' className='text-white'>+91 9082670335</a>
                            </p>
                        </div>
                    </div>
                </div>
            </header>
           
            <div>
                <nav className={`navbar ${isMobile ? 'mobile' : ''}`}>
                    <div className="logo">
                        <h2>
                            <Link className='text-white'>Dev Akbar</Link>
                        </h2>
                    </div>
                    
                    <div className='ul-list'>
                    <ul className="nav-list">
                        <li>Home</li>
                        <li>Shop</li>
                        <li>Contact</li>
                    </ul>
                    </div>
                   
                    <div className="icons">

                        <div className="cart-icon">
                            <div>
                                <IoCartOutline />
                            </div>
                            <div className='cart-count'>
                                <span>0</span>
                                <p className='mb-0'>$1000</p>
                            </div>

                        </div>
                        <div className="wishlist-icon">
                            <div>
                            <CiHeart />
                            </div>
                            <div className='wish-count'>
                                <p className='mb-0'>Favourite <br /> Wishlist</p>
                            </div>
                        </div>
                        <div className="wishlist-icon">
                            <div>
                            <IoMdPeople />
                            </div>
                            <div className='wish-count'>
                            <p className='mb-0'>Login <br /> My Account</p>
                            </div>
                        </div>
                    </div>
                    {isMobile && (
                        <div className="menu-icon">&#9776;</div>
                    )}
                </nav>

            </div>

        </div>
    )
}

export default Header





