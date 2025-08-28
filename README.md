# User Management System (Node.js + MySQL + Express + EJS)

A simple **CRUD application** using **Node.js, Express.js, MySQL, and EJS templates**.  
Users can be added, viewed, updated, or deleted.  
The project also supports **bulk fake user generation** using Faker.

---

## 🚀 Features
- Bulk insert of 100 fake users (`@faker-js/faker`)
- Show total number of users
- List all users in a table
- Create a new user
- Edit username (with password check)
- Delete user (with email + password check)
- RESTful routing (`GET`, `POST`, `PATCH`, `DELETE`)
- EJS templating for frontend

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL (`mysql2`)
- **Frontend:** EJS (templating engine)
- **Utilities:** Faker, UUID, Method-Override

---

## 📂 Project Structure
```
├── views/ # EJS templates
│ ├── home.ejs
│ ├── showusers.ejs
│ ├── edit.ejs
│ ├── new.ejs
│ └── remove.ejs
├── schema.sql # MySQL schema file (DB + table creation)
├── index.js # Main Express server
├── package.json # Dependencies
└── README.md # Documentation
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo
git clone https://github.com/your-username/sqlclass.git
cd sqlclass
## 2. Install dependencies
npm install
## 3. Setup Database
```
Import the schema.sql file into MySQL :-
mysql -u root -p < schema.sql
This will :-
Create a database named nodewithsql
Create a table named user
```
## 4. Configure DB connection
Update credentials inside index.js:
## 5. Run the app
node index.js
Visit 👉 http://localhost:8080

---

