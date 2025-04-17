CREATE TABLE user(  
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    membership_type_id INT NOT NULL, 
    account_status_id INT NOT NULL, 
    first_name NVARCHAR(100) NOT NULL CHECK (LENGTH(first_name) >= 1),
    last_name NVARCHAR(100) NOT NULL CHECK (LENGTH(first_name) >= 1),
    email NVARCHAR(320) NOT NULL CHECK (email LIKE '%_@__%.__%'),
    phone NVARCHAR(10) NOT NULL CHECK (LENGTH(phone) = 10 and phone REGEXP '^[0-9]+$'),
    is_staff BIT NOT NULL,

    CONSTRAINT `fk_membership_type_id` FOREIGN KEY (membership_type_id) REFERENCES membership_type(membership_type_id), -- Need to wait until this table is in
    CONSTRAINT `fk_account_status_id` FOREIGN KEY (account_status_id) REFERENCES account_status(account_status_id) -- Need to wait until this table is in
);