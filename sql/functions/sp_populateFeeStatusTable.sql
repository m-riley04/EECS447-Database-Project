DELIMITER //

CREATE OR REPLACE PROCEDURE spPopulateFeeStatusTable()
BEGIN
    INSERT INTO fee_status (name)
    VALUES
        ('Issued'),
        ('Overdue'),
        ('Paid');
END //

DELIMITER ;
