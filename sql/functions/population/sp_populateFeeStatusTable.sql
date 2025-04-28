DELIMITER //

CREATE OR REPLACE PROCEDURE spPopulateFeeStatusTable()
BEGIN
    INSERT INTO fee_status (name, description)
    VALUES
        ('Issued', 'The fee is issued to the user'),
        ('Overdue', 'The fee is overdue its payment'),
        ('Paid', 'The fee has been paid');
END;

DELIMITER ;
