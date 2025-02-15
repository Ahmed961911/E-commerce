import React, { useContext, useEffect, useState } from 'react'
import style from "./RecentProducts.module.css" 
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useProducts from '../../Hooks/useProducts';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishContext } from '../../Context/WishContext';



export default function RecentProducts() {
let {addProductToCart,setnumItems,numItems,getLoggedUserCart} = useContext(CartContext)
let{addProductToWishlist,wished} = useContext(WishContext)
const [loading, setloading] = useState(false)
const [wloading, setwloading] = useState(false)
const [currentID, setcurrentID] = useState(0)
const [wishItems, setwishItems] = useState([])

//   const [products, setproducts] = useState([])

// function getProducts(){
//   axios.get("https://ecommerce.routemisr.com/api/v1/products")
//   .then((res)=>{
// setproducts(res.data.data) 
// })
//   .catch((res)=>{})
//   }


useEffect(()=>{
  getCartItems()
},[wished])

async function addToWish (id){
  setcurrentID(id)
  setwloading(true)
  let response = await addProductToWishlist(id);
  console.log(response) 
  
  if(response?.data?.status == "success" ){toast.success(response.data.message);
    setwloading(false)
  }
  
  else{toast.error(response.data.message);
    setwloading(false)
  }
  }

async function addToCart (id){
  setcurrentID(id)
  setloading(true)
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



let {data,isError,isLoading,error} = useProducts()

if (isLoading){
  return <div className="spinner"></div>
}

if (isError){
  return <h3>{error}</h3>;
}

  return (
    <>
    <div className="row">
    {data.data.data.map((product)=> ( <div key={product.id} className='w-full md:w-1/3 lg:w-1/4 xl:w-1/6'>
  
   <div className='product my-2 p-2'>
   <Link to={`productdetails/${product.id}/${product.category.name}`}> 
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
}

    </div>
    </>
  )
}
