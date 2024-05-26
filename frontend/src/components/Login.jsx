import React,{useState,useEffect} from 'react';
import './Login.css'; // Import your CSS file for styling
import { AiFillGoogleCircle, AiFillFacebook, AiFillTwitterSquare, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link,useNavigate } from 'react-router-dom';
import { login } from '../actions/authAction';
import { useDispatch,useSelector } from 'react-redux';
import {useFormik} from "formik"
import * as yup from 'yup'
import CustomInput from './CustomInput';
import { loginUser } from '../features/user/userSlice';
import Navbar from './Navbar';
import Footer from './Footer'
import {toast} from "react-toastify"


let loginSchema = yup.object({
 
  email:yup.string().email('Email should be valid').required('Email Address is Required'),
  
  password:yup.string().required('Password is Required'),
})

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const authState = useSelector((state) => state.auth)
  const formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema:loginSchema,
    onSubmit:(values)=>{
      dispatch(loginUser(values))
          
    }
  })

  useEffect(() => {
    if (authState.user !== null && authState.isError === false && authState.isAuthenticated === true) {
      navigate('/');
    }
  }, [authState]);
  

  return (
    <>
    <div>
      <Navbar/>
    </div>
    <div className="login-container-div">
      <div className="login-card">
        <h2 className='fs-3'>Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <CustomInput
            type='email'
            name='email'
            placeholder='Enter Your Mail'
            label='Enter Your  Mail'
            onChange={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            value={formik.values.email}
           
            
            />
          </div>
          <div className='error'>
            {
              formik.touched.email && formik.errors.email
            }
          </div>
          <div className="form-group">
          <CustomInput
           type='text'
           name='password'
           placeholder='Password'
           label='Enter Your Password'
            onChange={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            value={formik.values.password}
            />

          </div>
         
          <div className='error'>
            {
              formik.touched.password && formik.errors.password
            }
          </div>
          <div className="forgot-password">
          <Link to='/forgot-password'>
          <p className='text-white mt-2 forgot-password'>Forgot Password?</p>
          </Link>
          </div>
         <div className="btn-para">
         <button type="submit text-center" className='submit-login'>Login</button>
         <Link to='/sign-up'>
         <button type="submit text-center" className='submit-signup'>Sign Up</button>
         </Link>
         </div>
         
        </form>
        
      </div>
    </div>
    <div>
      <Footer />
    </div>
    </>
    
  );
}

export default Login;
