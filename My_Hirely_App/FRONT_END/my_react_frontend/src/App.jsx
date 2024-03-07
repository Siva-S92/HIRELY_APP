import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddContents from './pages/AddContents'
import DashBoard from './pages/DashBoard'
import EditContents from './pages/EditContents'
import Login from './pages/Login'
import Signup from './pages/Signup'
import User from './pages/User'
import ResetPassword from './pages/ResetPassword'

function App() {
  const [userContents, setUserContents] = useState([])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <DashBoard/> } ></Route>
          <Route path="/login" element={ <Login/> } ></Route>
          <Route path="/signup" element={ <Signup/> } ></Route>
          <Route path="/user" element={ <User
            userContents={userContents}
            setUserContents={setUserContents} /> } >
          </Route>
          <Route path="/addcontents" element={ <AddContents
            userContents={userContents}
            setUserContents={setUserContents}/> } >
          </Route>
          <Route path="/edit/:id" element={ <EditContents
            userContents={userContents}
            setUserContents={setUserContents}/> } >             
          </Route>
          <Route path='/resetpassword' element={ <ResetPassword/> } ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
