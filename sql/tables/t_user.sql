CREATE TABLE user(  
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    membership_type_id INT FOREIGN KEY REFERENCES membership_type(membership_type_id),
    account_status_id INT FOREIGN KEY REFERENCES account_status(account_status_id),
    first_name NVARCHAR(100) NOT NULL CHECK (LENGTH(first_name) >= 1),
    last_name NVARCHAR(100) NOT NULL CHECK (LENGTH(first_name) >= 1),
    email NVARCHAR(320) NOT NULL CHECK (email LIKE '%_@__%.__'),
    phone NVARCHAR(10) NOT NULL CHECK (LENGTH(phone) = 10 and phone REGEXP '^[0-9]+$'),
    is_staff BIT NOT NULL
);