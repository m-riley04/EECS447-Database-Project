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
    a.last_name = 'Rowling'  -- Replace with the author's last name you are searching for
    AND mt.media_type_name = 'Book'
ORDER BY 
    mi.title;