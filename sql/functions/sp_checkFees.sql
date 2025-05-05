DELIMITER //

CREATE OR REPLACE PROCEDURE spCheckFees()
BEGIN
    DECLARE v_overdue_id INT;
    DECLARE v_issued_id INT;

    -- Get "Overdue" status id
    SELECT fee_status_id
        INTO v_overdue_id
        FROM fee_status
        WHERE `name` = 'Overdue'
        LIMIT 1;

    -- Get "Issued" status id
    SELECT fee_status_id
        INTO v_issued_id
        FROM fee_status
        WHERE `name` = 'Issued'
        LIMIT 1;

    -- Create a fee for all transactions past their due date if they have not been returned (i.e., return_date IS NULL)
    INSERT INTO fee (user_id, date_issued, amount, fee_status_id)
        SELECT user_id, CURDATE(), 5.00, v_issued_id
        FROM `transaction`
        WHERE return_date IS NULL
        AND due_date < CURRENT_DATE() -- past the deadline
        AND NOT EXISTS (
            SELECT 1
            FROM fee f
            WHERE f.user_id = `transaction`.user_id
            AND f.date_issued = CURDATE()
        );

    -- Update all fees that are overdue
    UPDATE fee
        SET fee_status_id = v_overdue_id
        WHERE date_issued <  CURRENT_DATE()      -- past the deadline
        AND fee_status_id <> v_overdue_id;      -- avoid extra writes
END //

DELIMITER;