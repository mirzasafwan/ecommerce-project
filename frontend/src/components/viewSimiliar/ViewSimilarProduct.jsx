// // ViewSimilarProduct.js

// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// // import Product from '../components/Product';

// function ViewSimilarProduct({ category }) {
//     // Retrieve all products from the Redux store
//     const allProducts = useSelector(state => state.product.products);

//     // Filter products based on the specified categories (tags)
//     const similarProducts = allProducts.filter(product => {
//         // Check if product.tags is defined and includes any of the specified categories (tags)
//         return product.tags?.some(tag => ['Footwear', 'Fragnance', 'Featured'].includes(tag));
//     });

//     return (
//         <div>
//             <h2>Similar Products</h2>
//             <div className="similar-products">
//                 {similarProducts.map(product => (
//                     <div key={product._id} product={product} />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default ViewSimilarProduct;
