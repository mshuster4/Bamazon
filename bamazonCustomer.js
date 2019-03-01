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
    console.log("\n **WELCOME TO BAMAZON** \n");
    printAllProducts();

});

function printAllProducts() {
    connection.query("SELECT * FROM products", function(err, res){

        table = new Table({head: ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity', 'Product Sales'], 
                   style: {head:[], border:[], 
                   'padding-left':1, 'padding-right': 1 }})

        for (var i = 0; i < res.length; i++) {
            
            table.push([res[i].product_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity, res[i].product_sales]);
        }

        console.log(table.toString() + "\n\n");

        askQuestions();

    });

}

function askQuestions() {
    inquirer
    .prompt ([
        {
            name: "itemId",
            type: "input",
            message: "Which item would you like to buy? (enter ID number)",
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
        var itemNumber = answer.itemId;
        var unitNumber = answer.unitNumber;

        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, { product_id: itemNumber }, function(err, res){
            for (var i = 0; i < res.length; i++) {
                console.log("\n\n" + "Product id: " + res[i].product_id + "\n" + "Product name: " + res[i].product_name + "\n\n");

                if (res[i].stock_quantity > 0)  {

                    var totalPrice = res[i].price * unitNumber;

                    var productSales = res[i].product_sales + totalPrice;

                    var stockUpdate = res[i].stock_quantity - unitNumber;
                    
                    updateStock(stockUpdate, itemNumber, totalPrice, productSales);
                }

                else {

                    console.log("\n Insufficient stock! \n");

                    buyAgain();

                 
                }
            
            }


        });
    
    });


function updateStock(number, id, price, sales) {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: number,
                product_sales: sales
            },
            {
                product_id: id,
            }
        ],
            function(err, res) {

        
                console.log("Your total is cost is: " + "$" + price + "\n");

                buyAgain();

            }
            
        );
    }
}

function buyAgain() {
     inquirer
    .prompt([
        {
            name: "buyAgain",
            type: "confirm",
            message: "Would you like to buy another product?"
        }
    ]).then(function(answer){
        if (answer.buyAgain == true) {
            printAllProducts();
        }
        else {
            console.log("\n Goodbye! \n"); 
            connection.end();
        }

    })

}