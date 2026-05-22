import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../accesstknhandle"
import { useNavigate } from "react-router"


const Homepage = () => {

const[data,setdata]=useState([])
const[loading,setloading]=useState(true)
const navigate=useNavigate()
const{setaccess,getaccesstoken}=useAuth()

useEffect(()=>{
const refreshfunction=async()=>{
if(getaccesstoken){
  setloading(false)
  return
}
try{
  const regenerate_access=await axios.post("http://localhost:3000/apis/refreshfilter",{},{withCredentials:true})

  if(regenerate_access.data.success){
return setaccess(regenerate_access.data.access)
  }else{
  return navigate("/")
  }
}catch(err){
navigate("/")
}finally{
  setloading(false)
}
}


refreshfunction()
},[loading])



  useEffect(()=>{
 
    const getusers=async()=>{
      try{
        const token=getaccesstoken();
        if(!token){
        return  
        }
      const getusersurl=await axios.get("http://localhost:3000/apis/get")
      if(getusersurl.data.success){
        setdata(getusersurl.data.message)
       }else{ 
        return alert(getusersurl.data.message)
      }
    }
      catch(err){
throw new Error("get user frontend failed")
      }

    }
    if(!loading){
getusers()
    }
  


  },[loading])

  if(loading){
    return <h1>Verifying session.............</h1>
  }



  return (
    <div>
      <input type="file" />
      <button>Upload</button>


      <div style={{display:"flex", alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
        {
          data.map((i,key)=>(
            <div key={key}>
          name:{i.name} ,
          email:{i.email}
             
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Homepage
