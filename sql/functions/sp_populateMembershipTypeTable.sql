DELIMITER //

CREATE OR REPLACE PROCEDURE spPopulateMembershipTypeTable()
BEGIN
    INSERT INTO membership_type (membership_type_name)
    VALUES
        ('Normal'),
        ('Student'),
        ('Researcher');
END //

DELIMITER ;