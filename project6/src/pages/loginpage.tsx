import  { useState } from 'react';
const Loginpage = () => {
  const[field,setfield]=useState({email:"",password:""})

const changefield=(e)=>{
setfield({
    ...field,[e.target.name]:e.target.value
})
}

  return (
    <div>
      <div>
        <h1>Login user</h1>
      </div>
       <div>
<input type="text" placeholder='Email' name='email' value={field.email}  onChange={changefield}/>
<input type="password" placeholder='Password' name='password' value={field.password} onChange={changefield}/>
<button>Login</button>
</div>
    </div>
  )
}

export default Loginpage
