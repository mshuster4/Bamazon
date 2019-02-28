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
    console.log("Bamazon Supervisor Access");
    promptSupervisor();
});

function promptSupervisor() {
    inquirer.
    prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Product Sales by Department",
            "Create New Department"
        ]
    })
    .then(function(answer) {
        switch(answer.action) {
            case "View Product Sales by Department":
                viewProductSales();
                break;
            
            case "Create New Department":
                createNewDepartment();
                break;
        }
    });
}

function viewProductSales() {

    var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS product_sales, (SUM(products.product_sales) - departments.over_head_costs) "
    query += "AS total_profit FROM products INNER JOIN departments WHERE departments.department_name = products.department_name "
    query += "GROUP BY departments.department_id, products.department_name, departments.over_head_costs ORDER BY department_id";

    connection.query(query, function(err, res){

        table = new Table({head: ['Department ID', 'Department Name', 'Over Head Costs', 'Product Sales', "Total Profit"], 
                   style: {head:[], border:[], 
                   'padding-left':1, 'padding-right': 1 }})


        for (var i = 0; i < res.length; i++) {

            table.push([res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, res[i].total_profit]);
        }

        console.log(table.toString() + "\n\n");
        
        promptSupervisor();

    });

}

function createNewDepartment() {
    console.log("here")
}