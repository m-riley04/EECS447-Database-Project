CREATE TABLE genre(  
    genre_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` NVARCHAR(50) NOT NULL CHECK (LENGTH(name) >= 1)
);