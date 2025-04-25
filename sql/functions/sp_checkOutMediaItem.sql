DELIMITER //

CREATE OR REPLACE PROCEDURE spCheckoutMediaItem(
    p_media_id INT,
    p_user_id INT
)
BEGIN
    -- Check if the media item is available
    DECLARE media_available TINYINT;
    SELECT availability INTO media_available FROM media_item WHERE media_id = p_media_id;

    IF media_available IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Media item not found.';
    END IF;

    IF media_available = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Media item is not available for checkout.';
    END IF;

    UPDATE media_item SET `availability` = False WHERE media_id = p_media_id;

    INSERT INTO `transaction` (user_id, media_id, checkout_date, due_date, return_date)
    VALUES (p_user_id, p_media_id, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 14 DAY), NULL); -- 14 days (2 weeks) for due date
END; //

DELIMITER;