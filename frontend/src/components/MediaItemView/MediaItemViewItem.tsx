import MediaItemModel from "../../models/MediaItemModel";

interface MediaItemViewItemProps {
    mediaItem: MediaItemModel;
}

const TableListViewItem: React.FC<MediaItemViewItemProps> = ({
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

export default TableListViewItem;
