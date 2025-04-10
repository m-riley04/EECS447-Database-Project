import { useNavigate } from 'react-router-dom';

const CreateAccountPage = () => {
    const navigate = useNavigate();

    function handleAccountCreation(event: React.FormEvent) {
        event.preventDefault();

        /// TODO: Add account creation

        console.log("Account created successfully");
        navigate("/login");
    }   

    return (
        <>
            <h1>Create Account</h1>
            <form onSubmit={handleAccountCreation}>
                <label htmlFor="first_name">First Name:</label>
                <input type="text" id="first_name" name="first_name" required />
                <br />
                <label htmlFor="last_name">Last Name:</label>
                <input type="text" id="last_name" name="last_name" required />
                <br />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <br />
                <label htmlFor="phone">Phone Number:</label>
                <input type="phone" id="phone" name="phone" required />
                <br />
                <button type="submit">Create Account</button>
                <button type="button" onClick={() => navigate('/')}>Cancel</button>
            </form>
        </>
    )
}

export default CreateAccountPage;
