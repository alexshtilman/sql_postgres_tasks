-- 1
SELECT name, quantity from products where productCode ='PEC';
-- 2
SELECT productID FROM products where name regexp '(^|[[:space:]])Blue([[:space:]]|$)';
-- 3
SELECT name FROM products where name LIKE '%n%' AND quantity > 9000
-- 4
SELECT name,price FROM products where quantity between 4000 and 9000 ORDER BY name ASC;
-- 5
SELECT * from products where price IN (0.48, 0.49 , 1.25)
-- 6
SELECT name, quantity,price from products ORDER BY price DESC LIMIT 3;
-- 7
SELECT 
    productCode || ' - ' ||  name AS "Product Description",
    price as "Item Price",
    quantity as "Quantity",
    (price * quantity) as "Cost" 
        FROM products 
            ORDER BY 4 DESC;