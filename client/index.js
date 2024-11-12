const express = require('express');
const app = express();

require("dotenv").config();
const cors = require("cors");

app.use(cors()) // Use cors as middleware

app.use(express.json())
app.use(express.urlencoded({extended: true}));

const { GetUser, PostUser, deleteUser, updateUser } = require("./Controller/UserController") // User Controller Import

// METHOD -- CREATE, READ
// API    -- http://localhost:4869/Users

app.route("/Users").get(GetUser).post(PostUser)

// METHOD -- DELETE, UPDATE/PUT
// API    -- http://localhost:4869/Users/_id

app.route("/Users/:id").delete(deleteUser).put(updateUser)

const {Conn} = require("./Config/db") // DB Connection Import

app.listen(process.env.PORT, function () {
   console.log(`Server is running at: http://localhost:${process.env.PORT}/`);
   Conn();
});
