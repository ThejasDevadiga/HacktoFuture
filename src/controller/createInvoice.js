
var easyinvoice = require('easyinvoice');
var fs = require('fs');  



 
const CreateInvoice = ()=>{
    var data = {
        "client": {
            "company": "FinTech solutions",
            "address": "Mangalore",
            "zip": "",
            "city": "",
            "country": ""
        },
        "sender": {
            "company": "SJEC HackToFuture",
            "address": "Mangalore",
            "zip": "",
            "city": "",
            "country": ""
        },
        "images": {
            logo: "https://alvascollege.com/wp-content/uploads/2019/03/logo.png",
        },
        "information": {
            "number": "2021.0001",
            "date": "12-12-2021",
        },
        "products": [
            {
                "quantity": "2",
                "description": "Test1",
                "price": 33.87
            },
            {
                "quantity": "4",
                "description": "Test2",
                "price": 10.45
            }
        ],
        "bottomNotice": "Thank you !! Visit Again ",
        "settings": {
            "currency": "", 
        },
    };
    
easyinvoice.createInvoice(data, function (result) {
    fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
});
}

module.exports = CreateInvoice;

