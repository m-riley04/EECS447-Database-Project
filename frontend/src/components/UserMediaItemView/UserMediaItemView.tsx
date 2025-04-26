import MediaItemModel from '../../models/MediaItemModel';
import UserMediaItemViewItem from './UserMediaItemViewItem';

interface UserMediaItemViewProps {
    mediaItems: MediaItemModel[];
    userId: number;
}

const UserMediaItemView: React.FC<UserMediaItemViewProps> = ({
    mediaItems,
    userId
}) => {

    return (

        <div className="table-list-view">
        { mediaItems?.length > 0 ?
            <table>
                <thead>
                    <tr>
                        {Object.keys(mediaItems[0]).map((key, index) => <th key={index}>{key}</th>)}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mediaItems?.map((item, index) => <UserMediaItemViewItem key={index} mediaItem={item} />)}
                </tbody>
            </table>
            : <p>No media items to show.</p>
        }
        </div>
    )
}

export default UserMediaItemView;
