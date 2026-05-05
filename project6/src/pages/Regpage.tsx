import React, { useState } from 'react'

const Regpage = () => {
const[field,setfield]=useState({name:"",email:"",password:""})

const changefield=(e)=>{
setfield({
    ...field,[e.target.name]:e.target.value
})
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
<button>Register</button>

     </div>
    </div>
  )
}

export default Regpage
