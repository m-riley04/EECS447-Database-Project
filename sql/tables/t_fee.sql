CREATE TABLE fee (
    fee_id INT PRIMARY KEY,
    user_id INT NOT NULL,
    date_issued DATETIME NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    fee_status_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (fee_status_id) REFERENCES Fee_Status(fee_status_id)
);
