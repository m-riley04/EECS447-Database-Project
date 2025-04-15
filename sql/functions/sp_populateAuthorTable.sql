DELIMITER //

CREATE PROCEDURE spPopulateAuthorTable()
BEGIN
    INSERT INTO author (first_name, last_name)
    VALUES
        ('George', 'Orwell'),
        ('Stephen', 'King'),
        ('Charles', 'Dickens'),
        ('Edgar Allen', 'Poe'),
        ('Isaac', 'Asimov'),
        ('William', 'Shakespeare'),
        ('Margaret', 'Atwood'),
        ('George R.R.', 'Martin'),
        ('J.K.', 'Rowling'),
        ('Stan', 'Lee'),
        ('R.L.', 'Stine'),
        ('James', 'Patterson'),
        ('John', 'Irving');
END //

DELIMITER;