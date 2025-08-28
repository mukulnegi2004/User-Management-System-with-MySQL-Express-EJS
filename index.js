// //using faker package
// const { faker } = require('@faker-js/faker');                           // Import the faker library (from @faker-js/faker package)

// let createRandomUser = () => {                                          // Function to create a random user object
//   return {
//     idd: faker.string.uuid(),                                               // Generate a unique random ID
//     username: faker.internet.username(),                                   // Generate a fake username (e.g., johndoe92)
//     email: faker.internet.email(),                                             // Generate a fake email address
//     password: faker.internet.password(),                                         // Generate a fake password string
//   };
// }

// console.log(createRandomUser());                                           // Print one randomly generated user to the console






// ------------------ MySQL Connection ------------------

// //My SQL package
// const mysql = require("mysql2");                                         // Import MySQL2 package

// const connection = mysql.createConnection({                               // Create a connection object with database credentials
//   host: 'localhost',                                                      // Database host (local machine)
//   user: 'root',                                                           // Database username (default: root)
//   database: 'nodewithsql',                                                  // Database name you want to connect to
//   password: 'Mukul$2004'                                                        // MySQL root user password
// });

// let q = "SHOW TABLES";
// try {
//   connection.query(q, (err,res) => {                 // Run a SQL query: show all tables in the selected database
//     if(err){
//         throw err;                                                     // If query fails, throw error (will crash program here)
//     }
//     console.log(res);                                                  // Print the result of the query (array, list of tables)
//   });
// } catch (err) {                                                        // This will only catch errors
//   console.log(err); 
// }

// connection.end();                                                          // Close the database connection






// //Insert into "user" table :-
// const mysql = require("mysql2");                                         // Import MySQL2 package

// const connection = mysql.createConnection({                               // Create a connection object with database credentials
//   host: 'localhost',                                                      // Database host (local machine)
//   user: 'root',                                                           // Database username (default: root)
//   database: 'nodewithsql',                                                  // Database name you want to connect to
//   password: 'Mukul$2004'                                                        // MySQL root user password
// });

// let q = "INSERT INTO user(id, username, email, password) VALUES ?";
// let users = [
//   ["123a","mukul","mannu@","1234"],
//   ["123b","daksh","daksh@","1246"]
// ];
// try {
//   connection.query(q, [users], (err,res) => {                 // Run a SQL query: show all tables in the selected database
//     if(err){
//         throw err;                                                     // If query fails, throw error (will crash program here)
//     }
//     console.log(res);                                                  // Print the result of the query (array, list of tables)
//   });
// } catch (err) {                                                        // This will only catch errors
//   console.log(err); 
// }

// connection.end();                                                          // Close the database connection






//Insert in bulk using faker package :-
const { faker } = require('@faker-js/faker');                           // Import the faker library (from @faker-js/faker package)

let createRandomUser = () => {                                          // Function to create a random user object
  return [
    faker.string.uuid(),                                               // Generate a unique random ID
    faker.internet.username(),                                   // Generate a fake username (e.g., johndoe92)
    faker.internet.email(),                                             // Generate a fake email address
    faker.internet.password(),                                         // Generate a fake password string
  ];
};

const mysql = require("mysql2");                                         // Import MySQL2 package

const connection = mysql.createConnection({                               // Create a connection object with database credentials
  host: 'localhost',                                                      // Database host (local machine)
  user: 'root',                                                           // Database username (default: root)
  database: 'nodewithsql',                                                  // Database name you want to connect to
  password: 'Mukul$2004'                                                        // MySQL root user password
});

let q = "INSERT INTO user(id, username, email, password) VALUES ?";            // SQL query (VALUES ? lets us pass multiple rows at once)
let data = [];                                                              // Prepare data array (will hold 100 users)
for(let i=1;i<=100;i++){
  data.push(createRandomUser());                                             // Prepare data array (will hold 100 users)          
}
try {
  connection.query(q, [data], (err,result) => {                        // Run a SQL query: show all tables in the selected database
    if(err){
        throw err;                                                     // If query fails, throw error (will crash program here)
    }
    console.log(result);                                                  // Print the result of the query (array, list of tables)
  });
} catch (err) {                                                        // This will only catch errors
  console.log(err); 
}

// connection.end();                                                          // Close the database connection










// //Routing  (connecting REStful APIs with database which contains data of 100 users, which was added previously)
const express = require("express");                                                 // Import Express framework
const app = express();                                                           // Initialize Express app                                       
let port = 8080;                                                                    // Define the port number

app.listen(port, () => {                                                          // Start the server
  console.log("App is listening on port:", port);
});

// const mysql = require("mysql2");                                     // Import MySQL2 package for database connection

// const connection = mysql.createConnection({                               // Create a connection object with database credentials
//   host: 'localhost',                                                      // Database host (local machine)
//   user: 'root',                                                           // Database username (default: root)
//   database: 'nodewithsql',                                                  // Database name you want to connect to
//   password: 'Mukul$2004'                                                        // MySQL root user password
// });

const path = require("path");                                       //Add template, Import path module (used for views folder path)
app.set("view engine","ejs");                                       // Set EJS as the template/view engine                                          
app.set("views", path.join(__dirname, "views"));                  // Set the "views" directory where EJS templates will be stored
 

//HOME route -> Display total no. of users
app.get("/", (req, res) => {                                             // Define the home route ("/")
  let q = "SELECT count(*) FROM user";                                    // SQL query: count total rows in 'user' table
  try {
    connection.query(q, (err, result) => {                                     // Execute SQL query       
      if (err) {
        throw err;                                                               // Throw error if query fails                       
      } 
      let count = result[0]["count(*)"]                                       // Extract the count value from result
      res.render("home.ejs", {count});                                   // Render 'home.ejs' template and send count value to it                                   
    });
  } catch (err) {                                                      
    console.log(err);                                                  // Log error in console
    res.send("some error in DB");                                       // Send error response to client
  }
});


//SHOW route -> Display all users
app.get("/user", (req, res) => {              
  let q = "SELECT * FROM user";                                               // SQL query to fetch all rows from 'user' table
  try {
    connection.query(q, (err, result) => {                                     // Execute SQL query       
      if (err) {
        throw err;                                                               // Throw error if query fails                       
      }        
      res.render("showusers.ejs", { result });                       // Render "showusers.ejs" and pass 'result' (array of users) to template        
    });
  } catch (err) {                                                      
    console.log(err);                                                   // Log error in console
    res.send("some error in DB");                                       // Send error response to client
  }
});


// //EDIT route
//Show the edit form for a specific user
app.get("/user/:id/edit", (req, res) => {                          
  let { id }= req.params;                                              // Extract user id from route parameter
  let q = `SELECT * FROM user WHERE id = "${id}"`;                       // SQL query → fetch user by id                        
  try {
    connection.query(q, (err, result) => {                            // Execute SQL query, result is the array of rows returned by MySQL.       
      if (err) {
        throw err;                                                               // Throw error if query fails                       
      }        
      let user = result[0];           // Extract first user object from result array (since query returns array, even if contains only one user)
      console.log(user);
      res.render("edit.ejs", {user});                                   // Render edit.ejs and pass user object   
    });
  } catch (err) {                                                      
    console.log(err);                                                   // Log error in console
    res.send("some error in DB");                                       // Send error response to client
  }
});

// Middlewares for form parsing & method override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));                                           // Allows PATCH/DELETE from forms
app.use(express.urlencoded({ extended: true }));                               // Parse form data

//Update username of a user (only if password matches)
app.patch("/user/:id", (req, res) => {  
  let { id } = req.params;                                                        // Extract user id from URL
  let { password: formpass, username: newUser} = req.body;                         // Extract submitted form data    
  let q = `SELECT * FROM user WHERE id = "${id}"`;                                // SQL query → fetch user details by id                  
  try {
    connection.query(q, (err, result) => {                                     // Execute SQL query       
      if (err) {
        throw err;                                                               // Throw error if query fails                       
      }     
      let user = result[0];                                                    // Extract user data from DB result
      if(formpass != user.password){                                // Check if entered password matches the actual password
        res.send("wrong pass");                                      // If not matching → reject update
      }else{
        let q2 = `UPDATE user SET username="${newUser}" WHERE id = "${id}"`;          // SQL query → update username
        connection.query(q2, (err, result) => {
          if (err) {
            throw err;                                                               // Throw error if query fails                       
          }  
          res.redirect("/user");                                    // After successful update → redirect back to /user page

        });
      }    
    });
  } catch (err) {                                                      
    console.log(err);                                                   // Log error in console
    res.send("some error in DB");                                       // Send error response to client
  }
});


//CREATE & NEW route
const { v4: uuidv4 } = require('uuid');                 // Import the uuid library to generate unique IDs

app.get("/user/new", (req,res) => {                       // Route to render the "new user" form              
  res.render("new.ejs");                                // Render the EJS template for creating a new user                       
})

app.post("/user/create", (req,res) => {                   // Route to handle form submission and create a new user                     
  let {username: newUser, email: newEmail, password: formpass} = req.body;     // Destructure the form data from the request body            
  let id = uuidv4();                                                              // Generate a unique ID for the new user                                                      
  let q = `INSERT INTO user (id, username, email, password)                       
           VALUES ("${id}", "${newUser}", "${newEmail}", "${formpass}")`;         // SQL query to insert the new user into the database                                  
  connection.query(q, (err, result) => {                                 // Execute the SQL query                  
    if (err) {
      console.log(err);                                                   // Log the error
      return res.send("Error inserting user into DB");                    // Prevent crash
    }
  
    res.redirect("/user");          // Success → redirect
  });                 
                                   
})
           

//DELETE route
app.get("/user/delete", (req,res) => {                                     // Route to render the "delete user" form                               
  res.render("remove.ejs");                                        // Render the EJS template where user inputs email & password                            
})

app.delete("/user", (req, res) => {                                // Route to handle form submission and delete a user
  let {email: userEmail, password: formpass} = req.body;             // Destructure email and password from form submission                    
  let q = `SELECT * FROM user WHERE email = "${userEmail}"`;          // SQL query to find the user by email                                         
  connection.query(q, (err, result) => {                            // Execute the SELECT query                                      
    if (err) {                                                       // error if query fails
      console.log(err);                                                   
      res.send("some error in DB");                                                                            
    }     
    let user = result[0];                                            // Get the first user from the result                                         
    if(formpass != user.password || userEmail != user.email){         // Check if either the password or email do not match                      
      res.send("wrong email or pass");                                      
    }else{
      let q2 = `DELETE FROM user                                       
                WHERE email = "${userEmail}"`;                             // SQL query to delete the user by email    
      connection.query(q2, (err, result) => {                                 // Execute the DELETE query
        if (err) {
          console.log(err);                                                   
          res.send("some error in DB");                                                                                    
        }  
        res.redirect("/user");                                           // Redirect to the list of users after successful deletion                            
      });
    }    
  });
});
