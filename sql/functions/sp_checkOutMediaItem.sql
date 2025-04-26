DELIMITER //

CREATE OR REPLACE PROCEDURE spCheckoutMediaItem(
    p_media_id INT,
    p_user_id INT
)
BEGIN
    -- Declare variables
    DECLARE user_checkout_count INT;
    DECLARE user_borrowing_limit INT DEFAULT 5;
    DECLARE media_available TINYINT;

    -- Check if the media item is available
    SELECT availability INTO media_available FROM media_item WHERE media_id = p_media_id;

    IF media_available IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Media item not found.';
    END IF;

    IF media_available = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Media item is not available for checkout.';
    END IF;

    -- Get the user's borrowing limit from membership TYPE
    SELECT borrowing_limit INTO user_borrowing_limit
    FROM membership_type mt
    JOIN user u ON mt.membership_type_id = u.membership_type_id
    WHERE u.user_id = p_user_id;

    -- Check if the user hasn't exceeded their borrowing limit
    SELECT COUNT(*) INTO user_checkout_count
    FROM `transaction`
    WHERE user_id = p_user_id AND return_date IS NULL; -- Only count items that are currently checked out

    IF user_checkout_count >= user_borrowing_limit THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User has already checked out the maximum number of items.';
    END IF;

    -- Update media item availability
    UPDATE media_item SET `availability` = False WHERE media_id = p_media_id;

    -- Create a new transaction record
    INSERT INTO `transaction` (user_id, media_id, checkout_date, due_date, return_date)
    VALUES (p_user_id, p_media_id, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 14 DAY), NULL); -- 14 days (2 weeks) for due date
END; //

DELIMITER;