import axios from 'axios';
import  { useState } from 'react';
import { Navigate, useNavigate } from 'react-router'
const Loginpage = () => {
  const[field,setfield]=useState({email:"",password:""})

const changefield=(e)=>{
setfield({
    ...field,[e.target.name]:e.target.value
})
}
const navigate=useNavigate();
const handlelogin=async()=>{
  if(!field.email || !field.password){
    alert("fill up ll the fields")
    return
  }
  const register=await axios.post("http://localhost:3000/apis/login",field)
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
      <div>
        <h1>Login user</h1>
      </div>
       <div>
<input type="text" placeholder='Email' name='email' value={field.email}  onChange={changefield}/>
<input type="password" placeholder='Password' name='password' value={field.password} onChange={changefield}/>
<button onClick={handlelogin}>Login</button>
</div>
    </div>
  )
}

export default Loginpage
