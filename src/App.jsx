import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Brands from './Components/Brands/Brands';
import Categories from './Components/Categories/Categories';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import NotFound from './Components/NotFound/NotFound';
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CartContextProvider from './Context/CartContext'
import  {Toaster} from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout';
import AllOrders from './Components/allOrders/allOrders';
import CategoryProducts from './Components/CategoryProducts/CategoryProducts'
import SubCategory from './Components/SubCategory/SubCategory';
import BrandProducts from './Components/BrandProducts/BrandProducts';
import WishList from './Components/WishList/WishList'
import WishContextProvider from './Context/WishContext'
import ResetPassword from './Components/ResetPassword/ResetPassword';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import NewPassword from './Components/NewPassword/NewPassword';

let query = new QueryClient()

let x = createBrowserRouter([
  {path:"" , element:<Layout />, children:[
    {index:true, element:<ProtectedRoute>< Home /></ProtectedRoute> },
    {path:"brands" , element:<ProtectedRoute> < Brands /> </ProtectedRoute> },
    {path:"categories" , element:<ProtectedRoute> < Categories/> </ProtectedRoute>},
    {path:"checkout" , element:<ProtectedRoute> < Checkout/> </ProtectedRoute>},
    {path:"allorders" , element:<ProtectedRoute> < AllOrders/> </ProtectedRoute>},
    {path:"wishlist" , element:<ProtectedRoute> < WishList/> </ProtectedRoute>},
    {path:"register" , element:< Register/>},
    {path:"newpassword" , element: < NewPassword />},
    {path:"login" , element: < Login />},
    {path:"ForgotPassword" , element: < ForgotPassword />},
    {path:"ResetPassword" , element: < ResetPassword />},
    {path:"productdetails/:id/:category" ,element:<ProtectedRoute> <ProductDetails/></ProtectedRoute>},
    {path:"categoryproducts/:category/:id" ,element:<ProtectedRoute> <CategoryProducts/></ProtectedRoute>},
    {path:"subcategory/:category" ,element:<ProtectedRoute> <SubCategory/></ProtectedRoute>},
    {path:"brandproducts/:brand" ,element:<ProtectedRoute> <BrandProducts/></ProtectedRoute>},
    {path:"cart" , element:<ProtectedRoute> < Cart/> </ProtectedRoute>},
    {path:"products" , element:<ProtectedRoute> <Products/></ProtectedRoute>},
    {path:"*" , element:< NotFound/>}
  ]},
  
])
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='absolute left-0 right-0 '>
    <UserContextProvider>
      <QueryClientProvider client={query}>
      <CartContextProvider>
      <WishContextProvider>
    <RouterProvider router={x}></RouterProvider>
    <Toaster />
    </WishContextProvider>
    </CartContextProvider>
    </QueryClientProvider>
    </UserContextProvider>
    </div>
    
    </>
  )
}

export default App
