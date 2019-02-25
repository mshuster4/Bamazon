DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,4) NOT NULL,
    stock_quantity INT(100) NOT NULL,
    product_sales DECIMAL(10,4) DEFAULT 0.00,
    PRIMARY KEY(id)
);

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NULL,
    over_head_costs DECIMAL(10,4) NULL,
    PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mac Laptop", "Electronics", 200, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ("Flannel Shirt", "Clothing", 45.75, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee Mug", "Home & Kitchen", 3.50, 88);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ugly Christmas Sweater", "Clothing", 50.99, 340);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Combat Boots", "Shoes", 350, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("JBL Speakers", "Electronics", 450.50, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Honeywell Air Conditioner", "Electronics", 666.66, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blackout Curtains", "Bed & Bath", 29, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("LED Lamp", "Electronics", 18, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("World Map", "Office Products", 15, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ipod Shuffle", "Electronics", 0, 0);

SELECT * FROM products; 