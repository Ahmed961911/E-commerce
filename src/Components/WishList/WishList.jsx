import React, { useContext, useEffect, useState } from 'react'
import style from "./WishList.module.css" 
import { WishContext } from '../../Context/WishContext'
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';


export default function WishList() {

let {addProductToCart} = useContext(CartContext)
let{getWishlist,deleteWishItem}=useContext(WishContext)
const [wishItems, setwishItems] = useState([])
const [isLoading, setisLoading] = useState(true)
const [loading, setloading] = useState(false)
const [currentID, setcurrentID] = useState(0)
const [aloading, setaloading] = useState(false)

async function getWishListItems(){
let response = await getWishlist()
if(response.data.status == "success"){
  setwishItems(response.data.data)
  setisLoading(false)
  setloading(false)
}
}

// function loading(){
//   setisLoading(true)
// }

async function addToCart (id){
  setaloading(true)
  setcurrentID(id)
  let response = await addProductToCart(id);
  console.log(response.data) 
  
  if(response.data.status == "success" ){toast.success(response.data.message);
    setaloading(false)
  }
  
  else{toast.error(response.data.message);
    setaloading(false)
  }
  }
  
  async function deleteItem(id){
    setloading(true)
    setcurrentID(id)
    let response = await deleteWishItem(id)
    console.log(response.data.data)
    if(response.data.status == "success"){
      setwishItems(response.data.data)
      toast.success("product removed from wish list")
// setloading(false)
      
    }
    else{
      toast.error("error")
      // setloading(false)
    }
    }


useEffect(()=>{
  getWishListItems()
},[wishItems])

if (isLoading){
  return <div className="spinner"></div>
}

  return (
    <>
    <div className='bg-slate-300 text-left mt-10 ps-10 py-12'>
      <h1 className=' text-[2rem] mb-5'>
        My Wish List
      </h1>
      {wishItems.length>0? wishItems?.map((item) => 
      <div  key={item.id} className=' border-b-2 flex flex-wrap content-between relative items-center'>
        <div className=' flex flex-wrap items-center py-4 gap-4'>
          <div>
          <img src={item?.imageCover} className='w-full h-[150px]' alt="" />
          </div>
          <div>
            <h3 className='font-semibold text-lg mb-2'>
              {item?.title?.split(" ").slice(0,2).join(' ')}
            </h3>
            <h3 className='text-emerald-600 mb-1'>
              {item?.price} EGP
            </h3>
            <button onClick={()=>{deleteItem(item.id)}} className='flex items-center content-center gap-x-1 text-red-600 text-sm'>
            {loading && currentID==item.id? <i className='fa fa-spinner fa-spin'></i> : <i className="fa-solid fa-trash"></i>}
             <span>Remove </span> 
            </button>
          </div>
        </div>
        
        <button onClick={()=>{addToCart(item.id); deleteItem(item.id)}} className=' absolute right-12 p-4 text-white rounded-3xl bg-emerald-600'>
        {aloading && currentID==item.id ? <i className='fa fa-spinner fa-spin'></i> :"Add To Cart"
       }        </button>
        
      </div>):null}
    </div> 
    </>
  )
}
