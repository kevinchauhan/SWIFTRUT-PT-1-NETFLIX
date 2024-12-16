import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/login"

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App