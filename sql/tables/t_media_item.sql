CREATE TABLE media_item {
    media_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT
    author_id INT FOREIGN KEY REFERENCES author(author_id),
    genre_id INT FOREIGN KEY REFERENCES genre(genre_id),
    media_type_id INT FOREIGN KEY REFERENCES media_type(media_type_id),
    title NVARCHAR(255) NOT NULL CHECK (LENGTH(title) >= 1)
    publication_year INT NOT NULL CHECK (publication_year >= 1900 and publication_year <= YEAR(CURRENT_DATE)),
    availability INT NOT NULL CHECK (availability IN (0, 1))
    isbn NVARCHAR(13) NOT NULL CHECK (LENGTH(isbn) = 13 and isbn REGEXP '^(978|979)[0-9]+$')
}