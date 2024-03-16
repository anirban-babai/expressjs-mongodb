const Products = require("../model/products.model");

const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json({
      count: products.length,
      result: products,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error_message: err.message,
    });
  }
};

const getSingleproducts = async (req, res) => {
  // get id
  const { id } = req.params;

  try {
    let product = await Products.findById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error_message: err.message,
    });
  }
};

const addProducts = async (req, res) => {
  try {
    const product = await Products.create(req.body);
    res.status(200).json({
      count: products.length,
      result: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error_message: error.message,
    });
  }
};

const updateProducts = async (req, res) => {
  // getting product id from url
  const { id } = req.params; // GETTING THE ID FROM THE URL

  const data = req.body; // GETTING TYHR POST DATA

  try {
    const products = await Products.findByIdAndUpdate(id, data, { new: true });
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error_message: error.message,
    });
  }

  //   res.send(id);
};

const deleteProducts = async (req, res) => {
  let { id } = req.params;
  try {
    const products = await Products.findByIdAndDelete(id);
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error_message: error.message,
    })
  }
}

module.exports = {
  getProducts,
  getSingleproducts,
  addProducts,
  updateProducts,
  deleteProducts
};
