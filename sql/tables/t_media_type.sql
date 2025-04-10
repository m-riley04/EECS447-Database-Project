CREATE TABLE media_type (
    media_type_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    media_type_name VARCHAR(50) NOT NULL CHECK (CHAR_LENGTH(media_type_name) >= 1)
);