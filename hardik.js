const res = [
    {
      "_id": "644782b96f1644db05e2ab82",
      "invoiceID": "INV789632455",
      "customerName": "Gorge",
      "customerAddress": "Up Hills Town",
      "Phone": 96962223,
      "Date": "2023-04-25T07:35:21.000Z",
      "__v": 0,
      "createdAt": "2023-04-25T07:35:21.468Z",
      "updatedAt": "2023-04-25T07:35:21.468Z",
      "Total":2000,
      "productList": [
        {
          "_id": "64481cbc6915aa59fc473f92",
          "productID": {
            "_id": "64477352c700bb82014dc543",
            "productId": "S4",
            "productName": "Pencil",
            "productCategory": "Stationary",
            "__v": 0,
            "createdAt": "2023-04-25T06:29:38.885Z",
            "updatedAt": "2023-04-25T06:29:38.885Z"
          },
          "quantity": 3
        },
        {
          "_id": "64481cbc6915aa59fc473f93",
          "productID": {
            "_id": "64477352c700bb82014dc544",
            "productId": "H1",
            "productName": "Sanitizer",
            "productCategory": "Hygiene",
            "__v": 0,
            "createdAt": "2023-04-25T06:29:38.885Z",
            "updatedAt": "2023-04-25T06:29:38.885Z"
          },
          "quantity": 2
        },
        {
          "_id": "64481cbc6915aa59fc473f94",
          "productID": {
            "_id": "64477352c700bb82014dc540",
            "productId": "S1",
            "productName": "Book",
            "productCategory": "Stationary",
            "__v": 0,
            "createdAt": "2023-04-25T06:29:38.884Z",
            "updatedAt": "2023-04-25T06:29:38.884Z"
          },
          "quantity": 3
        }
      ]
    },
    {
      "_id": "64481ca1aa4ede2d0cb0d2ae",
      "invoiceID": "12345",
      "customerName": "Gorge",
      "customerAddress": "Up Hills Town",
      "Phone": 96962223,
      "Date": "2023-04-25T07:35:21.000Z",
      "__v": 0,
      "createdAt": "2023-04-25T07:35:21.468Z",
      "updatedAt": "2023-04-25T07:35:21.468Z",
      "Total":500,
      "productList": [
        {
          "_id": "64481cbc6915aa59fc473f95",
          "productID": {
            "_id": "64477352c700bb82014dc543",
            "productId": "S4",
            "productName": "Pencil",
            "productCategory": "Stationary",
            "__v": 0,
            "createdAt": "2023-04-25T06:29:38.885Z",
            "updatedAt": "2023-04-25T06:29:38.885Z"
          },
          "quantity": 3
        },
        {
          "_id": "64481cbc6915aa59fc473f96",
          "productID": {
            "_id": "64477352c700bb82014dc544",
            "productId": "H1",
            "productName": "Sanitizer",
            "productCategory": "Hygiene",
            "__v": 0,
            "createdAt": "2023-04-25T06:29:38.885Z",
            "updatedAt": "2023-04-25T06:29:38.885Z"
          },
          "quantity": 2
        },
        {
          "_id": "64481cbc6915aa59fc473f97",
          "productID": {
            "_id": "64477352c700bb82014dc540",
            "productId": "S1",
            "productName": "Book",
            "productCategory": "Stationary",
            "__v": 0,
            "createdAt": "2023-04-25T06:29:38.884Z",
            "updatedAt": "2023-04-25T06:29:38.884Z"
          },
          "quantity": 3
        }
      ]
    }
  ]
  
  
const text = "Date : 12/07/2023 Invoice No. 12345 Fintech Solutions & Co. Pvt. Ltd. INVOICE TO :HARDIK PRABHU P : +918496845871 E : hardikprabhul23@gmail.com A : Alvas Institute of Engg & Tech PRODUCTS QTY PRICE TOTAL Sub-total : Rs1,735 Payment Method : Tox : Rs55 Bank Name :Canara Bank Total : Rs1,680 Bank Account : 1280969458 Authorised Signature"



let start_word = "Invoice No. ";
let start_index = text.indexOf(start_word);

let end_word = "\r";
let end_index = text.indexOf(end_word);


let substring = text.substring(start_index + start_word.length, end_index);
console.log(substring);
 let words = substring.split(" ");

console.log(words);
//words="Invoice"+words;
console.log(words);


let matchFound = false;
for (let invoice of res) {
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


let count=0;
let i=1;
let matchFound1 = false;
for (let invoice of res) {
if (text.indexOf(invoice.customerName) !==-1 ) {
    if(i===1)
    {
    console.log("Name Matched");
    i++;
    }
    count++;
}
let j=1;
if (text.indexOf(invoice.customerAddress) !==-1 ) {
    if(i===1)
    {
    console.log("Address Matched");
    j++;
    }
    count++;
}
let k=1;
if (text.indexOf(invoice.Phone) !==-1 ){
    if(k===1)
    {
    console.log("Phone numnber Matched");
    k++;
    }
          count++;
}
let z=1;
if (text.indexOf(invoice.Date) !==-1 ) {
    if(z===1)
    {
    console.log("Date Matched");
    z++;
    };
     count++;
}
let n=1;
if (text.indexOf(invoice.Total) !==-1 ) {
    if(n===1)
    {
    console.log("Total Amount Matched");
    n++;
    };
    count++;
}
}
let avg=0;
avg=(count/5)*100;
console.log(count);
console.log(avg+"% Match Found");




