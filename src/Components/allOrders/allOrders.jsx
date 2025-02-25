import React, { useContext, useEffect, useState } from 'react'
import style from "./allOrders.module.css" 
import axios from 'axios'
import { CartContext } from '../../Context/CartContext'


export default function AllOrders() {


let{owner,getLoggedUserCart,getUserOrders}=useContext(CartContext)
const [orders, setorders] = useState([])
const [isLoading, setisLoading] = useState(true)


async function getAllOrders(owner){
let response = await getUserOrders(owner)
    console.log(response.data)
    setisLoading(false)
    setorders(response.data)

   
 
            
}

useEffect(()=>{
  getAllOrders(owner)
  getLoggedUserCart()
},[])

if (isLoading){
  return <div className="spinner"></div>
}


  return (
<>
{ orders?.map((order) => < div key={order.id} className='border shadow-lg my-10 p-8'>
  <div className='flex flex-wrap gap-16 mb-5'>
<span> <span className='font-bold'>Date of order:</span>  {order?.createdAt} </span>
<span> <span className='font-bold'>Paid by:</span>  {order?.paymentMethodType} </span>
<span><span className='font-bold'>Price:</span>{order?.totalOrderPrice} </span>
</div>
<div className='font bold bg-emerald-600 text-white p-4 rounded-lg '>
  <span> Order Details</span>
  </div>
  <div>
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
        
      </tr>
    </thead>
    <tbody>
      {order.cartItems?.map((item) => <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item.product.title}
        </td>
        <td className="px-6 py-4">
          <span>
            {item.count}
          </span>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          ${item.price * item.count}
        </td>
        
      </tr>)}
  
    </tbody>
  </table>
  

</div>
</div>
</div>)}
</>
  )
}
