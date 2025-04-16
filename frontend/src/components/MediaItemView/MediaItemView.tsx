import MediaItemModel from '../../models/MediaItemModel';
import MediaItemViewItem from './MediaItemViewItem';

interface MediaItemViewProps {
    mediaItems: MediaItemModel[];
}

const MediaItemView: React.FC<MediaItemViewProps> = ({
    mediaItems
}) => {

    return (
        <table>
            <thead>
                <tr>
                    {mediaItems?.length > 0 ? Object.keys(mediaItems[0]).map((key, index) => <th key={index}>{key}</th>) : null}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {mediaItems?.length > 0 ? mediaItems?.map((item, index) => <MediaItemViewItem key={index} mediaItem={item} />) : null}
            </tbody>
        </table>
    )
}

export default MediaItemView;
