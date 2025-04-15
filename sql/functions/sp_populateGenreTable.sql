DELIMITER //

CREATE PROCEDURE spPopulateGenreTable()
BEGIN
    INSERT INTO genre (name)
    VALUES
        ('Sci-Fi'),
        ('Romance'),
        ('Fantasy'),
        ('Thriller'),
        ('Mystery'),
        ('Young Adult'),
        ('Self-Help'),
        ('Poetry');
END //

DELIMITER;