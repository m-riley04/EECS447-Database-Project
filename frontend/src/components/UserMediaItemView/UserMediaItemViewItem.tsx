import MediaItemModel from "../../models/MediaItemModel";

interface UserMediaItemViewItemProps {
    mediaItem: MediaItemModel;
}

const UserMediaItemViewItem: React.FC<UserMediaItemViewItemProps> = ({
    mediaItem
}) => {

    return (
        <tr>
            {Object.values(mediaItem).map((key, index) => <td key={index}>{key}</td>)}
            <td>
                <button>+</button>
            </td>
        </tr>
    )
}

export default UserMediaItemViewItem;
