import React from 'react';
import { BsGithub, BsInstagram, BsLinkedin, BsYoutube } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './Footer.css'

function Footer() {
  return (
    <div>
      

      <footer className='py-4 footer-bg mt-5'>
      <div className="container-xxl mt-5">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0 mx-auto text-center">
            <h4 className='text-white mb-4'>Contact Us</h4>
            <address className='text-white fs-6'>
              63/A PeerBhoy Mandion Morland <br />Rd, Near Y.M.C.A<br/>
              PinCode:400008
            </address>
            <a href='tel:+91 9082670335' className='mt-3 d-block mb-1 text-white'>
              +91 9082670335
            </a>
            <a href='mailto:akbar000785@gmail.com' className='mt-2 d-block mb-0 text-white'>
              akbar000785@gmail.com
            </a>
            <div className="social-icons d-flex align-items-center mt-4 text-center justify-content-center">
              <a href='' className='text-white social-icon'>
                <BsLinkedin className='fs-4' />
              </a>
              <a href='' className='text-white social-icon'>
                <BsInstagram className='fs-4' />
              </a>
              <a href='' className='text-white social-icon'>
                <BsGithub className='fs-4' />
              </a>
              <a href='' className='text-white social-icon'>
                <BsYoutube className='fs-4' />
              </a>
            </div>
          </div>
          <div className="col-lg-3 mx-auto text-center">
            <h4 className='text-white mb-4'>Information</h4>
            <div className="footer-links d-flex flex-column">
              <Link className='text-white py-2 mb-1'>Privacy Policy</Link>
              <Link className='text-white py-2 mb-1'>Refund Policy</Link>
              <Link className='text-white py-2 mb-1'>Shipping Policy</Link>
              <Link className='text-white py-2 mb-1'>Terms & Condition</Link>
              <Link className='text-white py-2 mb-1'>Blog</Link>
            </div>
          </div>
          <div className="col-lg-3 mx-auto text-center">
            <h4 className='text-white mb-4'>Account</h4>
            <div className="footer-links d-flex flex-column">
              <Link className='text-white py-2 mb-1'>About Us</Link>
              <Link className='text-white py-2 mb-1'>FAQ</Link>
              <Link className='text-white py-2 mb-1'>Contact</Link>
            </div>
          </div>
          <div className="col-lg-2 mx-auto text-center">
            <h4 className='text-white mb-4'>Quick Links</h4>
            <div className="footer-links d-flex flex-column">
              <Link className='text-white py-2 mb-1'>Laptop</Link>
              <Link className='text-white py-2 mb-1'>Headphones</Link>
              <Link className='text-white py-2 mb-1'>Tablets</Link>
              <Link className='text-white py-2 mb-1'>Watch</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>

      <footer className='py-4 footer-bg'>
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className='text-center text-white mb-0'>&copy;{new Date().getFullYear()} Powered By Shaikh Akbar Web Developer</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
