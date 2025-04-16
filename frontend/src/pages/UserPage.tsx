import { useNavigate } from 'react-router-dom';
import MediaItemView from '../components/MediaItemView/MediaItemView';
import { useEffect, useState } from 'react';
import { fetchData } from '../server/server_functions';

const UserPage = () => {
    const navigate = useNavigate();

    const [mediaItems, setMediaItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData("media_item")
            .then((data) => {
                setError(null);
                setLoading(false);
                setMediaItems(data)
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
                setMediaItems([]);
                console.error('Error fetching data:', error);
            });
    }, [])

    return (
        <>
            <h1>User</h1>
            { error ? <p>Error: {error}</p> : null }
            <p>Status: {loading ? "Loading..." : "Idle"}</p>
            <MediaItemView mediaItems={mediaItems ?? []} />
            <button onClick={() => navigate('/home')}>Home</button>
        </>
    )
}

export default UserPage;
