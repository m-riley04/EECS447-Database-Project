import MediaItemModel from '../../models/MediaItemModel';
import MediaItemViewItem from './MediaItemViewItem';

interface MediaItemViewProps {
    mediaItems: MediaItemModel[];
}

const MediaItemView: React.FC<MediaItemViewProps> = ({
    mediaItems
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
                    {mediaItems?.map((item, index) => <MediaItemViewItem key={index} mediaItem={item} />)}
                </tbody>
            </table>
            : <p>No media items to show.</p>
        }
        </div>
    )
}

export default MediaItemView;
