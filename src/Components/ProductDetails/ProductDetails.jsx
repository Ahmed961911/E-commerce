import React, { useContext, useEffect, useState } from 'react'
import style from "./ProductDetails.module.css" 
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from 'react-slick'
import { CartContext } from '../../Context/CartContext'
import { WishContext } from '../../Context/WishContext'
import toast from 'react-hot-toast'


export default function ProductDetails() {

 const [loading, setloading] = useState(false) 
 const [wloading, setwloading] = useState(false)
 const [currentID, setcurrentID] = useState(0) 
  let {id,category} = useParams()
  const [Product, setProduct] = useState(null)
  const [relatedProducts, setrelatedProducts] = useState([])
  let {addProductToCart,setnumItems,getLoggedUserCart} = useContext(CartContext)
  let{addProductToWishlist,wished} = useContext(WishContext)

function getAllProducts()
{
  axios.get("https://ecommerce.routemisr.com/api/v1/products")
  .then((res)=>{
setrelatedProducts (res.data.data.filter((product)=>product.category.name == category))
})
  .catch((res)=>{})
  }
  

function getProduct(id){
  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  .then((res)=>{
setProduct(res.data.data)
  })
  .catch((res)=>{

  })
}

async function addToWish (id){
  setwloading(true)
  setcurrentID(id)
  let response = await addProductToWishlist(id);
  console.log(response.data) 
  
  if(response.data.status == "success" ){toast.success(response.data.message);
    setwloading(false)
  }
  
  else{toast.error(response.data.message);
    setwloading(false)
  }
  }

async function addToCart (id){
  setloading(true)
  setcurrentID(id)
let response = await addProductToCart(id);
console.log(response.data) 


if(response.data.status == "success" ){toast.success(response.data.message);
  getCartItems()
  setloading(false)
}

else{toast.error(response.data.message);
  setloading(false)
}
}

async function getCartItems(){
  let res = await getLoggedUserCart()
   setnumItems(res.data.numOfCartItems) 

  
} 



useEffect(()=>{
  getProduct(id);
  getAllProducts()
},[id,category,wished])

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay:true,
  autoplaySpeed:2000, 
arrows:false
};



  return (
    <>
    <div className='row items-center'>
    <div className='w-full md:w-1/4'>
    <Slider {...settings}>
{Product?.images.map((src)=> <img key={src[1]} src={src} className='w-full'/> )}
</Slider>
    </div>
    <div className='w-3/4 text-left p-5'>
<h3 className='my-4 font-semibold capitalize text-2xl'>
{Product?.title}
</h3>
<h4 className='text-gray-600 my-4'>
{Product?.description}
</h4>
<h4>{Product?.category.name}</h4>
<div className='flex justify-between p-2 my-5'>
        <span>{Product?.price} EGP</span>
        <span><i className='fas fa-star text-yellow-400'></i> {Product?.ratingsAverage}</span>
      </div>
      <div className='flex flex-wrap content-center items-center'>
      <button onClick={()=>addToCart(Product.id)} className=' text-white bg-emerald-600 px-4 py-2 rounded-lg w-[80%] md:w-[90%]'>
      {loading? <i className='fa fa-spinner fa-spin'></i> :"Add To Cart"
       }
      </button>
        <button onClick={()=>addToWish(Product.id)} className=' relative left-6'>
        {wloading? <i className='fa fa-spinner fa-spin fa-2xl'></i> :<i className="fa-solid fa-heart fa-2xl "></i>
       }
        
      </button>
      
      </div>
    </div>
    </div>
    <div className="row">
    {relatedProducts.length >0 ?       
    relatedProducts.map((product)=> ( <div key={product.id} className='w-full md:w-1/3 lg:w-1/4 xl:w-1/6'>
  
   <div className='product my-2 p-2'>
   <Link to={`/productdetails/${product.id}/${product.category.name}`}> 
      <img src={product.imageCover} className='w-full' alt="" />
      <h3 className=' text-emerald-600'>{product.category.name}</h3>
      <h3 className='mb-1 font-semibold'>{product.title.split(" ").slice(0,2).join()}</h3>
      <div className='flex justify-between p-2'>
        <span>{product.price} EGP</span>
        <span><i className='fas fa-star text-yellow-400'></i> {product.ratingsAverage}</span>
      </div>
      </Link>
      {wished.includes(`${product.id}`)? <button onClick={()=>addToWish(product.id)} className='mybtn relative left-[40%] text-red-700'><i className="fa-solid fa-heart fa-xl "></i></button>:<button onClick={()=>addToWish(product.id)} className='mybtn relative left-[40%]'>
      {wloading && currentID==product.id ? <i className='fa fa-spinner fa-spin'></i> :<i className="fa-solid fa-heart fa-xl "></i>
       }
      </button>}
      <button onClick={()=>addToCart(product.id)} className='btn'>
       {loading && currentID==product.id ? <i className='fa fa-spinner fa-spin'></i> :"Add To Cart"
       }
        </button>
          </div>
   
    </div>))
    :<div className="spinner"></div>}

    </div>
    </>
  )
}
