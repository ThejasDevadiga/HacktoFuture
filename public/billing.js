window.addEventListener("load", () => {

    const BillForm = document.querySelector('#bill-form');  
    BillForm.addEventListener("submit",()=>{
        const productID = document.getElementById('prod').value;
        const quantity = document.getElementById('quantity').value;
        console.log(prodName,quantity);
        var products = sessionStorage.getItem("products");
        products.append({productID,quantity})
        sessionStorage.setItem("products",products);
      })
      
})