const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Products = require("./src/models/products");
const Invoices  = require('./src/models/invoiceList')
// const CreateInvoice = require('./src/controller/createInvoice')
const asyncHandler = require("express-async-handler");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://localhost:27017/HackToFuture",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    
    console.log(`Connected to Database : ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit();
  }
};
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 400 : res.statusCode;
  console.log(err.message);
  // res.render('notFound', { title: 'ERROR PAGE', message: err.message ,heading:"ERROR FOUND"})
  res.status(statusCode).json({ message: err.message, heading: "ERROR FOUND" });
};

connectDB();
// CreateInvoice()
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());


console.log(__dirname);
app.use(express.static("public"));


app.post(
  "/products",
  asyncHandler(async (req, res) => {
    const result = await Products.find({}, {});
    res.status(200).json({
      data: result,
    });
  })
);
app.get(
  "/invoices",
  asyncHandler(async (req, res) => {
    const result = await Invoices.find({}, {}).populate({
    model:Products,
    path:"productList.productID"
  });
  
    res.status(200).json({
      data: result,
    });
  })
);


app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + "/views/home.html");
});

app.get("/billing.html", (req, res) => {
  res.sendFile(__dirname + "/views/billing.html");
});


app.use(errorHandler);

const PORT = 5000;
console.log(`http://localhost:${PORT}/`);

app.listen(PORT, console.log(`Server port ${PORT}`));
