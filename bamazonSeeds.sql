DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE productions (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL (10,2) NULL,

);

-- create table with:
 -- item_id
 -- product name
 -- department name
 -- price (cost to customer)
 -- stock quality 

-- populate database with about 10 different products