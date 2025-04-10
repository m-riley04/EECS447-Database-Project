import { useNavigate } from 'react-router-dom';

/**
 * The home page of the application.
 */
const HomePage = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>Home</h1>
            <p>This is the blank home page of the application.</p>
            <button onClick={() => navigate('/staff')}>Staff</button>
            <button onClick={() => navigate('/user')}>User</button>
            <button onClick={() => navigate('/')}>Logout</button>
        </>
    )
}

export default HomePage;
