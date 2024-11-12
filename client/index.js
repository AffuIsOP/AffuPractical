const express = require('express');
const app = express();

require("dotenv").config();

app.use(express.urlencoded({extended: true}));

const {GetUser, PostUser} = require("./Controller/UserController") // User Controller Import

app.route("/Users").get(GetUser).post(PostUser)  // Users Api

const {Conn} = require("./Config/db") // DB Connection Import

app.listen(process.env.PORT, function () {
   console.log(`Server is running at: http://localhost:${process.env.PORT}/`);
   Conn();
});
