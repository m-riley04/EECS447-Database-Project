DELIMITER //

CREATE OR REPLACE PROCEDURE spPopulateUserTable()
BEGIN
    INSERT INTO `user` (membership_type_id, account_status_id, first_name, last_name, email, phone, is_staff)
    VALUES
        (1, 1, 'John', 'Doe', 'john.doe@gmail.com', '1234567890', 0),
        (1, 1, 'Jane', 'Smith', 'jane.smith@gmail.com', '2345678901', 1),
        (1, 1, 'Alice', 'Johnson', 'alice.johnson@gmail.com', '3456789012', 0),
        (1, 1, 'Bob', 'Brown', 'bob.brown@gmail.com', '4567890123', 1),
        (1, 1, 'Charlie', 'Davis', 'charlie.davis@gmail.com', '5678901234', 0),
        (1, 1, 'Emily', 'Wilson', 'emily.wilson@gmail.com', '6789012345', 1),
        (1, 1, 'Frank', 'Miller', 'frank.miller@gmail.com', '7890123456', 0),
        (1, 1, 'Grace', 'Taylor', 'grace.taylor@gmail.com', '8901234567', 1),
        (1, 1, 'Henry', 'Anderson', 'henry.anderson@gmail.com', '9012345678', 0),
        (1, 1, 'Ivy', 'Thomas', 'ivy.thomas@gmail.com', '0123456789', 1);
END; //

CALL spPopulateUserTable();
DELIMITER;