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
    (1, 1, 1, "Nineteen Eighty-Four", 1949, 1, "9780151660346"),
    (1, 1, 1, "Animal Farm", 1945, 1, "9780151002177")

    ON DUPLICATE KEY UPDATE
        author_id = VALUES(author_id),
        genre_id = VALUES(genre_id),
        media_type_id = VALUES(media_type_id),
        title = VALUES(title),
        publication_year = VALUES(publication_year),
        avialablity = VALUES(avialablity);

END; //

call spPopulateMediaItem();


DELIMITER;