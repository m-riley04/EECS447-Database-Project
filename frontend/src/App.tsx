import { BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import StaffPage from './pages/StaffPage';
import UserPage from './pages/UserPage';
import CreateAccountPage from './pages/CreateAccountPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} index/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="create-account" element={<CreateAccountPage/>}/>
        <Route path="home" element={<HomePage/>}/>
        <Route path="staff" element={<StaffPage/>}/>
        <Route path="user" element={<UserPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
