import React from 'react';
import './Contact.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import * as yup from "yup"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { createQuery } from '../features/contact/contactSlice';

const contactSchema = yup.object({
    name: yup.string().required('Name is Required!'),
    email: yup.string().nullable().email("Email Should Be Valid").required('Email is Required!'),
    mobile: yup.string().default('').nullable().required('Mobile is Required!'),
    comment: yup.string().default('').nullable().required('Comment is Required!'),
})
const Contact = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            comment: ""
        },
        validationSchema: contactSchema,
        onSubmit: values => {
            dispatch(createQuery(values))
        },
    })
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="contact-container">
                <div>
                    <h2 className='title text-start pt-5'>Contact Us</h2>
                    <form className="contact-form" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="Enter your name"
                                onChange={formik.handleChange('name')}
                                onBlur={formik.handleBlur('name')}
                                values={formik.values.name}
                            />
                        </div>
                        <div className="errors">
                            {
                                formik.touched.name && formik.errors.name && (
                                    <div className="error-message">{formik.errors.name}</div>
                                )
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Enter your email"
                                onChange={formik.handleChange('email')}
                                onBlur={formik.handleBlur('email')}
                                values={formik.values.email}
                            />
                        </div>
                        <div className="errors">
                            {
                                formik.touched.email && formik.errors.email && (
                                    <div className="error-message">{formik.errors.email}</div>
                                )
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile">Mobile</label>
                            <input type="tel" id="mobile" placeholder="Enter your mobile number"
                                onChange={formik.handleChange('mobile')}
                                onBlur={formik.handleBlur('mobile')}
                                values={formik.values.mobile}
                            />
                        </div>
                        <div className="errors">
                            {
                                formik.touched.mobile && formik.errors.mobile && (
                                    <div className="error-message">{formik.errors.mobile}</div>
                                )
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="comments">Comments</label>
                            <textarea id="comments" rows="4" placeholder="Enter your comments" className='comments'
                                onChange={formik.handleChange('comment')}
                                onBlur={formik.handleBlur('comment')}
                                values={formik.values.comment}
                            ></textarea>
                        </div>
                        <div className="errors">
                            {
                                formik.touched.comment && formik.errors.comment && (
                                    <div className="error-message">{formik.errors.comment}</div>
                                )
                            }
                        </div>
                        <button className='send-message'>Send Message</button>
                    </form>
                </div>

            </div>
            <div>
                <Footer />
            </div>
        </>

    );
};

export default Contact;
