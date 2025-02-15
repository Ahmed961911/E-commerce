import React, { useContext, useEffect, useState } from 'react'
import style from "./Cart.module.css" 
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {

  let{ deleteCartItem,updateCartProductQuantity,getLoggedUserCart,deleteCart,numItems,setnumItems}=useContext(CartContext);
const [cartDetails, setcartDetails] = useState(null)
const [isLoading, setisLoading] = useState(true)
const [loading, setloading] = useState(false)
const [currentID, setcurrentID] = useState(0)
const [ploading, setploading] = useState(false)



async function getCartItems(){
let response = await getLoggedUserCart()
console.log(response.data.data)
if(response.data.status == "success"){
  setcartDetails(response.data.data)
  setisLoading(false)
}
}

async function deleteCartItems(){
  setisLoading(true)
  await deleteCart()
  getCartItems()

  }

async function updateproduct(id,count){
  setploading(true)
  setcurrentID(id)
  let response = await updateCartProductQuantity(id,count)
  console.log(response.data.data)
  if(response.data.status == "success"){
    setcartDetails(response.data.data)
    toast.success("product updatet successfully")
    setploading(false)
  }
  else{
    toast.error("error")
    setploading(false)
  }
  }


  async function deleteItem(id){
    setloading(true)
    setcurrentID(id)
    let response = await deleteCartItem(id)
    console.log(response.data.data)
    if(response.data.status == "success"){
      setcartDetails(response.data.data)
      toast.success("product removed successfully")
      setnumItems(numItems - 1)
      setloading(false)
    }
    else{
      toast.error("error")
      setloading(false)
    }
    }
  

useEffect(()=>{
getCartItems()
},[])

if (isLoading){
  return <div className="spinner"></div>
}

  return( <>
 
{cartDetails?.products?.length >0 ? 
<>
<h2 className='text-center text-emerald-600 font-bold capitalize my-4'>
  Total Price: {cartDetails?.totalCartPrice}
</h2>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {cartDetails?.products.map((product) => <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product?.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product?.product?.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>updateproduct(product?.product?.id, product?.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
            {ploading && currentID == product.product.id ? <i className='fa fa-spinner fa-spin fa-xl'></i>:<span>
  {product.count}
</span>}
            </div>
            <button onClick={()=>updateproduct(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
               <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          ${product?.price * product?.count}
        </td>
        <td className="px-6 py-4">
          <span onClick={()=>deleteItem(product?.product?.id)} className='cursor-pointer text-red-700'> {loading && currentID== product.product.id ? <i className='fa fa-spinner fa-spin fa-2xl'></i> : <i className="fa-solid fa-trash fa-2xl"></i> 
       } </span>
        </td>
      </tr>)}
  
    </tbody>
  </table>
  <button onClick={()=>deleteCartItems()} className=' w-full bg-red-700 p-2 rounded-xl text-white my-3'><i className="fa-solid fa-trash"></i> Clear Cart</button>
  <Link to={'/checkout'}>  <button className=' btn my-3'>Check Out</button></Link>

</div>
</>:
<h1 className='text-center font-bold text-emerald-700' >Cart Is Empty </h1>
}
</>
   
);
}