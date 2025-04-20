DELIMITER //

CREATE OR REPLACE PROCEDURE spPopulateMediaTypeTable()
BEGIN
    INSERT INTO membership_type (membership_type_name, membership_description, borrowing_limit)
    VALUES

END; //

CALL spPopulateMembershipTypeTable();

DELIMITER ;