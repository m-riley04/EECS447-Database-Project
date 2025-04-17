import UserModel from '../../models/UserModel';
import UsersViewItem from './UsersViewItem';

interface UsersViewProps {
    users: UserModel[];
}

const UsersView: React.FC<UsersViewProps> = ({
    users
}) => {

    return (
        <div className="table-list-view">
            { users?.length > 0 ?
                <table>
                    <thead>
                        <tr>
                            {users?.length > 0 ? Object.keys(users[0]).map((key, index) => <th key={index}>{key}</th>) : null}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                            {users?.length > 0 ? users?.map((item, index) => <UsersViewItem key={index} user={item} />) : null}
                    </tbody>
                </table>
                : <p>No users to show.</p>
            }
        </div>
    )
}

export default UsersView;
