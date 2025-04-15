DELIMITER //

CREATE OR REPLACE PROCEDURE spIsItemAvailable(
    IN media_id INT
)
BEGIN
    -- NOTE: Possibly should do more logic here, or make another procedure to update availability based on transaction table
    SELECT `availability` FROM media_item
    WHERE media_id = media_id;
END //

DELIMITER;