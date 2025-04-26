import { useState } from 'react';
import { returnMediaItem } from '../../server/server_functions';
import TransactionModel from '../../models/TransactionModel';
import UserCheckedOutViewItem from './UserCheckedOutViewItem';

interface UserCheckedOutViewProps {
    transactions: TransactionModel[];
    userId: number;
    refreshItems: () => void;
}

const UserCheckedOutView: React.FC<UserCheckedOutViewProps> = ({
    transactions,
    userId,
    refreshItems
}) => {

    const [loadingId, setLoadingId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleReturnMediaItem = async (mediaId: number) => {
        setError(null);
        setLoadingId(mediaId);
    
        try {
          await returnMediaItem(mediaId, userId);
          console.log(`Returned ${mediaId} for user ${userId}`);

          refreshItems(); // Refresh items after return
        } catch (err: any) {
          setError(err.message ?? String(err));
        } finally {
          setLoadingId(null);
        }
      };

    return (

        <div className="table-list-view">
            { transactions?.length > 0 ?
                <table>
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>User ID</th>
                            <th>Media ID</th>
                            <th>Checkout Date</th>
                            <th>Due Date</th>
                            <th>Return Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions?.map((transaction, index) => 
                        <UserCheckedOutViewItem 
                            key={index}
                            transaction={transaction}
                            onReturn={handleReturnMediaItem}
                            disabled={transaction.return_date !== null}
                        />)}
                    </tbody>
                </table>
                : <p>No items checked out.</p>
            }
        </div>
    )
}

export default UserCheckedOutView;
