DELIMITER //

CREATE OR REPLACE PROCEDURE spPopulateTransactionTable()
BEGIN
    /* ----------------------------------------------------------
       1) COMPLETED LOANS that incurred the late-fees you populated
       ---------------------------------------------------------- */
    INSERT IGNORE INTO `transaction`
          (media_id , user_id, checkout_date , due_date      , return_date)
    VALUES
          -- $5 fee for user 1 dated 2025-02-01
          ( 1 , 1 , '2025-01-05', '2025-01-19', '2025-02-03'),

          -- two $10 fees for user 2
          ( 3 , 2 , '2025-01-31', '2025-02-14', '2025-02-20'),
          ( 4 , 2 , '2025-02-18', '2025-03-04', '2025-03-10'),

          -- $10 then $5 fee for user 4 (that haven't been checked by staff yet))
          ( 24 , 4 , '2025-04-28', '2025-05-05', NULL),
          ( 26 , 4 , '2025-03-10', '2025-03-24', NULL);

    /* ----------------------------------------------------------
       2) OPEN LOANS  (media_item.availability = 0)
       ---------------------------------------------------------- */
    INSERT IGNORE INTO `transaction`
          (media_id , user_id, checkout_date , due_date      , return_date)
    VALUES
          -- The Handmaid's Tale
          (13, 7 , '2025-05-02', '2025-05-16', NULL),
          -- A Game of Thrones
          (15, 8 , '2025-05-08', '2025-05-22', NULL),
          -- Harry Potter and the Chamber of Secrets
          (17, 1 , '2025-05-10', '2025-05-24', NULL),
          -- Fantastic Four #1
          (20, 2 , '2025-05-11', '2025-05-25', NULL),
          -- Welcome to Dead House
          (22, 2 , '2025-05-13', '2025-05-27', NULL);
END//

DELIMITER ;
