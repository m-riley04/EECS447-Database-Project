import { FeeStatusEnum } from "../../enums/FeeStatusEnum";
import FeeModel from "../../models/FeeModel";

interface UserFeeViewItemProps {
    fee: FeeModel;
    onPay: (mediaItemId: number) => void;
    disabled?: boolean;
}

const UserMediaItemViewItem: React.FC<UserFeeViewItemProps> = ({
    fee,
    onPay,
    disabled = false
}) => {

    return (
        <tr>
            <td>{fee.fee_id}</td>
            <td>{fee.user_id}</td>
            <td>{new Date(fee.date_issued).toDateString()}</td>
            <td>{fee.amount}</td>
            <td>{FeeStatusEnum[fee.fee_status_id]}</td>
            <td>
                <button 
                    onClick={() => onPay(fee.fee_id)}
                    disabled={disabled}
                >Pay</button>
            </td>
        </tr>
    )
}

export default UserMediaItemViewItem;
