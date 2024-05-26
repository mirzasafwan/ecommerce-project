import React from 'react';
import './OurProduct.css'
import Rating from 'react-rating-stars-component';
import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { addToWishList, getAllProducts } from '../features/products/productSlice';
import { useDispatch, useSelector } from "react-redux"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"


const OurProduct = () => {
    const dispatch = useDispatch();
    const [brands,setBrands] = useState([])
    const [categories,setCategories] = useState([])
    const [tags,setTags] = useState([])
    const [colors,setColors] = useState([])
 
    //filter
    const [tag,setTag] = useState(null)
    const [category,setCategory] = useState(null)
    const [brand,setBrand] = useState(null)
    const [color,setColor] = useState(null)
    const [maxPrice,setMaxPrice] = useState(null)
    const [minPrice,setMinPrice] = useState(null)
   const [sort,setSort] = useState(null)


    const getProducts = () => {
        dispatch(getAllProducts({sort,tag,minPrice,maxPrice,category}))
    }
    const productState = useSelector((state) => state?.product?.product || []) ;
    console.log(productState);
    

    const handleAddToWishlist = (prodId) => {
        // alert(prodId)
        dispatch(addToWishList(prodId));
        toast.success('Item Added To WishList!.');
    };


    useEffect(() => {
        getProducts()
    }, [sort,tag,minPrice,maxPrice,category])

    const [sortOption, setSortOption] = useState('Featured');
    const [filteredProducts, setFilteredProducts] = useState([]);
    // const [products, setProducts] = useState([
    //     { id: 1, name: 'Product 1', price: 100, imageUrl: 'http://rbk.h-cdn.co/assets/16/50/1481918402-drew-barrymore-sultry-fragrance.jpg', inStock: true, size: 'S', color: 'Red', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', rating: 4 },
    //     { id: 2, name: 'Product 2', price: 200, imageUrl: 'https://via.placeholder.com/150', inStock: false, size: 'M', color: 'Blue', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', rating: 3 },
    //     { id: 3, name: 'Product 3', price: 150, imageUrl: 'https://via.placeholder.com/150', inStock: true, size: 'L', color: 'Green', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', rating: 5 },
    //     { id: 4, name: 'Product 4', price: 120, imageUrl: 'https://via.placeholder.com/150', inStock: false, size: 'XL', color: 'Yellow', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', rating: 2 },
    //     { id: 5, name: 'Product 5', price: 180, imageUrl: 'https://via.placeholder.com/150', inStock: true, size: 'XXL', color: 'Orange', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', rating: 4 },
    // ]);



    // const filterAndSortProducts = () => {
    //     let filtered = [...products];

    //     // Apply filters based on availability
    //     if (sortOption === 'InStock') {
    //         filtered = filtered.filter(product => product.inStock);
    //     } else if (sortOption === 'OutOfStock') {
    //         filtered = filtered.filter(product => !product.inStock);
    //     }

    //     // Apply sorting based on the selected option
    //     if (sortOption === 'PriceLowToHigh') {
    //         filtered.sort((a, b) => a.price - b.price);
    //     } else if (sortOption === 'PriceHighToLow') {
    //         filtered.sort((a, b) => b.price - a.price);
    //     } else if (sortOption === 'NewestArrivals') {
    //         filtered.sort((a, b) => b.id - a.id); // Assuming newer products have higher IDs
    //     }

    //     // Set filtered products to all products when "All Products" is selected
    //     if (sortOption === 'AllProduct') {
    //         setFilteredProducts(products);
    //     } else {
    //         setFilteredProducts(filtered);
    //     }
    // };

    // const handleSortChange = (e) => {
    //     const value = e.target.value;
    //     if (value === 'Featured' || value === 'NewestArrivals' || value === 'AllProduct') {
    //         setFilteredProducts(products); // Show all products for these options
    //     } else if (value === 'PriceLowToHigh' || value === 'PriceHighToLow') {
    //         setSortOption(value); // For price sorting options, update the sort option
    //     }
    // };



    // useEffect(() => {
    //     filterAndSortProducts();
    // }, [sortOption]);

    // const uniqueColors = [...new Set(products.map(product => product.color))];
    // const uniqueSizes = [...new Set(products.map(product => product.size))];

//    console.log(sort)
   useEffect(()=>{
    let newBrands = []
    let category=[]
    let newTags=[]
    let newColor = []
    for (let index = 0; index < productState.length; index++) {
        const element = productState[index];
        newBrands.push(element.brand)
        category.push(element.category)
        newTags.push(element.tags)
        newColor.push(element.colors)
       }
       setBrands(newBrands)
       setCategories(category)
       setTags(newTags)
       setColors(newColor)
   },[])
   console.log([...new Set(brands)],[...new Set(categories)],[...new Set(tags)])
   const navigate = useNavigate()
    return (
        <div className="container-fluid  bg-light">
            <div className="row">
                <div>
                    <Navbar />
                </div>

                <h2 className='pb-3 our-product-title pt-3'>Our Product</h2>
                <div className="d-flex justify-content-between align-items-center  p-2 sorted-div">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="mb-0">Sort By:</h5>
                        </div>
                        <div>
                            <select className="dropdwon-sort" 
                                onChange={(e)=>setSort(e.target.value)}>
                                <option value='price'>Price: Low to High</option>
                                <option value='-price'>Price: High to Low</option>
                                <option value='title'>Alphatbetically,A-Z</option>
                                <option value='-title'>Alphatbetically,Z-A</option>
                                <option value='createdAt'>Date,Old To New</option>
                                <option value='-createdAt'>Date, New To Old</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <p className="mb-0">Showing {productState?.length} Products</p>
                    </div>
                </div>
                <div className="col-lg-3 pt-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Shop By Categories</h5>
                            {
                                categories && [...new Set(categories)].map((item,index)=>{
                                    return <li key={index} onClick={()=>setCategory(item)} style={{cursor:"pointer"}}>{item}</li>
                                })
                            }
                        </div>
                    </div>
                    {/* <div className="card mt-4">
                        <div className="card-body">
                            <h5 className="card-title">Product Tags</h5>
                            {
                                tags && [...new Set(tags)].map((item,index)=>{
                                    return <li key={index} onClick={()=>setTag(item)}>{item}</li>
                                })
                            }
                        </div>
                    </div> */}
                    {/* <div className="card mt-4">
                        <div className="card-body">
                            <h5 className="card-title">Product Brands</h5>
                            {
                                brands && [...new Set(brands)].map((item,index)=>{
                                    return (
                                        <div key={index} style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                                            <h6 style={{cursor:"pointer"}}  onClick={()=>setBrand(item)}>{item}</h6>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div> */}
                    <div className="card mt-4">
                        <div className="card-body">
                    <h5 className="card-title pt-3">Price </h5>
                            <div className="form-parent">
                                <div className="form-group">
                                    <input type="text" className="form-control border" placeholder="From" onChange={(e)=>setMinPrice(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control border" placeholder="To" onChange={() => setSortOption('PriceHighToLow')} onChange={(e)=>setMaxPrice(e.target.value)} />
                                </div>
                            </div>
                            </div>
                    </div>
                    
                </div>
                <div className="col-lg-9 pt-3">
                    <div className="row">
                       

                    {Array.isArray(productState) && productState.map(product => (
                            <div key={product.id} className="col-lg-4 col-md-6 mb-4 our-product-card" onClick={()=>navigate("/product/"+product._id)}>
                                <div className="card">
                                    {product.images && product.images.length > 0 && (
                                        <img src={product.images[0].url} className="card-img-top-our-product" alt={product.name} />
                                    )}
                                    <div className="wishlist-container">
                                        <span className="wishlist-text">Add to Wishlist</span>
                                        <FaHeart className="wishlist-icon" onClick={() =>
                                            handleAddToWishlist(product?._id)
                                        } />

                                    </div>

                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text">{product.description}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p className="card-text pt-2">${product.price}</p>
                                            <Rating count={5} size={24} value={product.totalrating} edit={false} activeColor="#ffd700" />
                                        </div>
                                        {/* <a href="#" className="btn btn-primary pt-2">Add to Cart</a> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OurProduct;
