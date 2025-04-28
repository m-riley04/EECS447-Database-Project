DELIMITER //

CREATE OR REPLACE PROCEDURE spPopulateGenreTable()
BEGIN
    INSERT IGNORE INTO genre (name)
    VALUES
        ('Sci-Fi'),
        ('Romance'),
        ('Fantasy'),
        ('Thriller'),
        ('Mystery'),
        ('Young Adult'),
        ('Self-Help'),
        ('Poetry');
END;

DELIMITER;