import UserModel from "../../models/UserModel";

interface UsersViewItemProps {
    user: UserModel;
}

const UsersViewItem: React.FC<UsersViewItemProps> = ({
    user
}) => {

    return (
        <tr>
            <td>{user.user_id}</td>
            <td>{user.membership_type_id}</td>
            <td>{user.account_status_id}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.password}</td>
            <td>{user.is_staff ? 'Yes' : 'No'}</td>
            <td>
                <button>-</button>
            </td>
        </tr>
    )
}

export default UsersViewItem;
