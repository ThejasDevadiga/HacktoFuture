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
    const  Output = {};
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

  
  let start_word = "Invoice ID: ";
  let start_index = text.indexOf(start_word);
  
  let end_word = "Address";
  let end_index = text.indexOf(end_word);
  
  let substring = text.substring(
    start_index + start_word.length,
    end_index
  );
  
  console.log(substring);
  let words = substring.split(" ");
  const  Invoice = {}
  let matchFound = false;
  for (let invoice of invoiceList) {
    if (invoice.invoiceID === words[0]) {
      matchFound = true;
      console.log("Invoice Match found !!");
      //console.log(invoice);
      Invoice = invoice
      break;
    }
  }
  
  if (!matchFound) {
    Output.status="Invoice not found!"
    console.log("Invoice not found!");
    
  }
  
  if (matchFound) {
    let count = 1;
    let i = 1;
    let matchFound1 = false;
      if (text.indexOf(Invoice.customerName) !== -1) {
        if (i === 1) {
          Output.Name="Name Matched"
          console.log("Name");
          i++;
        }
        count++;
      }
      let j = 1;
      if (text.indexOf(Invoice.customerAddress) !== -1) {
        if (i === 1) {
          Output.address="Address Matched"
          console.log("Address");
          j++;
        }
        count++;
      }
      let k = 1;
      if (text.indexOf(Invoice.Phone) !== -1) {
        if (k <= 1) {
          Output.phone="Phone number Matched";
          console.log("Phone");
          k++;
        }
        count++;
      }
      let z = 1;
      if (text.indexOf(Invoice.Date) !== -1) {
        if (z === 1) {
          Output.date="Date Matched",
          console.log("Date");
          z++;
        }
        count++;
      }
      let n = 1;
      if (text.indexOf(Invoice.Total) !== -1) {
        if (n === 1) {
          Output.Total="Total Amount Matched"
          
          console.log("total");
          n++;
        }
        count++;
      }
      let avg = 0;
      avg = (count / 6) * 100;
      const Status = document.getElementById("status")
      Status.innerHTML = avg + "% Match Found";
      Status.style.color= "Green";
      Status.style.fontSize="15px"
      // Output.address=avg + "% Match Found";
    }

        res.status(200).json({
          data: text,
          Output:Output,
          status: "Approved",
        });
      })
      .catch((err) => {
        res.status(200).json({
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
