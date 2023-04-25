const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Connected to Database : ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit();
  }
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



const PORT = 5000;
console.log(`http://localhost:${PORT}/test`);

app.listen(PORT, console.log(`Server port ${PORT}`));

