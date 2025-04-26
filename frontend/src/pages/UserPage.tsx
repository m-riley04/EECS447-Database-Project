import { useNavigate, useParams } from 'react-router-dom';
import UserMediaItemView from '../components/UserMediaItemView/UserMediaItemView';
import { useEffect, useState } from 'react';
import { fetchData, getUserById } from '../server/server_functions';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm';
import UserModel from '../models/UserModel';

const UserPage = () => {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState<UserModel | null>(null);

    const [mediaItemsLoading, setMediaItemsLoading] = useState(true);
    const [mediaItems, setMediaItems] = useState([]);

    function handleRefreshMediaItems() {
        console.log('Refreshing media items...');

        // Set states
        setMediaItemsLoading(true);

        // Fetch items
        fetchData("media_item")
            .then((data) => {
                setMediaItemsLoading(false);
                setMediaItems(data)
            })
            .catch((error) => {
                setMediaItemsLoading(false);
                setMediaItems([]);
                console.error('Error fetching data:', error);
            });
    }

    function handleRefreshUser() {
        console.log('Refreshing user...');

        // Get the user based from user id
        if (!userId || userId === '0') return;

        // Set states
        setLoading(true);
        setError(null);
    
        // Get the user based from user id
        getUserById(parseInt(userId))
            .then((response) => {
                if (response.length > 0) {
                    setUser(response[0]);
                } else {
                    console.error(`User with ID ${userId} not found.`);
                    setUser(null);
                }
            })
            .catch((error) => {
                console.error('Error fetching user:', error);
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        // Fetch media items
        handleRefreshMediaItems();

        // Handle user refresh
        handleRefreshUser();
        
    }, []);

    if (!userId || userId === '0') {
        console.error('User ID is not defined. Redirecting to login page.');
        navigate('/login');
        return null;
    }

    if (loading) {
        return (
            <>
                <h1>Loading...</h1>
                <p>Please wait while we load the page and user data.</p>
            </>
        )
    }

    if (error) {
        return (
            <>
                <h1>Error</h1>
                <p>Error: {error}</p>
                <button onClick={handleRefreshUser}>Refresh User</button>
                <button onClick={() => navigate('/')}>Logout</button>
            </>
        )
    }

    if (!user) {
        return (
            <>
                <h1>Error</h1>
                <p>Could not find user with id {userId}.</p>
                <button onClick={handleRefreshUser}>Refresh User</button>
                <button onClick={() => navigate('/')}>Logout</button>
            </>
        )
    }

    return (
        <>
            <h1>User</h1>
            { error ? <p>Error: {error}</p> : null }
            <p>Status: {loading ? "Loading..." : "Idle"}</p>
            <UserMediaItemView 
                mediaItems={mediaItems ?? []}
                userId={parseInt(userId)}
                refreshItems={handleRefreshMediaItems}
            />
            <button onClick={handleRefreshUser}>Refresh User</button>
            <button onClick={handleRefreshMediaItems}>Refresh Media Items</button>
            <button onClick={() => navigate(`/home/${userId}`)}>Home</button>
        </>
    )
}

export default UserPage;
