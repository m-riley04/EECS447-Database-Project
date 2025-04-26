DELIMITER //

CREATE OR  REPLACE PROCEDURE spPopulateMediaItemTable()
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
    (6, 2, 1, 'Hamlet', 1603, 1, '9780143128625'),
    (7, 6, 1, 'The Handmaid\'s Tale', 1985, 0, '9780385490818'),
    (7, 1, 1, 'Oryx and Crake', 2003, 1, '9780307398482'),
    (8, 3, 1, 'A Game of Thrones', 1996, 0, '9780007428540'),
    (8, 3, 1, 'A Clash of Kings', 1998, 1, '9781984821157'),
    (9, 3, 1, 'Harry Potter and the Chamber of Secrets', 1998, 0, '9780439064866'),
    (9, 3, 1, 'Fantastic Beasts and Where to Find Them', 2001, 1, '9781338216790'),
    (10, 6, 7, 'Silver Surfer: Parable', 1988, 1, '9780785162094'),
    (10, 6, 7, 'Fantasic Four #1', 1961, 0, '9780785106661'),
    (11, 6, 1, 'Night of the Living Dummy', 1993, 1, '9781407157443'),
    (11, 6, 1, 'Welcome to Dead House', 1992, 0 , '9782227729025'),
    (12, 4, 1, 'Along Came a Spider', 1993, 0, '9780316072915'),
    (12, 4, 1, 'Cross', 2006, 1, '9780316017749'),
    (13, 6, 1, 'The World According to Garp Novel', 1978, 0, '9780345366764'),
    (13, 5, 1, 'The Cider House Rules', 1985, 1, '9780224023368');


END;

CALL spPopulateMediaItemTable();

DELIMITER;