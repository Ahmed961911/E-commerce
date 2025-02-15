import React, { useEffect, useState } from 'react'
import style from "./Categories.module.css" 
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Categories() {


  const [allCategories, setallCategories] = useState([])

function getAllCategories(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  .then((res)=>{
    console.log(res.data.data)
    setallCategories (res.data.data)
   
    })
      .catch((res)=>{})
      
      
}




useEffect(()=>{
  getAllCategories()
},[])

  return (
    <>
     <div className="row">
    {allCategories.length >0 ?       
    allCategories.map((category)=> ( <div key={category._id} className=' w-[100%] sm:w-1/2 md:w-1/3 p-3'>
  
   <div className=' my-2 pb-5 border border-gray-300 hover:shadow-md hover:shadow-emerald-600 transition duration-700'>
   <Link to={`/categoryproducts/${category.name}/${category._id}`}> 
      <img src={category.image} className='w-full h-[250px] object-cover ' alt="" />
      <h3 className=' text-emerald-600 mt-4 font-bold'>{category.name}</h3>
      
      </Link>
    </div>
   
    </div>))
    :<div className="spinner"></div>}

    </div>
    </>
  )
}
