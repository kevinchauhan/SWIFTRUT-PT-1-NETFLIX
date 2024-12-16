import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/login"
import Signup from "./pages/Signup"
import Watch from "./pages/Watch"
import SearchPage from "./pages/Search"

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/watch/:id' element={<Watch />} />
      <Route path='/search' element={<SearchPage />} />
    </Routes>
  )
}

export default App