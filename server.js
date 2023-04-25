const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Products = require("./src/models/products");
const asyncHandler = require('express-async-handler')
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/HackToFuture', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Connected to Database : ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit();
  }
};
const errorHandler = (err,req, res, next) => {
    const statusCode = res.statusCode === 200 ? 400 : res.statusCode;
    console.log(err.message);
    // res.render('notFound', { title: 'ERROR PAGE', message: err.message ,heading:"ERROR FOUND"})
    res.status(statusCode).json({ message: err.message,heading:"ERROR FOUND"})
};

connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());
app.set('views', 'views');
app.set('view engine', 'pug');

console.log(__dirname);
app.use(express.static('public'));  


app.get("/products",asyncHandler(async(req,res)=>{
    const result = await Products.find({},{})
    res.status(200).json({
    data:result})
}))


const insertData=async()=>{
    await Products.insertMany([
    {
        "productName": "Book",
        "productId": "S1",
        "productCategory": "Stationary"
    },
    {
        "productName": "Pen",
        "productId": "S2",
        "productCategory": "Stationary"
    },
    {
        "productName": "Eraser",
        "productId": "S3",
        "productCategory": "Stationary"
    },
    {
        "productName": "Pencil",
        "productId": "S4",
        "productCategory": "Stationary"
    },
    {
        "productName": "Sanitizer",
        "productId": "H1",
        "productCategory": "Hyg"
    },
    {
        "productName": "Drone",
        "productId": "5",
        "productCategory": "sdfsd"
    },
      
      ])
}
  insertData()


app.get("/",(req,res)=>{

    res.render('home',{})
})

app.use(errorHandler);

const PORT = 5000;
console.log(`http://localhost:${PORT}/`);

app.listen(PORT, console.log(`Server port ${PORT}`));

