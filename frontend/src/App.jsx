import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/login"
import Signup from "./pages/Signup"
import Watch from "./pages/Watch"
import SearchPage from "./pages/Search"
import { useAuthStore } from "./store/authStore"
import { useLayoutEffect } from "react"
import Protected from "./routes/Protected"

const App = () => {
  const { self } = useAuthStore();

  useLayoutEffect(() => {
    self()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/watch/:id' element={<Protected cmp={<Watch />} />} />
      <Route path='/search' element={<Protected cmp={<SearchPage />} />} />
    </Routes>
  )
}

export default App