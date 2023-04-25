const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Products = require("./src/models/products");
const Invoices = require("./src/models/invoiceList");
// const CreateInvoice = require('./src/controller/createInvoice')
const asyncHandler = require("express-async-handler");
const Tesseract = require("tesseract.js");
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

app.get(
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
      model: Products,
      path: "productList.productID",
    });

    res.status(200).json({
      data: result,
    });
  })
);

app.get(
  "/validateInvoice/:id/:name",
  asyncHandler(async (req, res) => {
    console.log(req.params.id);
    const url =
      "https://res.cloudinary.com/acahscollege/image/upload/" +
      req.params.id +
      "/" +
      req.params.name;
    console.log(url);
    Tesseract.recognize(url, "eng", { logger: (m) => console.log(m) })
      .then(async ({ data: { text } }) => {
        const invoiceList = await Invoices.find({}, {}).populate({
          model: Products,
          path: "productList.productID",
        });

        console.log(text);

        let start_word = "Invoice No. ";
        let start_index = text.indexOf(start_word);

        let end_word = "\r";
        let end_index = text.indexOf(end_word);

        let substring = text.substring(
          start_index + start_word.length,
          end_index
        );
        console.log(substring);
        let words = substring.split(" ");

        console.log(words);
        //words="Invoice"+words;
        console.log(words);

        let matchFound = false;
        for (let invoice of invoiceList) {
          if (invoice.invoiceID === words[0]) {
            matchFound = true;
            console.log("Invoice Match found !!");
            //console.log(invoice);
            break;
          }
        }
        if (!matchFound) {
          console.log("Invoice not found !!");
        }
        let count = 0;
        let i = 1;
        let matchFound1 = false;
        for (let invoice of invoiceList) {
          if (text.indexOf(invoice.customerName) !== -1) {
            if (i === 1) {
              console.log("Name Matched");
              i++;
            }
            count++;
          }
          let j = 1;
          if (text.indexOf(invoice.customerAddress) !== -1) {
            if (i === 1) {
              console.log("Address Matched");
              j++;
            }
            count++;
          }
          let k = 1;
          if (text.indexOf(invoice.Phone) !== -1) {
            if (k === 1) {
              console.log("Phone numnber Matched");
              k++;
            }
            count++;
          }
          let z = 1;
          if (text.indexOf(invoice.Date) !== -1) {
            if (z === 1) {
              console.log("Date Matched");
              z++;
            }
            count++;
          }
          let n = 1;
          if (text.indexOf(invoice.Total) !== -1) {
            if (n === 1) {
              console.log("Total Amount Matched");
              n++;
            }
            count++;
          }
        }
        let avg = 0;
        avg = (count / 5) * 100;
        console.log(count);
        console.log(avg + "% Match Found");

        res.status(200).json({
          data: text,
          status: "Approved",
        });
      })
      .catch((err) => {
        res.status(500).json({
          data: err,
          status: "Disapproved",
        });
      });
  })
);


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
