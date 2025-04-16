import { useNavigate } from 'react-router-dom';
import TableListView from '../components/TableListView/TableListView';
import { fetchData } from '../server/server_functions';
import { useState } from 'react';

enum QueryEnum {
    GET_AUTHORS,
    GET_MEDIA_ITEMS,
    GET_GENRES,
    GET_USERS
}

const QueryDebugPage = () => {
    const navigate = useNavigate();
    const [queryItems, setQueryItems] = useState([]);
    const [queryLoading, setQueryLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState(0);

    function handleTestQuery() {
        

        setQueryLoading(true);

        fetchData()
            .then((data) => {
                setQueryLoading(false);
                setQueryItems(data);
            })
            .catch((error) => {
                setQueryLoading(false);
                setError(error);
                console.error('Error fetching data:', error);
            });

        console.log("Test query button clicked");
    }

    return (
        <>
            <h1>Query Debugging Page</h1>
            <p>This page is for debugging all of the different reports, queries, etc. for the database.</p>
            <select>
                <option value={QueryEnum.GET_AUTHORS}>author</option>
                <option value={QueryEnum.GET_MEDIA_ITEMS}>media_item</option>
                <option value={QueryEnum.GET_GENRES}>genre</option>
                <option value={QueryEnum.GET_USERS}>user</option>
            </select>
            <TableListView items={queryItems}></TableListView>
            <p>Status: {error != null ? `Error: ${error}` : queryLoading ? "Loading..." : "Idle" }</p>
            <button onClick={handleTestQuery}>Test Query</button>
            <button onClick={() => navigate('/')}>Back</button>
        </>
    )
}

export default QueryDebugPage;
