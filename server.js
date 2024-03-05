const express = require("express"); // THIS IS THE STEP WHERE WE IMPORT THE EXPRESS PACKAGE
const app = express(); // THIS IS WHERE WE INTIALIZE THE EXPRESS APP
const dotenv = require("dotenv").config(); //IMPORT DOTENV PACKAGE TO READ THE VALUES FROM .ENV FILE
const mongoose = require("mongoose"); //IMPORTING MOGOOSE PACKAGE TO USES AS A CONNECTOR OBJECT TO CONNECT WITH THE MONGODB
const port = process.env.PORT || 3001; //INITIALIZE THE SERVER CONNECTION PORT

// BY DEFAULT EXPRESS JS NOT SUPPORT JSON SO NEED TO USE A MIDDLEWARE
app.use(express.json()); //THIS IS EXPRESS MIDDLEWARE TO ALLOW THE USE OF JSON

// API ROUTES

// GET ROUTE
app.get("/products", function (req, res) {
  res.status(200).json({
    message: "workking",
  });
});

// POST ROUTE
app.post("/products", function (req, res) {
  res.status(200).json(req.body);
});

// connecting to the mongo database using connection string
mongoose
  .connect(
    "mongodb+srv://root:PvP4I0yv6mWHY1s1@learning.tcu651f.mongodb.net/expressjs-learning?retryWrites=true&w=majority&appName=learning" // THIS IS THE CONNECTION STRING FROM THE MONGO DB
  )
  .then(() => {
    // IF CONNECTION IS WORKING PROPERLY THEN WE WILL GO TO THE NEXT STEP OF RUNNING THE SERVER
    app.listen(port, () => {
      console.log(`Server running on post ${port}
      \nUrl is: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    // IF THE ERROR IS THERE IN SERVER WILL THROUGH A ERROR MESSAGE
    console.log("Error connecting to the database");
    console.log(err.message);
  });
