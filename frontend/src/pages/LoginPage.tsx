import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    function handleLogin(event: React.FormEvent) {
        event.preventDefault();

        // Get email field value
        const email = (event.target as HTMLFormElement).email.value;

        /// TODO: Check if email is in users list

        console.log(`Login form submitted with email '${email}'`);
        navigate("/home");
    }   

    return (
        <>
            <h1>Login</h1>
            <p>Please log in with your email.</p>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <br />
                <button type="submit">Login</button>
                <button type="button" onClick={() => navigate('/create-account')}>Create Account</button>
                <button type="button" onClick={() => navigate('/')}>Cancel</button>
            </form>
        </>
    )
}

export default LoginPage;
