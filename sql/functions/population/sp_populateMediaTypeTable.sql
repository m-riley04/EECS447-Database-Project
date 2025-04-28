DELIMITER //

CREATE OR REPLACE PROCEDURE spPopulateMediaTypeTable()
BEGIN
    INSERT IGNORE INTO media_type (media_type_name)
    VALUES
        ('Book'),
        ('Ebook'),
        ('Audiobook'),
        ('Magazine'),
        ('Newspaper'),
        ('Journal'),
        ('Comic'),
        ('Graphic Novel');
END;

DELIMITER ;