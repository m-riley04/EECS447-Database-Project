DELIMITER //

CREATE OR REPLACE PROCEDURE spPopulateFeeTable()
BEGIN
    INSERT IGNORE INTO fee (
        user_id,
        date_issued,
        amount,
        fee_status_id
        )
        VALUES
        # Values here
        (1, '2025-02-01', 5.00, 1),
        (2, '2025-02-15', 10.00, 2),
        (2, '2025-03-05', 10.00, 2),
        (4, '2025-03-20', 10.00, 2),
        (4, '2025-03-30', 5.00, 3);

END;

DELIMITER;