import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Watch from "./pages/Watch"
import SearchPage from "./pages/Search"
import { useAuthStore } from "./store/authStore"
import { useLayoutEffect } from "react"
import Protected from "./routes/Protected"
import SearchHistory from "./pages/SearchHistory"
import { Toaster } from "react-hot-toast"

const App = () => {
  const { self } = useAuthStore();

  useLayoutEffect(() => {
    self()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/watch/:id' element={<Protected cmp={<Watch />} />} />
        <Route path='/search' element={<Protected cmp={<SearchPage />} />} />
        <Route path='/search-history' element={<Protected cmp={<SearchHistory />} />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App