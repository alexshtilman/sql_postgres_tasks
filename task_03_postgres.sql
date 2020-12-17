SELECT * FROM products;
UPDATE products SET quantity = 50 where productID = 1008
-- 1
INSERT INTO products VALUES 
(NULL,'MRK','Marker Green','4000',0.99),
(NULL,'MRK','Marker Blue','4000',1.00),
(NULL,'MRK','Marker Red','4000',1.01);
-- 2
UPDATE products price = CAST( price * 1.5 AS DECIMAL(7,2)) where WHERE productCode='PEN' price <10
-- 3
UPDATE products set quantity = quantity * 2, price = price * 0.7 
    where (name like '%Green%' OR name like '%Blue%') and quantity between 50 and 500   
-- 4
DELETE from products where price = 1.0
