import {BrowserRouter,Routes,Route,  } from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register";
import Profile from "./pages/Profile"
import ProtectedRoute from "./components/ProtectedRoutes";
import Notes from "./pages/Note";
import Navbar from "./components/Navbar";
function App(){
  return(
    <div>
      <h1>MERN Auth App</h1>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element = {<Login />} />
          <Route path="/register" element = {<Register/>} />
          <Route path="/profile"  element = {<ProtectedRoute><Profile/></ProtectedRoute>} />
          <Route path="/Notes"  element={<ProtectedRoute><Notes/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
      
      

      
    </div>
  )
}

export default App;