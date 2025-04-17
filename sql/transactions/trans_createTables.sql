START TRANSACTION;

-- From the t_author.sql file
CREATE TABLE author(  
    author_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name NVARCHAR(100) NOT NULL,
    last_name NVARCHAR(100) NOT NULL
);

-- From the t_genre.sql file
CREATE TABLE genre(  
    genre_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` NVARCHAR(50) NOT NULL CHECK (LENGTH(name) >= 1)
);

-- From the t_media_type.sql file
CREATE TABLE media_type (
    media_type_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    media_type_name VARCHAR(50) NOT NULL CHECK (CHAR_LENGTH(media_type_name) >= 1)
);

-- From the t_fee_status.sql file
CREATE TABLE fee_status (
    fee_status_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(50) NOT NULL,
    description NVARCHAR(300)
);

-- From the t_membership_type.sql file
CREATE TABLE membership_type(
    membership_type_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    membership_type_name NVARCHAR(50) NOT NULL CHECK (LENGTH(membership_type_name) >= 1)
);

-- From the t_account_status.sql file
CREATE TABLE account_status (
    account_status_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL UNIQUE
);

-- From the t_media_item.sql file
CREATE TABLE media_item (
    media_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    author_id INT,
    genre_id INT,
    media_type_id INT,
    title VARCHAR(255) NOT NULL CHECK (CHAR_LENGTH(title) >= 1),
    publication_year INT NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025),
    availability TINYINT NOT NULL CHECK (availability IN (0, 1)),
    isbn VARCHAR(13) NOT NULL CHECK (CHAR_LENGTH(isbn) = 13 AND isbn REGEXP '^(978|979)[0-9]+$'),
    
    CONSTRAINT `fk_author_id` FOREIGN KEY (author_id) REFERENCES author(author_id),
    CONSTRAINT `fk_genre_id` FOREIGN KEY (genre_id) REFERENCES genre(genre_id),
    CONSTRAINT `fk_media_type_id` FOREIGN KEY (media_type_id) REFERENCES media_type(media_type_id)
);

-- From the t_user.sql file
CREATE TABLE `user`(  
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    membership_type_id INT NOT NULL, 
    account_status_id INT NOT NULL, 
    first_name NVARCHAR(100) NOT NULL CHECK (LENGTH(first_name) >= 1),
    last_name NVARCHAR(100) NOT NULL CHECK (LENGTH(first_name) >= 1),
    email NVARCHAR(320) NOT NULL CHECK (email LIKE '%_@__%.__%'),
    phone NVARCHAR(10) NOT NULL CHECK (LENGTH(phone) = 10 and phone REGEXP '^[0-9]+$'),
    is_staff BIT NOT NULL,

    CONSTRAINT `fk_membership_type_id` FOREIGN KEY (membership_type_id) REFERENCES membership_type(membership_type_id),
    CONSTRAINT `fk_account_status_id` FOREIGN KEY (account_status_id) REFERENCES account_status(account_status_id)
);

-- From the t_fee.sql file
CREATE TABLE fee (
    fee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date_issued DATETIME NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    fee_status_id INT NOT NULL,
    
    CONSTRAINT `fk_user_id` FOREIGN KEY (user_id) REFERENCES user(user_id),
    CONSTRAINT `fk_fee_status_id` FOREIGN KEY (fee_status_id) REFERENCES fee_status(fee_status_id)
);

-- From the t_transaction.sql file
CREATE TABLE `transaction` (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    media_id INT NOT NULL,
    checkout_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE,

    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (media_id) REFERENCES media_item(media_id)
);

COMMIT;