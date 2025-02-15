import React, { useEffect, useState } from 'react'
import style from "./Brands.module.css" 
import axios from 'axios'
import { Link } from 'react-router-dom'
Link


export default function Brands() {
  const [allBrands, setallBrands] = useState([])

  function getAllBrands(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    .then((res)=>{
      console.log(res.data.data)
      setallBrands (res.data.data)
     
      })
        .catch((res)=>{})
        
        
  }
  
  
  
  
  useEffect(()=>{
    getAllBrands()
  },[])




  return (
    <>
       <div className="flex flex-wrap items-center content-center ">
        {allBrands.length >0 ?       
        allBrands.map((brand)=> ( <div key={brand._id} className=' w-[100%] p-3 md:w-1/2 xl:w-1/4 '>
      
       <div className=' border-gray-300 border my-2  pt-2 pb-12 hover:shadow-md hover:shadow-emerald-600 transition duration-700 '>
       <Link to={`/brandproducts/${brand.name}`}> 
          <img src={brand.image} className='w-full h-[150px] object-cover' alt="" />
          <h3 className=' text-emerald-600 font-bold'>{brand.name}</h3>
          
          </Link>
        </div>
       
        </div>))
        :<div className="spinner"></div>}
    
        </div>
        </>
  )
}
