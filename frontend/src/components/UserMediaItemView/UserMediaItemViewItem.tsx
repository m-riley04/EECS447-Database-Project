import MediaItemModel from "../../models/MediaItemModel";

interface UserMediaItemViewItemProps {
    mediaItem: MediaItemModel;
    onCheckout: (mediaItemId: number) => void;
    disabled?: boolean;
}

const UserMediaItemViewItem: React.FC<UserMediaItemViewItemProps> = ({
    mediaItem,
    onCheckout,
    disabled = false
}) => {

    return (
        <tr>
            {Object.values(mediaItem).map((key, index) => <td key={index}>{key}</td>)}
            <td>
                <button 
                    onClick={() => onCheckout(mediaItem.media_id)}
                    disabled={disabled}
                >+</button>
            </td>
        </tr>
    )
}

export default UserMediaItemViewItem;
