SELECT 
    items.item_id,
    items.item_name,
    CONCAT(authors.first_name, ' ', authors.last_name) AS author_full_name,
    media_types.media_type_name,
    genres.genre_name,
    items.availability,
    items.isbn
FROM 
    items
JOIN 
    authors ON items.author_id = authors.author_id
JOIN 
    media_types ON items.media_type_id = media_types.media_type_id
JOIN 
    genres ON items.genre_id = genres.genre_id;