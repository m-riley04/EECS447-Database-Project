DELIMITER //

CREATE OR REPLACE PROCEDURE report_books_by_author(IN authorLastName NVARCHAR(100))
BEGIN
    SELECT 
        mi.title,
        mi.publication_year,
        CONCAT(a.first_name, ' ', a.last_name) AS author_name
    FROM 
        media_item mi
    JOIN 
        author a ON mi.author_id = a.author_id
    JOIN 
        media_type mt ON mi.media_type_id = mt.media_type_id
    WHERE 
        a.last_name = authorLastName
        AND mt.media_type_name = 'Book'
    ORDER BY 
        mi.title;
END //

DELIMITER ;