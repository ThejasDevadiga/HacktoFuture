const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Products = require("./src/models/products");
const Invoices  = require('./src/models/invoiceList')
// const CreateInvoice = require('./src/controller/createInvoice')
const asyncHandler = require("express-async-handler");
const Tesseract = require('tesseract.js')
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

app.post("/validateInvoice/",asyncHandler(async(req,res)=>{

  const url = req.body.url;
  console.log(url);
 Tesseract.recognize(
    url,
    'eng',
    { logger: m => console.log(m) } 
    ).then(async({ data: { text } }) => {  
      const result = await Invoices.find({}, {}).populate({
        model:Products,
        path:"productList.productID"
      });
      console.log(text);
      //let string = "Hello, this is your Invoice number: 123456\nPlease pay your dues on time.";

//       let start_word = "Invoice";
//         let start_index = text.indexOf(start_word);


//         let end_word = "\n";
//        let end_index = text.indexOf(end_word);


//         let substring = text.substring(start_index + start_word.length, end_index);


//          let words = substring.split(" ");

//         console.log(words);
//        words="Invoice"+words;
//        console.log(result);
//        // Sample JSON database
//      //let database = '{"colors": ["red", "green", "blue"], "fruits": ["apple", "banana", "orange"]}';

// // String to compare
// //let string = "green";

// // Parse the database into a JavaScript object
// let databaseObject = JSON.parse(result);

// // Loop through the values in the database and check if the string matches any of them
// let matchFound = false;
// for (let key in databaseObject) {
//   if (databaseObject[key].includes(words)) {
//     matchFound = true;
//     console.log("Match found in the databse");
//     break;
//   }
// }

// if (!matchFound) {
//   console.log("No match found in the database");
// }


        res.send({
          data:text,
          status:"Approved"
          })
    })
    .catch(err=>{
      res.send({
        data:err,
        status:"Disapproved"
        })
    })   
// res.send({
//             data:"text",
//             status:"Approved"
//             })
}))

app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + "/views/home.html");
});

app.get("/billing", (req, res) => {
  res.sendFile(__dirname + "/views/billing.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/views/aboutus.html");
});

app.use(errorHandler);

const PORT = 5000;
console.log(`http://localhost:${PORT}/`);

app.listen(PORT, console.log(`Server port ${PORT}`));
