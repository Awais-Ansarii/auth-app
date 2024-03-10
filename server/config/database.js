const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
function db_Connection() {
    mongoose.connect(process.env.DB_URL, { family: 4 })
        .then(() => console.log(`db connected`))
        .catch((err) => {
        console.log(`error while connecting DB`, err.message)
        process.exit(1);
    })
}


module.exports = db_Connection