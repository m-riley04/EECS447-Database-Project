DELIMITER //

CREATE OR REPLACE PROCEDURE spPopulateMembershipTypeTable()
BEGIN
    INSERT INTO membership_type (membership_type_name, membership_description, borrowing_limit)
    VALUES
        ('Normal', 'The most basic memberdhip type', 10),
        ('Student', 'Student membership allows discounts and higher borrowing rate', 20),
        ('Researcher', 'Researcher membership allows higher borrowing rate', 50);
END;

CALL spPopulateMembershipTypeTable();

DELIMITER ;