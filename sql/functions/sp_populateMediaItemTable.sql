DELIMITER //

CREATE OR REPLACE PROCEDURE spPopulateMediaItemTable()
BEGIN
    INSERT INTO media_item (
        author_id,
        genre_id,
        media_type_id,
        title,
        publication_year,
        availability,
        isbn
    )
    VALUES
    (1, 1, 1, "Nineteen Eighty-Four", 1949, 1, 9780151660346);

END; //

DELIMITER;