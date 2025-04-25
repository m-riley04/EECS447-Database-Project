DELIMITER //

CREATE OR REPLACE PROCEDURE spReturnMediaItem(
    p_media_id INT,
    p_user_id INT
)
BEGIN
    -- Get transaction ID for the media item and user
    DECLARE m_transaction_id INT;
    SELECT transaction_id INTO m_transaction_id
    FROM `transaction`
    WHERE media_id = p_media_id AND user_id = p_user_id AND return_date IS NULL;

    IF m_transaction_id IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Media item is not checked out by the user: could not find transaction.';
    END IF;

    -- Update the media item's availability
    UPDATE media_item SET `availability` = True WHERE media_id = p_media_id;

    -- Update the previous transaction by the user
    UPDATE `transaction` SET return_date=CURDATE() WHERE transaction_id = m_transaction_id;
END; //

DELIMITER;