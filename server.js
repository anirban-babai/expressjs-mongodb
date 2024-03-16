const express = require("express"); // THIS IS THE STEP WHERE WE IMPORT THE EXPRESS PACKAGE
const app = express(); // THIS IS WHERE WE INTIALIZE THE EXPRESS APP
const dotenv = require("dotenv").config(); //IMPORT DOTENV PACKAGE TO READ THE VALUES FROM .ENV FILE
const mongoose = require("mongoose"); //IMPORTING MOGOOSE PACKAGE TO USES AS A CONNECTOR OBJECT TO CONNECT WITH THE MONGODB
const port = process.env.PORT || 3001; //INITIALIZE THE SERVER CONNECTION PORT

// BY DEFAULT EXPRESS JS NOT SUPPORT JSON SO NEED TO USE A MIDDLEWARE
app.use(express.json()); //THIS IS EXPRESS MIDDLEWARE TO ALLOW THE USE OF JSON

const apiRoutes = express.Router(); //CREATING ROUTE GROUPS USING EXPRESS ROUTE FUNCTION
app.use("/api", apiRoutes);

const Products = require("./model/products.model");

// API ROUTES
// GET ROUTE

apiRoutes.get("/", function (req, res) {
  console.log("Someone run the base url");
  res.status(200).json({
    message: "Api is running",
  });
});

// IMPORT PRODUCT CONTROLLER
const productController = require("./controller/productController");
// GET ROUTE
apiRoutes.get("/products", productController.getProducts);
// FIND SINGLE PRODUCT
apiRoutes.get("/products/:id", productController.getSingleproducts);
// POST ROUTE
apiRoutes.post("/products", productController.addProducts);
// UPDATE/PUT ROUTE
apiRoutes.put("/products/:id", productController.updateProducts);
// DELETE ROUTE
apiRoutes.delete("/products/:id", productController.deleteProducts);

// connecting to the mongo database using connection string
mongoose
  .connect(process.env.MONGO_CONNECTION) // THIS IS THE CONNECTION STRING FROM THE MONGO DB
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
