import axios from "axios";
import { createContext, useState } from "react";


export let WishContext = createContext ();




export default function WishContextProvider(props){

    let headers = {
        token: localStorage.getItem("userToken")
    }

    const [wished, setwished] = useState([])


    function addProductToWishlist(productId){

        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{productId:productId},{headers,
        })
        .then((res) =>{ 
        setwished(res.data.data)
        return res
    })
        .catch((err)=>err)

    }

    function getWishlist(){

        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{headers,
        })
        .then((res) => res)
        .catch((err)=>err)

    }

    function deleteWishItem (id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers})
        .then((res)=>{
            setwished(res.data.data)
    return res})
        .catch((err)=>err)    
    }
    



    return <WishContext.Provider value={ { wished,addProductToWishlist,getWishlist,deleteWishItem} }>
        {props.children}
    </WishContext.Provider>
}