import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Fragnance from './components/Fragnance';
import Footwear from './components/Footwear';
import Cart from './components/Cart';
import Address from './components/Address';
import WishList from './components/WishList';
import Contact from './components/Contact';

import {useEffect} from "react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OurProduct from './components/OurProduct';
import SingleProduct from './components/SingleProduct';
import Order from './pages/Order/Order';
import Profile from './pages/Profile/Profile';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ResestPassword from './pages/resetPassword/ResestPassword';


function App() {
 
  return (
    <div className="App">
      <ToastContainer 
      
      />
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Address />} />
          <Route path='/favorites' element={<WishList />} />
          <Route path="/product/:productId" element={<SingleProduct/>} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResestPassword />} />
          
          <Route path='/getmyorder' element={<Order />} />
          <Route path='/my-profile' element={<Profile />} />
          <Route path='/product' element={<OurProduct />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='/fragnance' element={<Fragnance />} />
            <Route path='/footwear' element={<Footwear />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
