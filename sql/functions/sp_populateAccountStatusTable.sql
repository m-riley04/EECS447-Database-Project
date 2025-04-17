DELIMITER //

CREATE OR REPLACE PROCEDURE spPopulateAccountStatusTable()
BEGIN
    INSERT INTO account_status (status_name)
    VALUES
        ('New'),
        ('Regular'),
        ('Banned');
END //

DELIMITER ;
