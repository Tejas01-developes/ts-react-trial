import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../accesstknhandle"
import { useNavigate } from "react-router"


const Homepage = () => {
const[file,setfile]=useState(null)
const[loading,setloading]=useState(true)
const navigate=useNavigate()
const{setaccess,getaccesstoken}=useAuth()

useEffect(()=>{

  
const refreshfunction=async()=>{
if(getaccesstoken()){
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


const uploadfun=async()=>{

try{
const getuploadurl=await axios.post("http://localhost:3000/apis/upload",{},{headers:{
Authorization:`Bearer ${getaccesstoken}`
},
  params:{
    filename:file.name,
    filetype:file.type
  },
})
if(getuploadurl.data.success){
const url=getuploadurl.data.uploadurl
const uniquenm=getuploadurl.data.uniquename
  const uploadfile=await axios.put(url,file,{
    headers:{
      "Content-Type":file.type
    }
  })
  await axios.post("http://localhost:3000/apis/dbupload",{
    filename:file.name,
    filetype:file.type
  },{headers:{Authorization:`Bearer ${getaccesstoken}`}})
  alert("upload of document and meta data  complet")
  setfile(null)
  return
}
}catch(err){
console.log(err)
alert("upload failed")
}
}



  

  if(loading){
    return <h1>Verifying session.............</h1>
  }



  return (
    <div>
      <input type="file" onChange={(e)=>setfile(e.target.files[0])} />
      <button onClick={uploadfun}>Upload</button>
{file &&<p>{file.name}</p>}
    </div>
  )
}

export default Homepage
