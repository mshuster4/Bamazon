# Bamazon 

MySql and Node.js storefront with customer, manager and supervisor views.

## Functionality 
### Customer View

- Allows customers to purchase products 
- Instantly updates a product's stock quantity after purchase
- Notifies customer when the selected product's stock is insufficent 

Customer Sale Example
![Gif Customer Sale](https://raw.githubusercontent.com/mshuster4/Bamazon/master/media/customer_sale.gif)

Insufficient Stock Example
![Gif No Stock](https://raw.githubusercontent.com/mshuster4/Bamazon/master/media/customer_no_stock.gif)

### Manager View 

- Allows managers to:
    - View whole storefront.
    - View products only with low inventory and add to their stock.
    - Add products to the storefront
- Instantly updates product display with manager updates.

Manager Storefront View Example
![Gif Manager Storefront](https:/raw.githubusercontent.com/mshuster4/Bamazon/master/media/manager_flow.gif)

Manager View Low Inventory Example
![Gif Manager Stock](https://raw.githubusercontent.com/mshuster4/Bamazon/master/media/manager_stock.gif)

Manager Add Product Example
![Gif Manager Add](https://raw.githubusercontent.com/mshuster4/Bamazon/master/media/manager_add_product.gif)

### Supervisor View

- Allows supervisors to view the over head costs, sales, and total profit for each Bamazon departments. 

Supervisor View Department Example
![Gif Supervisor View](https://raw.githubusercontent.com/mshuster4/Bamazon/master/media/supervisor_flow.gif)

## Technologies Used

 * javascript
 * node.js
 * mysql
 * npm inquirer
 * npm mysql
 * npm cli-table
