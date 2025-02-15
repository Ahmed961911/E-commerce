import React, { useContext, useState } from 'react'
import style from "./NewPassword.module.css" 
import { useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


export default function Login() {

  let navigate = useNavigate()
  const [ApiError, setApiError] = useState("")
  const [isLoading, setisLoading] = useState(false)


  function handleNewPassword(values){
    setisLoading(true);
     axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
    .then((res)=>{
      setisLoading(false);
      console.log(res)
      if(res.statusText=="OK"){
        navigate("/login")
      }
    })
    .catch((res)=>{
      setisLoading(false);
      setApiError(res.response.data.message)
    })
    
  }

  let myvalidation = yup.object().shape({
    email: yup.string().email("not valid email").required("email is required"),
    newPassword: yup.string().required("Password is required").min(6,"password min length is 6"),
  });

let formik = useFormik ({
  initialValues: {
    email:"",
    newPassword:"",
   
  },
  validationSchema : myvalidation,
  onSubmit: handleNewPassword,
}) 


  return (
    <>
    {ApiError ?  <div className='w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-3'>
{ApiError}
</div>:null}
   
<h2 className='font-bold text-2xl text-center my-4 text-emerald-700'>
Reset Password 
</h2>

    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
 
  <div className="relative z-0 w-full mb-5 group">
      <input 
      type="email" 
      name="email"
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} 
      id="email" 
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
      {formik.errors.email && formik.touched.email ?(

<div className="p-4 mb-4 text-sm text-red-800 rounded-lg">

<span className='font-medium'>{formik.errors.email}</span>
</div>
):null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input 
      type="password" 
      name="newPassword"
      value={formik.values.newPassword}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} 
      id="newPassword" 
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="newPassword" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your newPassword</label>
      {formik.errors.newPassword && formik.touched.newPassword ?(

<div className="p-4 mb-4 text-sm text-red-800 rounded-lg">

<span className='font-medium'>{formik.errors.password}</span>
</div>
):null}
  </div>
  
  <div className='flex gap-4 items-center'>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    {isLoading ? <i className='fas fa-spinner fa-spin'></i>: "Reset Password"}
    </button>
 </div>
  </form>
    </>
  )
}
