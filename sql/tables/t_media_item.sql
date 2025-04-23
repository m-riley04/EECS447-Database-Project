CREATE TABLE media_item (
    media_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    author_id INT,
    genre_id INT,
    media_type_id INT,
    title VARCHAR(255) NOT NULL CHECK (CHAR_LENGTH(title) >= 1),
    publication_year INT NOT NULL CHECK (publication_year BETWEEN 0 AND 2025),
    availability TINYINT NOT NULL CHECK (availability IN (0, 1)),
    isbn VARCHAR(13) NOT NULL CHECK (CHAR_LENGTH(isbn) = 13 AND isbn REGEXP '^(978|979)[0-9]+$'),
    
    CONSTRAINT `fk_author_id` FOREIGN KEY (author_id) REFERENCES author(author_id),
    CONSTRAINT `fk_genre_id` FOREIGN KEY (genre_id) REFERENCES genre(genre_id),
    CONSTRAINT `fk_media_type_id` FOREIGN KEY (media_type_id) REFERENCES media_type(media_type_id),
    CONSTRAINT unique_isbn UNIQUE (isbn)
);