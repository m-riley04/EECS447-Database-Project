DELIMITER //

CREATE OR REPLACE PROCEDURE spCheckFees()
BEGIN
    DECLARE v_overdue_id INT;

    SELECT fee_status_id
        INTO v_overdue_id
        FROM fee_status
        WHERE `name` = 'Overdue'
        LIMIT 1;

    -- Update all fees that are overdue
    UPDATE fee
        SET fee_status_id = v_overdue_id
        WHERE due_date <  CURRENT_DATE()      -- past the deadline
        AND fee_status_id <> v_overdue_id;      -- avoid extra writes
END //

DELIMITER;