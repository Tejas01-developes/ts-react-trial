import axios from 'axios'
import  { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

const Home = () => {


    const navigate=useNavigate()
const[data,setdata]=useState()
const[loading,setloading]=useState(true)
const[file,setfile]=useState(null)
const[url,seturl]=useState(null)
const fileref=useRef(null)



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


const fileupload=async()=>{
    if(!file){
        alert("select the file first")
        return
    }
   
   
const presignedurlupload=await axios.post("http://localhost:3000/apis/upload",
    {},
    {
        params:{filename:file.name,
        filetype:file.type},

        headers:{
            Authorization:`Bearer ${data}`
        }
       },
    
)
if(presignedurlupload.data.success){
    const url=presignedurlupload.data.uploadurl
    const uniquename=presignedurlupload.data.uniquename
    console.log(url)
    const upload=await axios.put(url,file,{
        headers:{
            "Content-Type":file.type
        }
    })
    if(upload.status === 200){
        const payload={
            filename:uniquename,
            filetype:file.type
        }
    const dbres=await axios.post("http://localhost:3000/apis/dbupload",payload,
       {headers:{Authorization:`Bearer ${data}`}}
    )
    if(dbres.data.success){
        alert("document upload succesfully done")
        setfile(null)
        fileref.current=fileref.current.value=""
        return
    }   
    }
    alert("upload fialed")
    
}
}

const getimghandelling=async()=>{
try{
    const res=await axios.get("http://localhost:3000/apis/getimg",{headers:{
        Authorization:`Bearer ${data}`
    },
responseType:"blob"
})
   const imageurl=URL.createObjectURL(res.data)
   console.log("Blob Size:", res.data.size, "bytes | Blob Type:", res.data.type);
   seturl(imageurl)
}catch(err){
    console.log(err)
    alert("loading image failed")
}
}

useEffect(()=>{
return ()=>{
    if(url){
        URL.revokeObjectURL(url)
    }
}
},[url])


  return (
    <div>
        {/* <input type="file" value={file} onChange={handlefile} /> */}
        <input type="file"  ref={fileref} onChange={(e)=>setfile(e.target.files[0])} />
        <button onClick={fileupload}>Upload Document</button>
        <button onClick={getimghandelling}>Get</button>
        <br />
        {file?.name}
        
    { url ? (<img src={url} alt='image fetched from the s3 ' style={{ maxWidth: '100%', height: 'auto' }}/>):
    <p>Image is still not loaded</p>
    
    }


       <br /><br />
        {loading? <h2>Loading......</h2>:data}
     
    </div>
  )
}

export default Home
