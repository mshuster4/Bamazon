DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    product_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,4) NOT NULL,
    stock_quantity INT(100) NOT NULL,
    product_sales DECIMAL(10,4) DEFAULT 0.00,
    PRIMARY KEY(product_id)
);

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(department_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Mac Laptop", "Electronics", 2000.00, 3, 40000.00);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES  ("Flannel Shirt", "Clothing/Shoes", 45.75, 9, 150.00);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Coffee Mug", "Home & Kitchen", 3.50, 88, 150.00);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Ugly Christmas Sweater", "Clothing/Shoes", 50.99, 340, 250.99);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Combat Boots", "Clothing/Shoes", 350.00, 8, 700);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("JBL Speakers", "Electronics", 450.50, 10, 2000.00);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Honeywell Air Conditioner", "Electronics", 600.00, 1, 1200.00);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Blackout Curtains", "Bed & Bath", 29.00, 24, 300.00);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("LED Lamp", "Electronics", 18.00, 40, 1000.00);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("World Map", "Office Products", 15.00, 3, 45.00);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Ipod Shuffle", "Electronics", 100.00, 0, 0.00);



INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 30000.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Clothing/Shoes", 8000.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Bed & Bath", 10000.00); 

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Office Products", 2000.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Home & Kitchen", 50000.00);




SELECT * FROM products; 
select * from departments; 

