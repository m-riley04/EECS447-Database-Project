import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserModel from '../models/UserModel';
import { getCheckedOutItemsByUserId, getFeesByUserId, getUserById } from '../server/server_functions';
import { AccountStatusEnum } from '../enums/AccountStatusEnum';
import { MembershipTypeEnum } from '../enums/MembershipTypeEnum';
import UserCheckedOutView from '../components/UserCheckedOutView/UserCheckedOutView';
import TransactionModel from '../models/TransactionModel';
import FeeModel from '../models/FeeModel';
import UserFeeView from '../components/UserFeeView/UserFeeView';

/**
 * Formats a phone number string to a standard format.
 * @param phoneNumber A phone number string to format.
 * @returns 
 */
function formatPhoneNumber(phoneNumber: string): string {
    // Format the phone number to (XXX) XXX-XXXX
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
}

/**
 * The home page of the application.
 */
const HomePage = () => {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();

    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState<UserModel | null>(null);
    const [checkedOutItems, setCheckedOutItems] = useState<TransactionModel[]>([]);
    const [fees, setFees] = useState<FeeModel[]>([]);
    const [transactions, setTransactions] = useState<TransactionModel[]>([]);

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

    function handleRefreshCheckedOutItems() {
        if (!userId || userId === '0') return;

        getCheckedOutItemsByUserId(parseInt(userId))
            .then((response) => {
                if (response.length > 0) {
                    setCheckedOutItems(response);
                } else {
                    console.error(`No checked out items found for user ID ${userId}.`);
                    setCheckedOutItems([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching checked out items:', error);
                setCheckedOutItems([]);
            });
    }

    function handleRefreshFees() {
        if (!userId || userId === '0') return;

        getFeesByUserId(parseInt(userId))
            .then((response) => {
                if (response.length > 0) {
                    setFees(response);
                } else {
                    console.error(`No fees found for user ID ${userId}.`);
                    setFees([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching fees:', error);
                setFees([]);
            });
    }

    function handleRefreshTransactions() {

    }

    // On page load...
    useEffect(() => {
        handleRefreshUser();
        handleRefreshCheckedOutItems();
        handleRefreshFees();
        handleRefreshTransactions();
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

    return (
        <>
            <h1>Home</h1>
            <p>This is the blank home page of the application.</p>
            <h2>My Account</h2>
                <p><b>Name</b>: {user.first_name} {user.last_name}</p>
                <p><b>Email</b>: {user.email}</p>
                <p><b>Phone</b>: {formatPhoneNumber(user.phone)}</p>
                <p><b>Account Status</b>: {AccountStatusEnum[user.account_status_id]}</p>
                <p><b>Membership Type</b>: {MembershipTypeEnum[user.membership_type_id]}</p>
                <p><b>Is Staff</b>: {user.is_staff ? "YES" : "NO"}</p>
            <h2>My Checked Out Items</h2>
                <UserCheckedOutView userId={parseInt(userId)} refreshItems={handleRefreshCheckedOutItems} transactions={checkedOutItems} />
            <h2>My Fees</h2>
                <UserFeeView userId={parseInt(userId)} refreshItems={handleRefreshFees} fees={fees} />
            <h2>My Transactions</h2>

            <h2>Actions</h2>
            <button onClick={() => navigate(`/staff/${userId}`)} hidden={!user.is_staff}>Staff</button>
            <button onClick={() => navigate(`/user/${userId}`)}>User</button>
            <button onClick={() => navigate('/')}>Logout</button>
        </>
    )
}

export default HomePage;
