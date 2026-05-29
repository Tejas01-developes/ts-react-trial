
import {Route, Routes} from 'react-router-dom'
import Loginpage from './pages/Loginpage.js'
import Regpage from './pages/Regpage'
import Home from './pages/Home.js'



const App = () => {
  return (
    <div>
   <Routes>
    {/* page for the register user */}
<Route path="/register" element={<div><Regpage/></div>}/>

{/* logine page */}
<Route path='/' element={<Loginpage/>}/>

{/* home page */}
<Route path='/home' element={<Home/>}/>
   </Routes>

    </div>
  )
}

export default App
