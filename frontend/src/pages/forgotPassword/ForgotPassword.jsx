import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import {useFormik} from "formik"
import * as yup from 'yup'
import './ForgotPassword.css'
import { forgotPasswordToken } from '../../features/user/userSlice'
import { useDispatch } from "react-redux"

let forgotPasswordSchema = yup.object({
    email:yup.string().email('Email should be valid').required('Email Address is Required'),
  })

function ForgotPassword() {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues:{
          email:'',
        },
        validationSchema:forgotPasswordSchema,
        onSubmit:(values)=>{
          dispatch(forgotPasswordToken(values))
        }
      })
  return (
    <>
    <div>
        <Navbar/>
    </div>
    <div className="login-container-div">
      <div className="login-card">
        <h2 className='fs-3'>Forgot Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <input
            type='email'
            name='email'
            placeholder='Enter your EMail'
            label='Enter your EMail'
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

         <div className="btn-para">
         <button type="submit text-center" className='submit-btn'>Submit</button>
        
         </div>
         
        </form>
       
      </div>
    </div>
    <div>
        <Footer />
    </div>
    </>
  )
}

export default ForgotPassword