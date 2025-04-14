CREATE TABLE fee (
    fee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date_issued DATETIME NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    fee_status_id INT NOT NULL,
    CONSTRAINT `fk_user_id` FOREIGN KEY (user_id) REFERENCES user(user_id),
    CONSTRAINT `fk_fee_status_id` FOREIGN KEY (fee_status_id) REFERENCES fee_status(fee_status_id)
);
