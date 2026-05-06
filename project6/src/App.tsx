import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Loginpage from './pages/loginpage'
import Regpage from './pages/Regpage'
import Homepage from './pages/homepage'

const App = () => {
  return (
    <div>
      <div>
       <h1> Upload documentds </h1>
      </div>
   <Routes>
    {/* page for the register user */}
<Route path="/register" element={<div><Regpage/></div>}/>

<Route path='/' element={<Loginpage/>}/>

<Route path='/home' element={<Homepage/>}/>
   </Routes>

    </div>
  )
}

export default App
