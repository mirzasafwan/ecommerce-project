import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../features/user/userSlice';
import { FiEdit } from "react-icons/fi"

function Profile() {
    const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

 const config2 = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(true)
    const userState = useSelector((state) => state.auth.user);
    const [formData, setFormData] = useState({
        firstname: userState?.firstname,
        lastname: userState?.lastname,
        email: userState?.email,
        mobile: userState?.mobile,
    });
    const [formErrors, setFormErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        mobile: ''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validation
        let errors = {};
        if (!formData.firstname) {
            errors.firstname = 'First Name is required';
        }
        if (!formData.lastname) {
            errors.lastname = 'Last Name is required';
        }
        if (!formData.email) {
            errors.email = 'Email is required';
        }
        if (!formData.mobile) {
            errors.mobile = 'Mobile No is required';
        }

        if (Object.keys(errors).length === 0) {
            dispatch(updateProfile({formData,config2}))
            setEdit(true)

        } else {
            setFormErrors(errors);
        }
    };
    return (
        <>
            <Navbar />
            <div className="profile-container">
                <h2 className="profile-title">My Profile</h2>
                <div className="card-container">
                    <div className="card">
                        <div className="card-header">
                            <h4>Update Profile</h4>
                            <FiEdit className='edit-icon' onClick={()=>setEdit(false)}/>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="firstname">First Name</label>
                                    <input type="text" name="firstname" id="firstname" placeholder="Enter your first name" className="form-control" required
                                        value={formData.firstname}
                                        onChange={handleInputChange}
                                        onBlur={handleInputChange}
                                        disabled={edit}
                                    />
                                    {formErrors.firstname && !formData.firstname && <div className='error ms-2 my-1'>{formErrors.firstname}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastname">Last Name</label>
                                    <input type="text" name="lastname" id="lastname" placeholder="Enter your last name" className="form-control" required
                                        value={formData.lastname}
                                        onChange={handleInputChange}
                                        onBlur={handleInputChange}
                                        disabled={edit}
                                    />
                                    {formErrors.lastname && !formData.lastname && <div className='error ms-2 my-1'>{formErrors.lastname}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" placeholder="Enter your email" className="form-control" required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        onBlur={handleInputChange}
                                        disabled={edit}
                                    />
                                    {formErrors.email && !formData.email && <div className='error ms-2 my-1'>{formErrors.email}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobile">Mobile</label>
                                    <input type="tel" name="mobile" id="mobile" placeholder="Enter your mobile number" className="form-control" required
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        onBlur={handleInputChange}
                                        disabled={edit}
                                    />
                                    {formErrors.mobile && !formData.mobile && <div className='error ms-2 my-1'>{formErrors.mobile}</div>}
                                </div>
                                {
                                    edit === false &&
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary">Save</button>
                                    </div>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Profile;
