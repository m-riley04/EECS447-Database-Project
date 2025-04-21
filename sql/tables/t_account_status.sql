CREATE TABLE account_status (
    account_status_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL UNIQUE,
    status_description VARCHAR(255) NOT NULL
);
