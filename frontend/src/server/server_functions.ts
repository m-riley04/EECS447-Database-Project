import MediaItemModel from "../models/MediaItemModel";

export const SERVER_HOST = import.meta.env.VITE_SERVER_HOST || 'localhost';
export const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || 3001;
export const SERVER_API_URL = `http://${SERVER_HOST}:${SERVER_PORT}/api`;

export async function fetchData(endpoint: string = '') {
    const response = await fetch(`${SERVER_API_URL}/${endpoint}`);
    const data = await response.json();
    return data;
}

export async function getCheckedOutItems(): Promise<MediaItemModel[]> {
    const response = await fetch(`${SERVER_API_URL}/media_item/unavailable`);
    const data = await response.json();
    return data;
}

export async function checkFees() {
    const response = await fetch(`${SERVER_API_URL}/fee/check`);
    const data = await response.json();
    return data;
}

export async function checkUserByEmail(email: string) {
    const response = await fetch(`${SERVER_API_URL}/user/email/${email}`);
    const data = await response.json();

    // Very stupid logic, I know.
    if (data.length > 1) {
        if (data[1].length > 0) {
            return data[1][0];
        }
    }

    return data;
}

export async function getAllOverdueFees() {
    const response = await fetch(`${SERVER_API_URL}/fee/overdue`);
    const data = await response.json();
    return data;
}

export async function getAllTransactions() {
    const response = await fetch(`${SERVER_API_URL}/transaction`);
    const data = await response.json();
    return data;
}

export async function getTransactionsByUserId(userId: number) {
    const response = await fetch(`${SERVER_API_URL}/transaction/${userId}`);
    const data = await response.json();
    return data;
}

export async function getCheckedOutItemsByUserId(userId: number) {
    const response = await fetch(`${SERVER_API_URL}/media_item/checked_out/${userId}`);
    const data = await response.json();
    return data;
}

export async function getFeesByUserId(userId: number) {
    const response = await fetch(`${SERVER_API_URL}/fee/${userId}`);
    const data = await response.json();
    return data;
}


export async function getUserById(userId: number) {
    const response = await fetch(`${SERVER_API_URL}/user/${userId}`);
    const data = await response.json();
    return data;
}

export async function checkoutMediaItem(itemId: number, userId: number) {
    const response = await fetch(`${SERVER_API_URL}/media_item/checkout/${itemId}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: userId })
        }
    );
    const data = await response.json();
    return data;
}

export async function returnMediaItem(itemId: number, userId: number) {
    const response = await fetch(`${SERVER_API_URL}/media_item/return/${itemId}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: userId })
        }
    );
    const data = await response.json();
    return data;
}

export async function payFee(feeId: number) {
    const response = await fetch(`${SERVER_API_URL}/fee/pay/${feeId}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    const data = await response.json();
    return data;
}

export async function resetDatabase() {
    const response = await fetch(`${SERVER_API_URL}/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}