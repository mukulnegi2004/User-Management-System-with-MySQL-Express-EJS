//Insert in bulk using faker package :-
const { faker } = require('@faker-js/faker');                        

let createRandomUser = () => {                           
  return [
    faker.string.uuid(),                                               
    faker.internet.username(),                                
    faker.internet.email(),                                    
    faker.internet.password(),                                      
  ];
};

const mysql = require("mysql2");                                         

const connection = mysql.createConnection({                               
  host: 'localhost',                                                 
  user: 'root',                                                      
  database: 'nodewithsql',                                                 
  password: 'Mukul$2004'                                                      
});

let q = "INSERT INTO user(id, username, email, password) VALUES ?";  
let data = [];                                                             
for(let i=1;i<=100;i++){
  data.push(createRandomUser());                                              
}
try {
  connection.query(q, [data], (err,result) => {                      
    if(err){
        throw err;                                                    
    }
    console.log(result);                                                  
  });
} catch (err) {                                    
  console.log(err); 
}



const express = require("express");                                         
const app = express();                                                                                           
let port = 8080;                                                             

app.listen(port, () => {                                             
  console.log("App is listening on port:", port);
});

const path = require("path");                             
app.set("view engine","ejs");                                                                       
app.set("views", path.join(__dirname, "views"));
 

//HOME route -> Display total no. of users
app.get("/", (req, res) => {                                       
  let q = "SELECT count(*) FROM user";                                    
  try {
    connection.query(q, (err, result) => {                                
      if (err) {
        throw err;                                                                         
      } 
      let count = result[0]["count(*)"]                        
      res.render("home.ejs", {count});                                                               
    });
  } catch (err) {                                                      
    console.log(err);                                                 
    res.send("some error in DB");                                       
  }
});


app.get("/user", (req, res) => {              
  let q = "SELECT * FROM user";                         
  try {
    connection.query(q, (err, result) => {                                       
      if (err) {
        throw err;                                                                                   
      }        
      res.render("showusers.ejs", { result });                     
    });
  } catch (err) {                                                      
    console.log(err);                                                  
    res.send("some error in DB");                                     
  }
});


// //EDIT route
//Show the edit form for a specific user
app.get("/user/:id/edit", (req, res) => {                          
  let { id }= req.params;                                           
  let q = `SELECT * FROM user WHERE id = "${id}"`;                                        
  try {
    connection.query(q, (err, result) => {                                
      if (err) {
        throw err;                                                                                
      }        
      let user = result[0];      
      console.log(user);
      res.render("edit.ejs", {user});                                
    });
  } catch (err) {                                                      
    console.log(err);                                           
    res.send("some error in DB");                                      
  }
});

const methodOverride = require("method-override");
app.use(methodOverride("_method"));                            
app.use(express.urlencoded({ extended: true }));                              

//Update username of a user (only if password matches)
app.patch("/user/:id", (req, res) => {  
  let { id } = req.params;                                                      
  let { password: formpass, username: newUser} = req.body;                      
  let q = `SELECT * FROM user WHERE id = "${id}"`;                                             
  try {
    connection.query(q, (err, result) => {                                  
      if (err) {
        throw err;                                                                              
      }     
      let user = result[0];                                                  
      if(formpass != user.password){                                
        res.send("wrong pass");                                  
      }else{
        let q2 = `UPDATE user SET username="${newUser}" WHERE id = "${id}"`;         
        connection.query(q2, (err, result) => {
          if (err) {
            throw err;                                                                                   
          }  
          res.redirect("/user");                                  

        });
      }    
    });
  } catch (err) {                                                      
    console.log(err);                                       
    res.send("some error in DB");                                      
  }
});


//CREATE & NEW route
const { v4: uuidv4 } = require('uuid');             

app.get("/user/new", (req,res) => {                            
  res.render("new.ejs");                                                
})

app.post("/user/create", (req,res) => {                            
  let {username: newUser, email: newEmail, password: formpass} = req.body;             
  let id = uuidv4();                                                                                                              
  let q = `INSERT INTO user (id, username, email, password)                       
           VALUES ("${id}", "${newUser}", "${newEmail}", "${formpass}")`;                                  
  connection.query(q, (err, result) => {                                   
    if (err) {
      console.log(err);                                               
      return res.send("Error inserting user into DB");                   
    }
  
    res.redirect("/user");       
  });                 
                                   
})
           

//DELETE route
app.get("/user/delete", (req,res) => {                                                        
  res.render("remove.ejs");                                                          
})

app.delete("/user", (req, res) => {                           
  let {email: userEmail, password: formpass} = req.body;                                 
  let q = `SELECT * FROM user WHERE email = "${userEmail}"`;                                            
  connection.query(q, (err, result) => {                                                          
    if (err) {                                                      
      console.log(err);                                                   
      res.send("some error in DB");                                                                            
    }     
    let user = result[0];                                                                                  
    if(formpass != user.password || userEmail != user.email){                            
      res.send("wrong email or pass");                                      
    }else{
      let q2 = `DELETE FROM user                                       
                WHERE email = "${userEmail}"`;                              
      connection.query(q2, (err, result) => {                         
        if (err) {
          console.log(err);                                                   
          res.send("some error in DB");                                                                                    
        }  
        res.redirect("/user");                                                              
      });
    }    
  });
});
