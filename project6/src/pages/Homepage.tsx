import axios from "axios"
import { useEffect, useState } from "react"


const Homepage = () => {

const[data,setdata]=useState([])


  useEffect(()=>{
    const getusers=async()=>{
      try{
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
getusers()

  },[])
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
