var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Margys04041990!",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Bamazon Manager Access");
    promptManager();
});

function promptManager() {
    inquirer.
    prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View products for sale",
            "View low inventory",
            "Add new product"
        ]
    })
    .then(function(answer) {
        switch(answer.action) {
            case "View products for sale":
                viewProducts();
                break;
            
            case "View low inventory":
                viewLowInventory();
                break;
            
            case "Add new product":
                addProduct();
                break;
        }
    });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, res){
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].product_id + " || " + "Product Name: " + res[i].product_name + " || " 
                        + "Department: " + res[i].department_name + " ||  " + "Price: " + res[i].price
                        + " || " + "Quantity: " + res[i].stock_quantity);
        }

        promptManager();

    });

}


function viewLowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity BETWEEN ? AND ?"
    connection.query(query, [0, 5], function(err, res){
        for (var i = 0; i < res.length; i++) {
             console.log("Item ID: " + res[i].product_id + " || " + "Product Name: " + res[i].product_name + " || " 
                        + "Department: " + res[i].department_name + " ||  " + "Price: " + res[i].price
                        + " || " + "Quantity: " + res[i].stock_quantity);
        }

        promptManager();

    });
   

}

function addProduct() {
    inquirer
    .prompt([
        {
            name: "productName",
            type: "input",
            message: "What is the name of the product?"
        },
        {
            name: "departmentName",
            type: "input",
            message: "What is this product's department?"
        },
        {
            name: "price",
            type: "input",
            message: "What is this product's price?",
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to stock?"

        }
    ]).then(function(answer){

        console.log("Adding new product...")

        var newName = answer.productName;
        var newDepartment = answer.departmentName;
        var newPrice = answer.price;
        var newQuantity = answer.quantity;

        var query = connection.query(
            "INSERT INTO products SET ?",
                {
                    product_name: newName,
                    department_name: newDepartment,
                    price: newPrice,
                    stock_quantity: newQuantity
                },
                function(err, res) {
                
                console.log(res.affectedRows + " product inserted \n");

                 promptManager();


                }
            );
            
    });

}




