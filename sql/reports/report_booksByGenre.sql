DELIMITER //

CREATE OR REPLACE PROCEDURE report_books_by_genre(IN genreName NVARCHAR(100))
BEGIN
    SELECT 
        mi.title,
        mi.publication_year,
        g.name AS genre,
        mi.author_id
    FROM 
        media_item mi
    JOIN 
        genre g ON mi.genre_id = g.genre_id
    JOIN 
        media_type mt ON mi.media_type_id = mt.media_type_id
    WHERE 
        g.name = genreName
        AND mt.media_type_name = 'Book'
    ORDER BY 
        mi.title;
END //

DELIMITER ;