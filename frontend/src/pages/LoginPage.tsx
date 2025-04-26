import { useNavigate } from 'react-router-dom';
import { checkUserByEmail } from '../server/server_functions';

const LoginPage = () => {
    const navigate = useNavigate();

    function handleLogin(event: React.FormEvent) {
        event.preventDefault();

        // Get email field value
        const email = (event.target as HTMLFormElement).email.value;

        // Check if user exists
        checkUserByEmail(email)
            .then((response) => {
                if (response.user_id) {
                    console.log(`User with email '${email}' exists.`);
                    navigate(`/home/${response.user_id}`);
                } else {
                    console.error(`User with email '${email}' does not exist.`);
                    alert("User not found. Please create an account.");
                }
            })
            .catch((error) => {
                console.error('Error checking user:', error);
                alert("An error occurred while checking the user. Please try again.");
            });
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
