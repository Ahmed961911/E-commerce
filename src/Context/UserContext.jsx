import { createContext, useState } from "react";


export let UserContext = createContext()

export default function UserContextProvider(props){

const [UserLogin, setUserLogin] = useState(
    localStorage.getItem("userToken")? localStorage.getItem("userToken"):null)






    return <UserContext.Provider value = { { UserLogin,setUserLogin} } > 
        {props.children}
    </UserContext.Provider>
}