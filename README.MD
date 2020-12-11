# MYSQL and POSTGRESS practice

## <https://www3.ntu.edu.sg/home/ehchua/programming/sql/MySQL_Beginner.html>

## task_01

Read till the beginning of chapter 2.5

### Working with table `products`

1. Create your database as we have done in class
1. Create table products from tutorial and make all insert and delete commands as we done in class
1. Insert using 1 command 2 new rows into the table `products`. The `productCode` of both new rows to be equal `PEX`, other fields (`name`, `quantity`, price`) specify any by your choice.
1. Delete from table `products` all rows with `productId` greater than 1005
1. Display all data from table `products`

### Working with new table `weekdays`

1. Create new table `weekdays` in your database and fill it with numbers and names of week days, as follows:

- 1 Sunday
- 2 Monday
- 3 Tuesday
- 4 Wednesday
- 5 Thursday
- 6 Friday
- 7 Saturday

1. Display all data stored in newly created table `weekdays`

1. [Optional for self investigation] Display all names of days having less than 7 characters in the day name.

## task_02

### Tutorial:Chapter 2.5

Working with table `products` from tutorial:

1. Display `name` and `quantity` of all products with `productCode` equal `PEC`
1. Display `productID` of all products, having word `Blue` in its `name`
1. Display `name` of all products having letter `2` in its `name` and `quantity` greater than 9000.
1. Display name and price of all products with quantity between 4000 and 9000. Order output in alphabetical order by name
1. Display all existing information about products having price 0.48, 0.49 or 1.25
1. Display the name, price and quantity of 3 most expensive products.
1. Build for all products report with following columns:

| Product Description | Item Price | Quantity | Cost |
| ------------------- | ---------- | -------- | ---- |
| PEN - Pen Red       | 1.23       | 5000     | 6150 |

The cost equal price \* quantity.
Sort the output ascending by calculated `Cost`

## task_03

### Tutorial: Chapter 2.7, 2.8, 2.10, 3.4

Working with your database:

1. Insert 3 new rows in table `products`
   (for example, 3 markers with productCode equal `MRK`, prices 0.99, 1.00, 1.01)

1. In table products increase by 50% price of all pens cheaper than $10.

1. In table products increate in twice the quantity and decrease by 30% the price
   of any product having words `Green` or `Blue` in its name
   and quantity between 50 an 500 units.

1. Delete all products, having price 1.00

1. Write all commands above in script file `hw3_mysolution.txt`, adding "select \*..."
   statements before and after update.

1. Run your script:

   - using command SOURCE from mysql console
   - using redirection from cmd window

1. Exit to cmd window and build the `db.txt` dump script, using tool mysqldump.

1. Test your script, loading it from cmd window (using mysql with redirection)
