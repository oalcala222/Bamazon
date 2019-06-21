-- Drop the bamazon_DB if it exist currently --
DROP DATABASE IF EXISTS bamazon_DB;

-- Create the "bamazon_DB" database --
CREATE DATABASE bamazon_DB;

-- Makes it so all of the following code will affect bamazon_DB --
USE bamazon_DB;

-- Create the table "bamazon" within bamazon_DB -- 
CREATE TABLE bamazon(
  -- Create a numeric column called "item_id" that contains unique id's for each product --
  item_id INT(10) NOT NULL,
  -- Make a string column called "product_name" containing the name of the product which cannot contain null --
  product_name VARCHAR(45) NOT NULL,
  -- Make a string column called "department_name" containing the name of the department which cannot contain null --
  department_name VARCHAR(45) NOT NULL,
  -- Make a decimal column called "price" conatining the price of the item which cannot contain null --
  price DECIMAL(10, 2),
  -- Make an numeric column called "stock_quantity" containing the amount of items in stock which cannot contain null--
  stock_quantity INT(10),
  PRIMARY KEY (item_id)
);

-- Create new rows and populate the database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
INSERT INTO bamazon (item_id, product_name, department_name, price, stock_quantity)
VALUES ("90712","tylenol","health",6.77,12);
INSERT INTO bamazon (item_id, product_name, department_name, price, stock_quantity)
VALUES ("88452","rc car","toys",39.99,4);
INSERT INTO bamazon (item_id, product_name, department_name, price, stock_quantity)
VALUES ("56412","t-shirt","clothing",9.99,20);
INSERT INTO bamazon (item_id, product_name, department_name, price, stock_quantity)
VALUES ("88005","headphones","electronics",29.99,11);
INSERT INTO bamazon (item_id, product_name, department_name, price, stock_quantity)
VALUES ("11562","vans classic","shoes",54.99,3);
INSERT INTO bamazon (item_id, product_name, department_name, price, stock_quantity)
VALUES ("00788","toilet paper","home goods",9.99,0);
INSERT INTO bamazon (item_id, product_name, department_name, price, stock_quantity)
VALUES ("71265","basketball","sporting goods",24.50,2);
INSERT INTO bamazon (item_id, product_name, department_name, price, stock_quantity)
VALUES ("34511","playstation 4","video games",349.99,10);
INSERT INTO bamazon (item_id, product_name, department_name, price, stock_quantity)
VALUES ("12874","LG OLED TV", "electronics", 1699.99,1);
INSERT INTO bamazon (item_id, product_name, department_name, price, stock_quantity)
VALUES ("99993","old spice deoderant","hygiene",4.99,5);