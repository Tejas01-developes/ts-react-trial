
import {Route, Routes} from 'react-router-dom'
import Loginpage from './pages/Loginpage.js'
import Regpage from './pages/Regpage'



const App = () => {
  return (
    <div>
   <Routes>
    {/* page for the register user */}
<Route path="/register" element={<div><Regpage/></div>}/>

{/* logine page */}
<Route path='/' element={<Loginpage/>}/>

{/* home page */}

   </Routes>

    </div>
  )
}

export default App
