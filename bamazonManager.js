var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

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
            "Add new product",
            "Exit"
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
            case "Exit":
                console.log("\n Goodbye! \n");
                connection.end();
                break;
        }
    });
}

function viewProducts() {

    connection.query("SELECT * FROM products", function(err, res){

            table = new Table({head: ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity', 'Product Sales'], 
                    style: {head:[], border:[], 
                    'padding-left':1, 'padding-right': 1 }})

            for (var i = 0; i < res.length; i++) {
                
                table.push([res[i].product_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity, res[i].product_sales]);
            }

            console.log(table.toString() + "\n\n");

            promptManager();

    });

}


function viewLowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity BETWEEN ? AND ?"
    connection.query(query, [0, 5], function(err, res){


        table = new Table({head: ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity', "Product Sales"], 
                   style: {head:[], border:[], 
                   'padding-left':1, 'padding-right': 1 }})

        for (var i = 0; i < res.length; i++) {
            
            table.push([res[i].product_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity, res[i].product_sales]);
        }

        console.log(table.toString() + "\n\n");
        
        stockProduct();

    });
   
}

function stockProduct() {
    inquirer
    .prompt([
        {
            name: "stockProduct",
            type: "confirm",
            message: "Would you like to stock any low products?"
        }
    ]).then(function(answer){
        if (answer.stockProduct == true) {

            stockPrompt();
        }
        else {
            promptManager(); 
        }

    })

}

function stockPrompt() {
    inquirer
    .prompt ([
        {
            name: "itemId",
            type: "input",
            message: "Which item would you like to stock? (enter ID number)",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }

                return false;
            }
        },
        {
            name: "unitNumber",
            type: "input",
            message: "How many units?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }

                return false;
            }
        }
    
    ]).then(function(answer){
        var productId = answer.itemId;
        var addStock = parseInt(answer.unitNumber);
        var currStock;

        console.log("\n Stocking products...\n");
        
        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, { product_id: productId }, function(err, res){
            for (var i = 0; i < res.length; i++) {
                
                currStock = res[i].stock_quantity + addStock;


            }

            console.log(currStock);

            updateStock(productId, currStock);


        });
    });

}


function updateStock(id, number) {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",[
            {
                stock_quantity: number
            },
            {
                product_id: id
            }
        ],
            function(err, res) {

                console.log("\n" + res.affectedRows + " products stocked! \n");

                promptManager();

        }

    );
}


function addProduct() {
    inquirer
    .prompt([
        {
            name: "productName",
            type: "input",
            message: "What is the name of this new product?"
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

        console.log("\n Adding new product...\n");

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
                
                console.log("\n" + 
                res.affectedRows + " product added \n");

                 promptManager();


                }
            );
            
    });

}



