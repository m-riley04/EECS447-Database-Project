import { useNavigate } from 'react-router-dom';
import TableListView from '../components/TableListView/TableListView';
import { checkoutMediaItem, fetchData, getCheckedOutItems, payFee, returnMediaItem } from '../server/server_functions';
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

    function handleCheckedOutItems() {
        setQueryLoading(true);
        
        getCheckedOutItems()
            .then((data) => {
                setQueryLoading(false);
                //setQueryItems(data);
                console.log("Data fetched successfully:", data);
            })
            .catch((error) => {
                setQueryLoading(false);
                setError(error);
                console.error('Error fetching data:', error);
            });
    }

    function handleCheckoutItem(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const user_id = (document.getElementById('checkout_user_id') as HTMLInputElement).value;
        const media_item_id = (document.getElementById('checkout_media_item_id') as HTMLInputElement).value;

        console.log(`Checking out media item ${media_item_id} for user ${user_id}`);

        setQueryLoading(true);
        
        checkoutMediaItem(parseInt(media_item_id), parseInt(user_id))
            .then((data) => {
                setQueryLoading(false);
                //setQueryItems(data);
                console.log("Checked out media item successfully:", data);
            })
            .catch((error) => {
                setQueryLoading(false);
                setError(error);
                console.error('Error checking out media item:', error);
            });

        
    }

    function handleReturnItem(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const user_id = (document.getElementById('return_user_id') as HTMLInputElement).value;
        const media_item_id = (document.getElementById('return_media_item_id') as HTMLInputElement).value;

        console.log(`Returning media item ${media_item_id} for user ${user_id}`);

        setQueryLoading(true);
        
        returnMediaItem(parseInt(media_item_id), parseInt(user_id))
            .then((data) => {
                setQueryLoading(false);
                //setQueryItems(data);
                console.log("Returned media item successfully:", data);
            })
            .catch((error) => {
                setQueryLoading(false);
                setError(error);
                console.error('Error returning media item:', error);
            });

        
    }

    function handlePayFee(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fee_id = (document.getElementById('pay_fee_id') as HTMLInputElement).value;

        console.log(`Paying fee ${fee_id}`);

        setQueryLoading(true);
        
        payFee(parseInt(fee_id))
            .then((data) => {
                setQueryLoading(false);
                //setQueryItems(data);
                console.log("Paid fee successfully:", data);
            })
            .catch((error) => {
                setQueryLoading(false);
                setError(error);
                console.error('Error paying fee:', error);
            });

        
    }

    return (
        <>
            <h1>Query Debugging Page</h1>
            <p>This page is for debugging all of the different reports, queries, etc. for the database.</p>

            <h2>Basic Table Query Testing</h2>
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
            <button onClick={handleTestQuery}>Table Query</button>
            <button onClick={() => setQueryItems([])}>Clear</button>
            <button onClick={() => navigate('/')}>Back</button>

            <h2>Reports Testing</h2>
            <h3>Get all checked out items</h3>
            <button onClick={handleCheckedOutItems}>Checked Out Items</button>

            <h3>"Check out" media item for user</h3>
            <form onSubmit={handleCheckoutItem}>
                <input type="number" placeholder="checkout_user_id" id="checkout_user_id" />
                <input type="number" placeholder="checkout_media_item_id" id="checkout_media_item_id" />
                <button>Checkout</button>
            </form>

            <h3>"Return" media item for user</h3>
            <form onSubmit={handleReturnItem}>
                <input type="number" placeholder="return_user_id" id="return_user_id" />
                <input type="number" placeholder="return_media_item_id" id="return_media_item_id" />
                <button>Return</button>
            </form>

            <h3>"Pay" a fee by fee_id</h3>
            <form onSubmit={handlePayFee}>
                <input type="number" placeholder="pay_fee_id" id="pay_fee_id" />
                <button>Pay</button>
            </form>
        </>
    )
}

export default QueryDebugPage;
