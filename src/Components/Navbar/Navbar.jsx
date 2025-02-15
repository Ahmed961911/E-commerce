import React, { useContext } from 'react'
import style from "./Navbar.module.css" 
import logo from "../../assets/freshcartlogo.svg"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'

export default function Navbar() {

let{numItems} = useContext(CartContext)
let {UserLogin,setUserLogin}= useContext(UserContext)
let navigate = useNavigate()



function signOut(){
  localStorage.removeItem("userToken")
  localStorage.removeItem("ownerID")
  setUserLogin(null);
navigate("/login")
}


  return (
   
<>
<nav className="bg-slate-300 fixed top-0 left-0 right-0 border-gray-200 z-50">
    <div className="flex flex-wrap justify-center lg:justify-between items-center mx-auto max-w-screen-xl p-4">
      <div className='flex items-center gap-5'>
        <Link to=""
         className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo}
            width={"120px"}
             className="h-8" alt="Flowbite Logo" />
        </Link>
{UserLogin?<ul className='flex gap-3'>
  <li>
<NavLink className="text-slate-600" to="">Home</NavLink>
  </li>
  <li>
<NavLink className="text-slate-600 relative" to="cart">Cart 
  {numItems>0 ? <div className='absolute top-[-12px] right-[-10px] size-4 rounded-full bg-emerald-600 text-white flex justify-center items-center'>
  {numItems}
  </div>:null}
  </NavLink>
  </li>
  <li>
<NavLink className="text-slate-600" to="products">Products</NavLink>
  </li>
  <li>
<NavLink className="text-slate-600" to="categories">Categories</NavLink>
  </li>
  <li>
<NavLink className="text-slate-600" to="brands">Brands</NavLink>
  </li>
  <li>
<NavLink className="text-slate-600" to="wishlist">Wish List <i className="fa-regular fa-heart"></i></NavLink>
  </li>
</ul> : null }
        </div>




        <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <ul className='flex gap-4'>
              <li>
                <i className='fab fa-facebook'></i>
              </li>
              <li>
                <i className='fab fa-youtube'></i>
              </li>
              <li>
                <i className='fab fa-instagram'></i>
              </li>
              <li>
                <i className='fab fa-linkedin'></i>
              </li>
              <li>
                <i className='fab fa-twitter'></i>
              </li>
            </ul>

            {UserLogin? <ul className='flex gap-4'>
              <li onClick={signOut}><NavLink to="">Signout</NavLink></li>
              <li><NavLink to="allOrders">Past Orders</NavLink></li>
            </ul>:
            <ul className='flex gap-4'>
            <li> <NavLink to="login">Login</NavLink> </li>
            <li><NavLink to="register">Register</NavLink></li>
          </ul>}
        </div>
    </div>
</nav>

</>
  )
}
