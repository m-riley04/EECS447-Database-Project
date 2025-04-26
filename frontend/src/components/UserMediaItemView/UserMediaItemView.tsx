import { useState } from 'react';
import MediaItemModel from '../../models/MediaItemModel';
import UserMediaItemViewItem from './UserMediaItemViewItem';
import { checkoutMediaItem } from '../../server/server_functions';

interface UserMediaItemViewProps {
    mediaItems: MediaItemModel[];
    userId: number;
    refreshItems: () => void;
}

const UserMediaItemView: React.FC<UserMediaItemViewProps> = ({
    mediaItems,
    userId,
    refreshItems
}) => {

    const [loadingId, setLoadingId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCheckout = async (mediaItemId: number) => {
        setError(null);
        setLoadingId(mediaItemId);
    
        try {
          await checkoutMediaItem(mediaItemId, userId);
          console.log(`Checked out media item ${mediaItemId} for user ${userId}`);

          refreshItems(); // Refresh items after checkout
        } catch (err: any) {
          setError(err.message ?? String(err));
        } finally {
          setLoadingId(null);
        }
      };

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
                    {mediaItems?.map((item, index) => 
                    <UserMediaItemViewItem 
                        key={index}
                        mediaItem={item}
                        onCheckout={handleCheckout}
                        disabled={!item.availability}
                    />)}
                </tbody>
            </table>
            : <p>No media items to show.</p>
        }
        </div>
    )
}

export default UserMediaItemView;
