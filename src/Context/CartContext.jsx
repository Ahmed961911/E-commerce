import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();


export default function CartContextProvider(props){
    let [cartId, setcartId] = useState(123351)
    const [numItems, setnumItems] = useState(0)
    const [user, setuser] = useState(0)    
    // const [owner, setowner] = useState(
    //     localStorage.getItem("ownerID")? localStorage.getItem("ownerID"):null)
    
let owner = localStorage.getItem("ownerID");



    let headers = {
        token: localStorage.getItem("userToken")
    }





function addProductToCart(productId){

        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId:productId},{headers,
        })
        .then((res) => res)
        .catch((err)=>err)

    }

    function getLoggedUserCart (){
    return axios.get("https://ecommerce.routemisr.com/api/v1/cart",{headers})
    .then((res)=>
    {
        
        setnumItems(res.data.numOfCartItems)
        setuser(res.data.data.cartOwner) 
        setcartId(res.data.data._id)
        return res
    })
    .catch((err)=>err)    
}

if (user){
localStorage.setItem('ownerID',user)
}
// setOwner(localStorage.getItem('ownerID'))
//  }


useEffect(()=>{
    getLoggedUserCart();
},[])


function updateCartProductQuantity (id,newCount){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count:newCount},{headers})
    .then((res)=>res)
    .catch((err)=>err)    
}

function deleteCartItem (id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers})
    .then((res)=>res)
    .catch((err)=>err)    
}


function deleteCart (){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
    .then((res)=>res)
    .catch((err)=>err)    
}


function checkout(cartId,url,formdata){

    return axios
    .post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
            shippingAdress: formdata
        },
        {
            headers,
        }
    )
    .then((res)=>res)
    .catch((err)=>err)    
}

function getUserOrders(owner){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${owner}`)
    .then((res)=>res)
    .catch((err)=>err)    

}

    return <CartContext.Provider value={ 
        {owner,getUserOrders,deleteCartItem,deleteCart,updateCartProductQuantity,checkout,cartId,addProductToCart,getLoggedUserCart,numItems,setnumItems}}>
        {props.children}
    </CartContext.Provider>

}