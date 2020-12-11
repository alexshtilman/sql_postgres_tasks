USE java36;
DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products(
    productID    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    productCode  CHAR(3)       NOT NULL DEFAULT '',
    name         VARCHAR(30)   NOT NULL DEFAULT '',
    quantity     INT UNSIGNED  NOT NULL DEFAULT 0,
    price        DECIMAL(7,2)  NOT NULL DEFAULT 99999.99,
    PRIMARY KEY  (productID)
);

INSERT INTO products VALUES 
(1004, 'PEX', 'Pen Red', 5000, 0.48),
(1005, 'PEX', 'Pen Blue', 1000, 3.23),
(1006, 'PEX', 'Pen Black', 3000, 5.23),
(1002, 'PEC', 'Pencil 2B', 1000, 0.49),
(1003, 'PEC', 'Pencil 2H', 10000, 3.23);

DELETE FROM products WHERE productID > 1005;

SELECT * FROM products;

DROP TABLE IF EXISTS weekdays;
CREATE TABLE IF NOT EXISTS weekdays(
    weekID    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    name  VARCHAR(9) NOT NULL DEFAULT '',
    PRIMARY KEY  (weekID)
);

INSERT INTO weekdays VALUES 
(1, 'Sunday'),
(2,	'Monday'),
(3,	'Tuesday'),
(4,	'Wednesday'),
(5,	'Thursday'),
(6,	'Friday'),
(7,	'Saturday');

SELECT * FROM weekdays;

SELECT * FROM weekdays WHERE CHAR_LENGTH(name) < 7;