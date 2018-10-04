// Set up MySQL connection. // same starter for each project.
const mysql = require("mysql");
let connection;


if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
  connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  //some db has password
  password: "root",

  // enter correct db
  database: "burgers_db"
  })
};  

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;