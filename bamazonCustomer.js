var mysql = require("mysql");
var inquirer = require("inquirer");
// Trying to use cli-table package for the first time......UPDATE...sweeeeet made it work!!!!
var bamProTable = require('cli-table');
// variable to call the end of the bamazon cli
var byeBamazon = function() {
  connection.end();
  }

// Create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Port
  port: 3306,
  // Username
  user: "root",
  // Password
  password: "Apple101",
  // Database
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  console.log("You are now connected")
  // call back the queryAllItems function after the connection is made to display all the items available to the user
  queryAllItems();
});

//A Function that list all the items for sale on BAMAZON.  Running this application will first display all of the items available for sale and includes the ids, names, and prices of products for sale.
function queryAllItems() {
  connection.query("SELECT * FROM bamazon", function (err, res) {
    if (err) throw err;
    // We can create a table using the cli-table node package
    var productsTable = new bamProTable({
      // Per documentation, we declare the tables categories
      head: ["ITEM ID", "PRODUCT NAME", "DEPARTMENT NAME", "PRICE", "QUANTITY IN STOCK"],
      // We can also set the widths for the columns
      colWidths: [10, 15, 20, 10, 20]
    });
    // We also need to loop through our items so they can be listed on our table
    for (i = 0; i < res.length; i++) {
      // We then push our items to the newly created table
      productsTable.push(
        [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
      );
    }
    // Finally we can log the completed table
    console.log(productsTable.toString());
    // and call back the inquireToBuy function to run it right after the table appears
    inquireToBuy();
  });
};

// The app should then prompt users with two messages.
function inquireToBuy() {
  inquirer.prompt([
    //The first should ask them the ID of the product they would like to buy.
    {
      name: "ID",
      type: "input",
      message: "What is the item ID of the product you wish to buy today?"
    }, 
    //The second message should ask how many units of the product they would like to buy.
    {
      name: "amount",
      type: "input",
      message: "OK. Great. How many units please?"
    },
  ])
  .then(function(userReply) {
    //Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
    connection.query('SELECT * FROM bamazon WHERE item_id = ?', [userReply.ID], function(err, res) {
      console.log(res);
      if (userReply.amount > res[0].stock_quantity) {
        //If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.
        console.log("Sorry there isn't enough of that item in stock.");
        console.log("Please select another item or come back another day");
        byeBamazon;
      //However, if your store _does_ have enough of the product, you should fulfill the customer's order.
      //This means updating the SQL database to reflect the remaining quantity.
      //Once the update goes through, show the customer the total cost of their purchase.
      } else {
        buyerTotal = res[0].price * userReply.amount;
        department = res[0].department_name;
        console.log("The total amount due is $ " + buyerTotal);
        console.log("Thanks for shopping at BAMAZON");
        var updateStock = res[0].stock_quantity - parseInt(userReply.amount);
        connection.query("UPDATE bamazon SET stock_quantity= " + updateStock + " WHERE item_id =" + userReply.ID);
        byeBamazon;
      }
  });
});

};
