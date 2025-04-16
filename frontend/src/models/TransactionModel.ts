export default interface TransactionModel {
    transaction_id: number;
    user_id: number;
    media_id: number;
    due_date: Date;
    return_date: Date | null;
    checkout_date: Date;
};