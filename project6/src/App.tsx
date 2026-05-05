import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Regpage from './pages/regpage'

const App = () => {
  return (
    <div>
   <Routes>
<Route path="/" element={<div><Regpage/></div>}/>


   </Routes>

    </div>
  )
}

export default App
