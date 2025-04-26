import { useState } from "react";
import { checkoutMediaItem } from "../../server/server_functions";

interface CheckoutFormProps {
    userId: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
    userId
}) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleCheckoutItem(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const media_item_id = (document.getElementById('media_item_id') as HTMLInputElement).value;
        
        console.log(`Checking out media item ${media_item_id} for user ${userId}`);
        
        setLoading(true);
        checkoutMediaItem(parseInt(media_item_id), userId)
            .then((data) => {
                setLoading(false);
                console.log("Checked out media item successfully:", data);
            })
            .catch((error) => {
                setLoading(false);
                setError(error);
                console.error('Error checking out media item:', error);
            });
    }

    return (

        <form onSubmit={handleCheckoutItem}>
            <input type="number" placeholder="media_item_id" id="media_item_id" />
            <button>Checkout</button>
        </form>
    )
}

export default CheckoutForm;
