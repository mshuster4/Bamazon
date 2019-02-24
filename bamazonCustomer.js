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
    console.log("connected as id" + connection.threadId);
    printAllproducts();
});

function printAllproducts() {
    connection.query("SELECT * FROM products", function(err, res){
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " 
                        + res[i].department_name + " | " + res[i].price
                        + " | " + res[i].stock_quantity);
        }

        console.log("-----------------------------------");
    });

    askQuestions();

}

function askQuestions() {
    inquirer
    .prompt ([
        {
            name: "itemId",
            type: "input",
            message: "Which product id would you like to buy?",
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
        connection.query(query, { id: itemNumber }, function(err, res){
            for (var i = 0; i < res.length; i++) {
                console.log("Product id: " + res[i].id + "\n" + "Product name: " + res[i].product_name);
            }

            updateStock(itemNumber, unitNumber);

        });
    
    });
}