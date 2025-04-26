import { BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import StaffPage from './pages/StaffPage';
import UserPage from './pages/UserPage';
import CreateAccountPage from './pages/CreateAccountPage';
import QueryDebugPage from './pages/QueryDebugPage';

function App() {
  // NOTE: storing user state through params is not a good idea, but for now it works for our non-prod and non-sensitive purposes.
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} index/>
        <Route path="debug" element={<QueryDebugPage/>} index/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="create-account" element={<CreateAccountPage/>}/>
        <Route path="home/:userId" element={<HomePage/>}/>
        <Route path="staff/:userId" element={<StaffPage/>}/>
        <Route path="user/:userId" element={<UserPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
