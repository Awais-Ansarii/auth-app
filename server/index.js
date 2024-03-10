const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookie_parser = require("cookie-parser");
const db_Connection = require("./config/database")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT;
const userRoutes= require('./routes/userRoutes')
const authRoutes = require("./routes/authRoutes");


const app = express()

app.use(express.json())
app.use(cookie_parser())
app.use(cors())

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);



app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})

db_Connection();

app.get('/', (req, res) => {
    res.send(`<h1>Hello</h1>`)
})