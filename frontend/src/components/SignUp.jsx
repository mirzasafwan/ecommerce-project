import React, { useState,useEffect } from 'react';
import './SignUp.css'; // Import your CSS file for styling
import { AiFillGoogleCircle, AiFillFacebook, AiFillTwitterSquare, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link,useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { createUser } from '../actions/authAction';
import {useFormik} from "formik"
import * as yup from 'yup'
import CustomInput from './CustomInput';
import {useDispatch,useSelector} from "react-redux"
import { registerUser } from '../features/user/userSlice';

let signUpSchema = yup.object({
  firstname:yup.string().required('First Name is Required'),
  lastname:yup.string().required('Last Name is Required'),
  email:yup.string().nullable().email('Email should be valid').required('Email Address is Required'),
  mobile:yup.string().required('Mobile No is Required'),
  password:yup.string().required('Password is Required'),
})
function SignUp() {
  const authState = useSelector((state)=>state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues:{
      firstname:'',
      lastname:'',
      email:'',
      mobile:'',
      password:''
    },
    validationSchema:signUpSchema,
    onSubmit:(values)=>{
      dispatch(registerUser(values))
    }
  })
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [mobile, setMobile] = useState('');
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  useEffect(() => {
    if (authState.user !== null && authState.isError === false) {
      navigate('/login'); 
    }
  }, [authState]);
  
  
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className='fs-3'>Sign Up</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            
            <CustomInput 
            type='text'
            name='firstname'
            placeholder='Fiirst Name'
            label='Enter Your First Name'
            value={formik.values.firstname}
            onChange={formik.handleChange('firstname')}
            onBlur={formik.handleBlur('firstname')}
            />
          </div>
          <div className='error'>
            {
              formik.touched.firstname && formik.errors.firstname
            }
          </div>
          <div className="form-group">
            
            <CustomInput 
            type='text'
            name='lastname'
            placeholder='Last Name'
            label='Enter Your Last Name'
            value={formik.values.lastname}
            onChange={formik.handleChange('lastname')}
            onBlur={formik.handleBlur('lastname')}
            />
          </div>
          <div className='error'>
            {
              formik.touched.lastname && formik.errors.lastname
            }
          </div>
          <div className="form-group">
            
            <CustomInput 
            type='tel'
            name='mobile'
            placeholder='Mobile Number'
            label='Enter Your Mobile Number'
            value={formik.values.mobile}
            onChange={formik.handleChange('mobile')}
            onBlur={formik.handleBlur('mobile')}
            />
          </div>
          <div className='error'>
            {
              formik.touched.mobile && formik.errors.mobile
            }
          </div>
          <div className="form-group">
           
            <CustomInput 
            type='email'
            name='email'
            placeholder='Email'
            label='Enter Your Email'
            value={formik.values.email}
            onChange={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            />
          </div>
          <div className='error'>
            {
              formik.touched.email && formik.errors.email
            }
          </div>
          {/* <div className="form-group">
            <label htmlFor="password">Password:</label>
            <div className="password-input-container">
              <input type={passwordVisible ? 'text' : 'password'} id="password" name="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
              <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                {passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>
          </div> */}
          <div className="form-group">
            {/* <label htmlFor="firstname">First Name:</label>
            <input type="text" id="firstname" name="firstname" 
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
            /> */}
            <CustomInput 
            type='text'
            name='password'
            placeholder='Password'
            label='Enter Your Password'
            value={formik.values.password}
            onChange={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            />
          </div>
          <div className='error'>
            {
              formik.touched.password && formik.errors.password
            }
          </div>
          
          <p className='text-white mt-2'>Aleready have an Account? <Link to='/login' className="fade-link">
            <span>Sign In</span>
          </Link></p>
          <button type="submit" className='submit-signup'>Sign Up</button>
        </form>
        {/* <div className="line"></div> */}

      </div>
    </div>
  );
}

export default SignUp;
