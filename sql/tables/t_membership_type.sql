CREATE TABLE membership_type(
    membership_type_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    membership_type_name NVARCHAR(50) NOT NULL CHECK (LENGTH(membership_type_name) >= 1),
    membership_description NVARCHAR(300) NOT NULL CHECK (LENGTH(membership_description) >= 1),
    borrowing_limit INT NOT NULL CHECK (0 <= borrowing_limit <= 50)
);