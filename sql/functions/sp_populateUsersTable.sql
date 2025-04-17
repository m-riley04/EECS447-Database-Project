DELIMITER //

CREATE OR REPLACE PROCEDURE spPopulateUsersTable()
BEGIN
    INSERT INTO users (first_name, last_name, email, phone, is_staff)
    VALUES
        ('John', 'Doe', 'john.doe@gmail.com', '123-456-7890', 0),
        ('Jane', 'Smith', 'jane.smith@gmail.com', '234-567-8901', 1),
        ('Alice', 'Johnson', 'alice.johnson@gmail.com', '345-678-9012', 0),
        ('Bob', 'Brown', 'bob.brown@gmail.com', '456-789-0123', 1),
        ('Charlie', 'Davis', 'charlie.davis@gmail.com', '567-890-1234', 0),
        ('Emily', 'Wilson', 'emily.wilson@gmail.com', '678-901-2345', 1),
        ('Frank', 'Miller', 'frank.miller@gmail.com', '789-012-3456', 0),
        ('Grace', 'Taylor', 'grace.taylor@gmail.com', '890-123-4567', 1),
        ('Henry', 'Anderson', 'henry.anderson@gmail.com', '901-234-5678', 0),
        ('Ivy', 'Thomas', 'ivy.thomas@gmail.com', '012-345-6789', 1)
END //

DELIMITER;