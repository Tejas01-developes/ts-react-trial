import { createContext, useContext, useRef } from "react";

const authcontext=createContext(null);

export const authprovider=({children})=>{
const accesstokenref=useRef(null);

const setaccesstoken=(token)=>{
accesstokenref.current= token
}

const getaccesstoken=()=>{
    return accesstokenref.current
}

return (
<authcontext.Provider value={{setaccesstoken,getaccesstoken}}>
    {children}
</authcontext.Provider>


)
}
export const useAuth=()=> useContext(authcontext)