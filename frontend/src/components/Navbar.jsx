// Navbar.js

import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';
import { BsBag } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import { getAProduct } from '../features/products/productSlice';
import { getUserProdCart } from '../features/user/userSlice';
// import 'react-bootstrap-typeahead/css/Typeahead.css';



const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [paginate,setPaginate] = useState(true)
    const [productOpt,setProductOpt] = useState([])
    const navigate = useNavigate()
    const productState = useSelector((state)=>state?.product?.product)
  
    

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > navbar.offsetTop) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const dispatch = useDispatch()
    const cartState = useSelector((state) => state?.auth?.cartProducts)
    const [total, setTotal] = useState(null)
    useEffect(() => {
        let sum = 0;
        for (let index = 0; index < cartState?.length; index++) {
            sum = sum + (Number(cartState[index].quantity) * cartState[index].price)
            // console.log(sum)
            setTotal(sum)
        }
    }, [cartState])

    const handleLogOut = () =>{
        localStorage.clear()
        window.location.reload()
    }
    useEffect(()=>{
        let data = []
        for (let index = 0; index < productState.length; index++) {
            const element = productState[index];
            data.push({id:index,prod:element?._id,name:element?.title})
        }
        setProductOpt(data)
    },[productState])

    const authState = useSelector((state) => state.auth);
    const user = authState?.user;
    const username = user ? user.firstname : null;
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
        <>
            <nav className="navbar">
                <div className="container">
                    <Link to="/" className="logo">Al-Akbar</Link>
                    <div className="search-input">
                       <Typeahead
                       id='pagination-example'
                       onPaginate={()=>console.log('result')}
                       onChange={(selected)=>{
                        navigate(`/product/${selected[0]?.prod}`)
                        dispatch(getAProduct(selected[0]?.prod))
                       }}
                       options={productOpt}
                       paginate={paginate}
                       labelKey={"name"}
                       placeholder='Search for Product...' />
                        <FiSearch className="search-icon" />
                    </div>
                    <div className={`nav-links ${showMenu ? 'show' : ''}`}>

                        <Link to="/">Home</Link>
                        <Link to="/footwear">Our Footwear</Link>
                        <Link to="/fragnance">Our Fragnance</Link>
                        <Link to="/cart">
                            <div className="cart-div ">
                                <div>
                                    <BsBag />

                                    <span className='total-amt'>{cartState && cartState.length ? cartState.length : 0}</span>

                                </div>
                                <div className='price-amt'>
                                    {/* <span className='cart'>Cart</span> */}
                                    <span className='cart'>Amount</span>
                                    <span className='cart-price'>₹{total ? total : 0}</span>
                                </div>


                            </div>
                        </Link>
                        <div className="icon-links">

                            <Link to="/favorites">
                                <AiOutlineHeart />
                                <span className='cart'>Favorites</span>
                            </Link>
                            {user ? (
                                <Link to='/my-profile'>
                                    <AiOutlineUser />
                                    <span className='cart'>Welcome, {authState?.user?.firstname}</span>
                                </Link>

                               
                            ) : (
                                <Link to="/login">
                                    <AiOutlineUser />
                                    <span className='cart'>Account</span>
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="mobile-menu-icon" onClick={toggleMenu}>
                        {showMenu ? <FiX /> : <FiMenu />}
                    </div>
                </div>
            </nav>
            <nav className="second-navbar">
                <div className="container">
                    <nav>
                        <div class="dropdown hover">
                            <a href="#">Shop Categories</a>
                            <ul>
                                <li><a className='frag' onClick={()=>navigate("/fragnance")}style={{cursor:"pointer"}}>Fragnance</a></li>
                                <li><a onClick={()=>navigate("/footwear")}style={{cursor:"pointer"}}>Footwear</a></li>
                                <li><a onClick={()=>navigate("/product")}style={{cursor:"pointer"}}>All Product</a></li>
                                {/* <li><a href="#">Page</a></li>
                                <li><a href="#">Thing</a></li>
                                <li><a href="#">Product</a></li>
                                <li><a href="#">Text</a></li> */}
                            </ul>
                        </div>
                    </nav>
                    <Link to="/product" className='nav-child'>Our Store</Link>
                    <Link to="/getmyorder" className='nav-child'>My Order</Link>
                    {/* <Link to="/blog" className='nav-child'>Our Blog</Link> */}
                    <button className = 'border border-1 bg-transparent text-white text-uppercase btn-logout p-2' onClick={handleLogOut}>Logout</button>
                </div>
            </nav>

        </>

    );
};

export default Navbar;
