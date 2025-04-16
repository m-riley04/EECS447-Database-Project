import { useNavigate } from 'react-router-dom';
import TableListView from '../components/TableListView/TableListView';
import { fetchData } from '../server/server_functions';
import { useState } from 'react';

enum TableEnum {
    GENRE,
    USER,
    MEDIA_ITEM,
    AUTHOR,
    TRANSACTION,
    FEE_STATUS,
    MEDIA_TYPE,
    ACCOUNT_STATUS,
    MEMBERSHIP_TYPE,
}

const QueryDebugPage = () => {
    const navigate = useNavigate();
    const [queryItems, setQueryItems] = useState([]);
    const [queryLoading, setQueryLoading] = useState(false);
    const [error, setError] = useState(null);
    const [table, setTable] = useState(0);

    function handleTestQuery() {
        let api_endpoint = '';
        switch (table) {
            case TableEnum.GENRE:
                api_endpoint = 'genre';
                break;
            case TableEnum.USER:
                api_endpoint = 'user';
                break;
            case TableEnum.MEDIA_ITEM:
                api_endpoint = 'media_item';
                break;
            case TableEnum.AUTHOR:
                api_endpoint = 'author';
                break;
            case TableEnum.TRANSACTION:
                api_endpoint = 'transaction';
                break;
            case TableEnum.FEE_STATUS:
                api_endpoint = 'fee_status';
                break;
            case TableEnum.MEDIA_TYPE:
                api_endpoint = 'media_type';
                break;
            case TableEnum.ACCOUNT_STATUS:
                api_endpoint = 'account_status';
                break;
            case TableEnum.MEMBERSHIP_TYPE:
                api_endpoint = 'membership_type';
                break;
            default:
                api_endpoint = 'author';
                break;
        }

        setQueryLoading(true);
        
        fetchData(api_endpoint)
            .then((data) => {
                setQueryLoading(false);
                setQueryItems(data);
                console.log("Data fetched successfully:", data);
            })
            .catch((error) => {
                setQueryLoading(false);
                setError(error);
                console.error('Error fetching data:', error);
            });

        console.log(`Querying data for '${TableEnum[table]}'`);
    }

    return (
        <>
            <h1>Query Debugging Page</h1>
            <p>This page is for debugging all of the different reports, queries, etc. for the database.</p>
            <div style={{display: 'inline-flex', gap: '10px'}}>
                <p>Table: </p>
                <select title="table" onChange={(e) => setTable(parseInt(e.target.value))}>
                    <option value={TableEnum.GENRE}>genre</option>
                    <option value={TableEnum.USER}>user</option>
                    <option value={TableEnum.MEDIA_ITEM}>media_item</option>
                    <option value={TableEnum.AUTHOR}>author</option>
                    <option value={TableEnum.TRANSACTION}>transaction</option>
                    <option value={TableEnum.FEE_STATUS}>fee_status</option>
                    <option value={TableEnum.MEDIA_TYPE}>media_type</option>
                    <option value={TableEnum.ACCOUNT_STATUS}>account_status</option>
                    <option value={TableEnum.MEMBERSHIP_TYPE}>membership_type</option>
                </select>
            </div>
            <TableListView items={queryItems ?? []}></TableListView>
            <p>Status: {queryLoading ? "Loading..." : "Idle" }</p>
            <p>Result: {error != null ? `Error: ${error}` : `Returned ${(queryItems ?? []).length} rows.`}</p>
            <button onClick={handleTestQuery}>Query</button>
            <button onClick={() => navigate('/')}>Back</button>
        </>
    )
}

export default QueryDebugPage;
