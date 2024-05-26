import React from 'react'
import { useDispatch } from "react-redux"
import {useFormik} from "formik"
import * as yup from 'yup'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useLocation,useNavigate } from "react-router-dom"
import { resetPassword } from '../../features/user/userSlice'

let resetPasswordSchema = yup.object({
    password:yup.string().required('Password is Required'),
})
function ResestPassword() {
    const navigate = useNavigate()
    const location = useLocation()
    const getToken = location.pathname.split("/")[2]
    console.log(getToken)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues:{
          password:'',
        },
        validationSchema:resetPasswordSchema,
        onSubmit:(values)=>{
        //   dispatch(forgotPasswordToken(values))
        dispatch(resetPassword({token:getToken,password:values.password}))
        navigate('/login')
        }
      })
  return (
    <>
    {/* <div>
        <Navbar/>
    </div> */}
    <div className="login-container-div">
      <div className="login-card">
        <h2 className='fs-3'>Reset Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">New Password</label>
            <input
            type='text'
            name='password'
            placeholder='Enter your Password'
            
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
          

         <div className="btn-para">
         <button type="submit text-center" className='submit-btn'>Reset</button>
        
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

export default ResestPassword