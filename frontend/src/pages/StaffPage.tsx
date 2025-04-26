import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserModel from '../models/UserModel';
import { fetchData, getUserById } from '../server/server_functions';
import TableListView from '../components/TableListView/TableListView';
import FeeModel from '../models/FeeModel';
import TransactionModel from '../models/TransactionModel';

const StaffPage = () => {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserModel | null>(null);
    const [users, setUsers] = useState<UserModel[]>([]);
    const [fees, setFees] = useState<FeeModel[]>([]);
    const [overdueFees, setOverdueFees] = useState<FeeModel[]>([]);
    const [checkedOutItems, setCheckedOutItems] = useState<TransactionModel[]>([]);

    function handleRefreshUser() {
        if (!userId || userId === '0') return;

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

    function handleRefreshUsersList() {
        fetchData('user')
            .then((response) => {
                if (response.length > 0) {
                    setUsers(response);
                } else {
                    console.error('No users found.');
                    setUsers([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
                setUsers([]);
            });
    }

    function handleRefreshFees() {
        fetchData('fee')
            .then((response) => {
                if (response.length > 0) {
                    setFees(response);
                } else {
                    console.error('No fees found.');
                    setFees([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching fees:', error);
                setFees([]);
            });
    }

    function handleRefreshOverdueFees() {
        fetchData('fee/overdue')
            .then((response) => {
                if (response.length > 0) {
                    setOverdueFees(response);
                } else {
                    console.error('No overdue fees found.');
                    setOverdueFees([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching overdue fees:', error);
                setOverdueFees([]);
            });
    }

    function handleRefreshCheckedOutItems() {
        fetchData('media_item/checked_out')
            .then((response) => {
                if (response.length > 0) {
                    setCheckedOutItems(response);
                } else {
                    console.error('No checked out items found.');
                    setCheckedOutItems([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching checked out items:', error);
                setCheckedOutItems([]);
            });
    }

    function refreshTables() {
        handleRefreshUsersList();
        handleRefreshFees();
        handleRefreshOverdueFees();
        handleRefreshCheckedOutItems();
    }
    
    // On page load...
    useEffect(() => {
        handleRefreshUser();
        refreshTables();
    }, [])

    if (!userId || userId === '0') {
        console.error('User ID is not defined. Redirecting to login page.');
        navigate('/login');
        return;
    }

    if (loading) {
        return (
            <>
                <h1>Loading...</h1>
                <p>Please wait while we load the page and user data.</p>
            </>
        )
    }

    if (!user) {
        return (
            <>
                <h1>Error</h1>
                <p>Could not find user with id {userId}.</p>
                <button onClick={() => navigate('/')}>Logout</button>
            </>
        )
    }

    if (!user.is_staff) {
        return (
            <>
                <h1>Error</h1>
                <p>You do not have permission to access this page.</p>
                <button onClick={() => navigate(`/home/${userId}`)}>Home</button>
            </>
        )
    }

    return (
        <>
            <h1>Staff</h1>
            <p>This page is for staff members only to view details about certain clients.</p>

            <h2>Users</h2>
            <TableListView items={users} />

            <h2>Fees</h2>
            <TableListView items={fees} />

            <h3>Overdue Fees</h3>
            <TableListView items={overdueFees} />

            <h2>Checked Out Items</h2>
            <TableListView items={checkedOutItems} />

            <h2>Actions</h2>
            <button onClick={handleRefreshUser}>Refresh User</button>
            <button onClick={refreshTables}>Refresh Tables</button>
            <button onClick={() => {
                // TODO: call "check fees" stored procedure

                refreshTables();
            }}>Check for fees</button>
            <button onClick={() => navigate(`/home/${userId}`)}>Home</button>
        </>
    )
}

export default StaffPage;
