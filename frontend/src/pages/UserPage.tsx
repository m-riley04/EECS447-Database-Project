import { useNavigate } from 'react-router-dom';

const UserPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>User</h1>
            <button onClick={() => navigate('/home')}>Home</button>
        </>
    )
}

export default UserPage;
