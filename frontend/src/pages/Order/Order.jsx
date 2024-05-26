import React, { useEffect } from 'react';
import './Order.css'; // Import CSS file for styling
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";
import { getOrders } from '../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Order = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.auth?.getorderedProduct?.orders || []);


  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  console.log(orderState);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="order-title">
        <h2 className='mt-5 text-center mb-5 order-title'>My Order</h2>
      </div>
      <div className="table-container">
        <table className="order-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Order ID</th>
              <th>Total Amount</th>
              {/* <th>Total Amount After Discount</th> */}
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderState && orderState.map(order => (
              order.orderItems.map(item => (
                <tr key={item._id}>
                  <td>{item.product.title}</td>
                  <td>{order._id}</td>
                  <td>{order.totalPrice}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{order.orderStatus}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Order;
