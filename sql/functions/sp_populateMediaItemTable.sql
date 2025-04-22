DELIMITER //

CREATE OR REPLACE PROCEDURE spPopulateMediaItemTable()
BEGIN
    INSERT IGNORE INTO media_item (
        author_id,
        genre_id,
        media_type_id,
        title,
        publication_year,
        availability,
        isbn
    )
    VALUES
    (1, 1, 1, 'Nineteen Eighty-Four', 1949, 1, '9780151660346'),
    (1, 1, 1, 'Animal Farm', 1945, 1, '9780151002177'),
    (2, 4, 1, 'Fairy Tale', 2022, 1, '9781668002179'),
    (2, 4, 1, 'Revival', 2014, 1, '9781476770383'),
    (3, 6, 1,'David Copperfield', 1850, 1, '9780393958287'),
    (3, 6, 1, 'Bleak House', 1853, 1, '9780679405689'),
    (4, 8, 1, 'The Raven', 1845, 1, '9781648337062'),
    (4, 4, 1, 'The Tell-Tale Heart', 1843, 1, '9781648337079'),
    (5, 1, 1, 'I, Robot', 1950, 1, '9780553294385'),
    (5, 1, 1, 'The Last Question', 1956, 1, '9781884214493'),
    (6, 2, 1, 'The Temptest', 1610, 1, '9780143128632'),
    (6, 2, 1, 'Hamlet', 1603, 1, '9780143128625')
    (7, );


END //
ALTER TABLE media_item ADD CONSTRAINT unique_isbn UNIQUE (isbn);

CALL spPopulateMediaItemTable();

DELIMITER;