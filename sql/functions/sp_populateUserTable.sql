DELIMITER //

CREATE OR REPLACE PROCEDURE spPopulateUserTable()
BEGIN
    INSERT INTO `user` (membership_type_id, account_status_id, first_name, last_name, email, phone, is_staff)
    VALUES
        (0, 0, 'John', 'Doe', 'john.doe@gmail.com', '1234567890', 0),
        (0, 0, 'Jane', 'Smith', 'jane.smith@gmail.com', '2345678901', 1),
        (0, 0, 'Alice', 'Johnson', 'alice.johnson@gmail.com', '3456789012', 0),
        (0, 0, 'Bob', 'Brown', 'bob.brown@gmail.com', '4567890123', 1),
        (0, 0, 'Charlie', 'Davis', 'charlie.davis@gmail.com', '5678901234', 0),
        (0, 0, 'Emily', 'Wilson', 'emily.wilson@gmail.com', '6789012345', 1),
        (0, 0, 'Frank', 'Miller', 'frank.miller@gmail.com', '7890123456', 0),
        (0, 0, 'Grace', 'Taylor', 'grace.taylor@gmail.com', '8901234567', 1),
        (0, 0, 'Henry', 'Anderson', 'henry.anderson@gmail.com', '9012345678', 0),
        (0, 0, 'Ivy', 'Thomas', 'ivy.thomas@gmail.com', '0123456789', 1);
END; //

DELIMITER;