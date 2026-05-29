import axios from 'axios'

import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

const Home = () => {
    const navigate=useNavigate()
const[data,setdata]=useState()
const[loading,setloading]=useState(true)
const[file,setfile]=useState(null)
const fileref=useRef(null)

const handlefile=(e)=>{
const selectfile=e.target.files[0]
setfile(selectfile)
}

    useEffect(()=>{
const filter=async()=>{
    if(data){
        setloading(false)
        return
    }
    try{
    const res=await axios.post("http://localhost:3000/apis/refreshfilter",{},{withCredentials:true})
    if(res.data.success){
setdata(res.data.access)
return
    }
    alert("refresh filter failed")
    navigate("/")
     
}catch(err){
alert("failed to generate the session")
navigate("/")
}finally{
    setloading(false)
}
}
filter()
    },[])

if(fileref.current){
    fileref.current.value=""
}

  return (
    <div>
        {/* <input type="file" value={file} onChange={handlefile} /> */}
        <input type="file"  ref={fileref} onChange={(e)=>setfile(e.target.files[0])} />
        <button>Upload</button>
        {file?.name}
        



       <br /><br />
        {loading? <h2>Loading......</h2>:data}
     
    </div>
  )
}

export default Home
