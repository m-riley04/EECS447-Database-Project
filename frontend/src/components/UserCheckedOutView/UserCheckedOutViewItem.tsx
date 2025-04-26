import TransactionModel from "../../models/TransactionModel";

interface UserCheckedOutViewItemProps {
    transaction: TransactionModel;
    onReturn: (mediaItemId: number) => void;
    disabled?: boolean;
}

const UserCheckedOutViewItem: React.FC<UserCheckedOutViewItemProps> = ({
    transaction,
    onReturn,
    disabled = false
}) => {

    return (
        <tr>
            <td>{transaction.transaction_id}</td>
            <td>{transaction.user_id}</td>
            <td>{transaction.media_id}</td>
            <td>{transaction.checkout_date.toDateString()}</td>
            <td>{transaction.due_date.toDateString()}</td>
            <td>{transaction.return_date?.toDateString() ?? "N/A"}</td>
            <td>
                <button 
                    onClick={() => onReturn(transaction.media_id)}
                    disabled={disabled}
                >Return</button>
            </td>
        </tr>
    )
}

export default UserCheckedOutViewItem;
