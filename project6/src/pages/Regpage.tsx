import axios, { Axios, type AxiosResponse } from 'axios'
import  {useState } from 'react'
import {useNavigate } from 'react-router'
const Regpage = () => {
const[field,setfield]=useState({name:"",email:"",password:""})
const navigate=useNavigate();
const changefield=(e)=>{
setfield({
    ...field,[e.target.name]:e.target.value
})
}

const handleregister=async(e)=>{

  e.preventDefault()
  if(!field.name || !field.email || !field.password){
    alert("fill up all the fields")
    return
  }
  const register:AxiosResponse=await axios.post("http://localhost:3000/apis/",field)
  if(register.data.success){
    alert("user registered succesfully");
navigate("/")
return
  }
  alert("registration failed")
  return
}


  return (
    <div>
        {/* heading div */}
     <div>
        <h1>Register User</h1>
     </div>

     

{/* body div */}
     <div>
<input type="text" placeholder='Name' name='name' value={field.name} onChange={changefield} />
<input type="text" placeholder='Email' name='email' value={field.email}  onChange={changefield}/>
<input type="password" placeholder='Password' name='password' value={field.password} onChange={changefield}/>
<button onClick={handleregister}>Register</button>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReGezSd64Ec7xshfyIl855quZ6emH_XA4ZNw&s" alt="" />

     </div>
    </div>
  )
}

export default Regpage
