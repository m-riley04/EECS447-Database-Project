import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>EECS 447 Library</h1>
            <p>Welcome to the library.</p>
            <p>Please login below.</p>
            <button onClick={() => navigate('/login')}>Login</button>
        </>
    )
}

export default LandingPage;
