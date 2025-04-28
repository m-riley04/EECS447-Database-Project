DELIMITER //

CREATE OR REPLACE PROCEDURE spPopulateAccountStatusTable()
BEGIN
    INSERT INTO account_status (status_name, status_description)
    VALUES
        ('New', 'A recently new member'),
        ('Active', 'An active member'),
        ('Inactive', 'A member who has not been active for a while'),
        ('Banned', 'Member has been banned');
END //
DELIMITER ;
