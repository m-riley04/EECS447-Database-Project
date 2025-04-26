import { useState } from 'react';
import { payFee } from '../../server/server_functions';
import FeeModel from '../../models/FeeModel';
import { FeeStatusEnum } from '../../enums/FeeStatusEnum';
import UserFeeViewItem from './UserFeeViewItem';

interface UserFeeViewProps {
    fees: FeeModel[];
    userId: number;
    refreshItems: () => void;
}

const UserFeeView: React.FC<UserFeeViewProps> = ({
    fees,
    userId,
    refreshItems
}) => {

    const [loadingId, setLoadingId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handlePayFee = async (feeId: number) => {
        setError(null);
        setLoadingId(feeId);
    
        try {
          await payFee(feeId);
          console.log(`Paid fee ${feeId} for user ${userId}`);

          refreshItems(); // Refresh items after payment
        } catch (err: any) {
          setError(err.message ?? String(err));
        } finally {
          setLoadingId(null);
        }
      };

    return (

        <div className="table-list-view">
            { fees?.length > 0 ?
                <table>
                    <thead>
                        <tr>
                            <th>Fee ID</th>
                            <th>User ID</th>
                            <th>Date Issued</th>
                            <th>Amount</th>
                            <th>Fee Status ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fees?.map((fee, index) => 
                        <UserFeeViewItem 
                            key={index}
                            fee={fee}
                            onPay={handlePayFee}
                            disabled={fee.fee_status_id === FeeStatusEnum.PAID}
                        />)}
                    </tbody>
                </table>
                : <p>No fees to show.</p>
            }
        </div>
    )
}

export default UserFeeView;
