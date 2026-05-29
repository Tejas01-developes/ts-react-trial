import axios from 'axios';
import  { useState } from 'react';
import { useNavigate } from 'react-router'



const Loginpage = () => {
  const[field,setfield]=useState({email:"",password:""})
// const{setaccesstoken}=useAuth()
const changefield=(e)=>{
setfield({
    ...field,[e.target.name]:e.target.value
})
}
const navigate=useNavigate();
const handlelogin=async(e)=>{
  e.preventDefault()
  if(!field.email || !field.password){
    alert("fill up all the fields")
    return
  }
  const loginurl=await axios.post("http://localhost:3000/apis/login",field,{withCredentials:true,headers:{"Content-Type":"application/json"}})
  if(loginurl.data.success){
    alert("user login succesfully");
    // setaccesstoken(loginurl.data.accesstkn)
navigate("/home")
return
  }

  alert("login failed")
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
