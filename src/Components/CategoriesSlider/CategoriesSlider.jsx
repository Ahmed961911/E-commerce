import React, { useEffect } from 'react'
import style from "./CategoriesSlider.module.css" 
import axios from 'axios'
import { useState } from 'react'
import Slider from "react-slick";
import { Link } from 'react-router-dom';



export default function CategoriesSlider() {

  const [categories, setcategories] = useState([])


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1000

  };



function getCategories(){
  axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  .then((res) => {
    setcategories(res.data.data)
  })
}

useEffect(()=>{
  getCategories()
},[])


  return (
<>
<h2 className='my-4 text-left font-semibold text-gray-600'>
  Shop Popular Categories
</h2>
<Slider {...settings}>
{categories.map((category)=>
  <Link key={category._id} to={`/categoryproducts/${category.name}/${category._id}`}>
<div>
  <img src={category.image} className='w-full h-[200px] object-cover' alt="" />
  <h4>{category.name}</h4>
</div>
</Link>
)
}
  </Slider>
</>
  )
}
