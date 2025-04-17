DELIMITER //

CREATE OR REPLACE PROCEDURE spPopulateMediaType()
BEGIN
    INSERT INTO media_type (media_type_name)
    VALUES
        ('Book'),
        ('Ebook'),
        ('Audiobook'),
        ('Magazine'),
        ('Newspaper'),
        ('Journal'),
        ('Comic'),
        ('Graphic Novel');
END; //

CALL spPopulateMediaType();
DELIMITER ;