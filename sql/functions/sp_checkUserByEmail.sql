DELIMITER //

CREATE OR REPLACE PROCEDURE spCheckUserByEmail(
    IN email NVARCHAR(320),
    OUT user_id INT
)
BEGIN
    -- Check if the user exists with the given email
    SELECT u.user_id INTO user_id
    FROM user u
    WHERE u.email = email;

    -- If no user found, set user_id to NULL
    IF user_id IS NULL THEN
        SET user_id = NULL;
    END IF;
END //

DELIMITER;