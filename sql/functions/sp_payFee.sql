DELIMITER //

CREATE OR REPLACE PROCEDURE spPayFee(
    p_fee_id INT
)
BEGIN
    -- Declare variables
    DECLARE m_fee_status_id INT;
    DECLARE fee_amount DECIMAL(10, 2);

    -- Get the fee status id for 'Paid'
    SELECT fee_status_id INTO m_fee_status_id FROM fee_status WHERE `name` = 'Paid';

    -- Check if the fee exists and is unpaid
    SELECT amount INTO fee_amount FROM fee WHERE fee_id = p_fee_id AND fee_status_id != m_fee_status_id;

    IF fee_amount IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Fee not found or already paid.';
    END IF;

    -- Update the fee status to paid
    UPDATE fee SET fee_status_id = m_fee_status_id WHERE fee_id = p_fee_id;

END; //

DELIMITER;