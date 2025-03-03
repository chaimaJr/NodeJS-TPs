const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoutes = require("./routes/user.routes")
const authRoutes = require("./routes/auth.routes")


dotenv.config();

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);


// Database

mongoose.connect(process.env.MONGO_URI)
.then( () => {
    console.log('connected to database server')
})
.catch(err => console.log(err));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});