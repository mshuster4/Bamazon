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
    console.log("Welcome to Bamazon!");
    printAllproducts();

});

function printAllproducts() {
    connection.query("SELECT * FROM products", function(err, res){
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].id + " || " + "Product Name: " + res[i].product_name + " || " 
                        + "Department: " + res[i].department_name + " ||  " + "Price: " + res[i].price
                        + " || " + "Quantity: " + res[i].stock_quantity
                        + " || " + "Product Sales: " + res[i].product_sales + "\n\n");
        }

        askQuestions();
    });

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
                console.log("\n\n" + "Product id: " + res[i].id + "\n" + "Product name: " + res[i].product_name + "\n\n");

                if (res[i].stock_quantity > unitNumber) {

                    var totalPrice = res[i].price * unitNumber;

                    var productSales = res[i].product_sales + totalPrice;

                    var stockUpdate = res[i].stock_quantity - unitNumber;
                    
                    updateStock(stockUpdate, itemNumber, totalPrice, productSales);
                }

                else {

                    console.log("insufficient stock!")

                }
            
            }


        });
    
    });


    function updateStock(number, id, price, sales) {
        console.log("Updating Bamazon stock")
        var query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: number,
                    product_sales: sales
                },
                {
                    id: id,
                }
            ],
            function(err, res) {

                console.log(res.affectedRows + " products updated...\n");

                console.log("New stock number: " + number);

                console.log("Your total is cost is: " + "$" + price);


            }
            
        );
    }
}
