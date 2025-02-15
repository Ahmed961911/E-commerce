import React, { useContext, useEffect, useState } from 'react'
import style from "./CategoryProducts.module.css" 
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { CartContext } from '../../Context/CartContext'
import { WishContext } from '../../Context/WishContext'
import toast from 'react-hot-toast'


export default function CategoryProducts() {

  const [relatedProducts, setrelatedProducts] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [subCategories, setsubCategories] = useState([])
 let {addProductToCart,numItems,setnumItems,getLoggedUserCart} = useContext(CartContext)
      let{addProductToWishlist,wished} = useContext(WishContext)
      const [loading, setloading] = useState(false)
      const [wloading, setwloading] = useState(false)
      const [currentID, setcurrentID] = useState(0)
    


let{category,id}=useParams()

function getAllProducts()
{
  axios.get("https://ecommerce.routemisr.com/api/v1/products")
  .then((res)=>{
    console.log(res.data.data)
    setisLoading(false)
setrelatedProducts (res.data.data.filter((product)=>product.category.name == category))
})
  .catch((res)=>{
    setisLoading(false)
  })
  }


  function getSubCategory(id)
  {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
    .then((res)=>{
      console.log(res.data.data)
      setisLoading(false)
      setsubCategories (res.data.data)
     })
    .catch((res)=>{
      setisLoading(false)
    })
    }
  
    async function addToWish (id){
      setcurrentID(id)
      setwloading(true)
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


  useEffect(()=>{
    getAllProducts()
    getSubCategory(id)
  },[wished])


  return (
<>

<div className="row mb-10">
    {subCategories.length >0 ?
         
    subCategories.map((category)=> ( <div key={category._id} className='w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6'>
  
   <div className=' my-2 p-2'>
   <Link to={`/subcategory/${category.name}`}> 
      <h3 className='text-white p-3 rounded-full bg-emerald-600'>{category.name}</h3>
      </Link>
</div>

</div>)):null}

</div>


{isLoading?<div className="spinner"></div>:



<div className="row">

    {relatedProducts.length >0 ?
         
    relatedProducts.map((product)=> ( <div key={product.id} className='w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6'>
  
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
    :<div>
<h1 className='text-center font-bold text-emerald-700' > No Available Products </h1>

      </div>}

    </div>}

   
</> 
 )
}
