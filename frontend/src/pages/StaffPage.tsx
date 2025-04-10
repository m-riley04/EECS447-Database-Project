import { useNavigate } from 'react-router-dom';

const StaffPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>Staff</h1>
            <button onClick={() => navigate('/home')}>Home</button>
        </>
    )
}

export default StaffPage;
