let form = document.getElementById("productForm");

let fileInput = form.querySelector('input[type="file"]');
let imgPreview = form.querySelector('#img-preview');
let nameInput = form.querySelector('#product-name');
let descriptionInput = form.querySelector('#product-description');
let priceInput = form.querySelector('#product-price');
let stockInput = form.querySelector('#product-stock');
let stateInput = form.querySelector('#product-state');
let categoryInput = form.querySelector('#product-category');



export function prepareEdit(id) {

    let products = JSON.parse(localStorage.getItem("products"));
    let product = products.find(obj => obj.code == id);
    
    imgPreview.src = product.image;
    imgPreview.style.width = "100px";
    imgPreview.style.height = "100px";

    nameInput.value= product.names;
    descriptionInput.value= product.description;
    priceInput.value= product.price;
    stockInput.value= product.stock;
    stateInput.value= product.state;
    categoryInput.value= product.category;

    btn.click();
    isProduct=true
}