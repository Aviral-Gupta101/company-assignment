import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/homepage"
import { CreatePostPage } from "./pages/createaPostPage"
import { RecoilRoot } from "recoil"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"

function App() {


  return (
    <>
      <RecoilRoot>
        <BrowserRouter >
        <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePostPage />} />
          </Routes>
        </BrowserRouter>
        <Footer/>
      </RecoilRoot>

    </>
  )
}

export default App
