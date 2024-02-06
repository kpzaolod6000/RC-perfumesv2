
import { Product } from "./product.js";

import { random } from "./random.js";

import { renderTable } from "./renderProducts.js";

let isProduct = false;
let uid = 0;

let products = JSON.parse(localStorage.getItem("products")) || [];

if (products) {
    renderTable(products);
}

let form = document.getElementById("productForm");
let imgPreview = form.querySelector('#img-preview');
let fileInput = form.querySelector('input[type="file"]');
let nameInput = form.querySelector('#product-name');
let descriptionInput = form.querySelector('#product-description');
let priceInput = form.querySelector('#product-price');
let stockInput = form.querySelector('#product-stock');
let categoryInput = form.querySelector('#product-category');

let adminModal = document.getElementById('create-product-modal');
let btn = document.getElementById('btn-show-modal');
btn.addEventListener("click", openModalbtn);
let btnSaveProduct = document.getElementById("save-product");
btnSaveProduct.addEventListener("click", saveProduct);

function openModalbtn() {
    imgPreview.removeAttribute("src")
    imgPreview.style.width = 0;
    imgPreview.style.height = 0;
    
    fileInput.value=null;
    nameInput.value="";
    descriptionInput.value="";
    priceInput.value="";
    stockInput.value="";
    categoryInput.value= "";

    nameInput.placeholder="Ej: Ego";
    nameInput.classList.remove("is-valid");
    nameInput.classList.remove("is-invalid");

    descriptionInput.placeholder="Ej: Ego es el perfume mas ...";
    descriptionInput.classList.remove("is-valid");
    descriptionInput.classList.remove("is-invalid");

    priceInput.placeholder="Ej: 39.99";
    priceInput.classList.remove("is-valid");
    priceInput.classList.remove("is-invalid");

    stockInput.placeholder="Ej: 4";
    stockInput.classList.remove("is-valid");
    stockInput.classList.remove("is-invalid");
    
    categoryInput.classList.remove("is-valid");
    categoryInput.classList.remove("is-invalid");

    isProduct = false;
}

function validName() {
    if (nameInput.value !== "" && nameInput.value.trim().length>=5) {
        nameInput.className="form-control is-valid";
        return true
    }else{
        nameInput.classList.remove("is-valid");
        nameInput.className = "form-control is-invalid";
        nameInput.placeholder = "Por favor, ingrese un nombre válido";
        return false
    }
}

function validDescription() {
    if (descriptionInput.value !== "" && descriptionInput.value.trim().length>=10) {
        descriptionInput.className="form-control is-valid";
        return true
    }else{
        descriptionInput.classList.remove("is-valid");
        descriptionInput.className = "form-control is-invalid";
        descriptionInput.placeholder = "Por favor, ingrese una description válida";
        return false
    }
}

function validPrice() {
    let regex = /^\d+(\.\d+)?$/;
    if (priceInput.value !== "" && (regex.test(priceInput.value))  ) {
        priceInput.className="form-control is-valid";
        return true
    }else{
        priceInput.classList.remove("is-valid");
        priceInput.className = "form-control is-invalid";
        priceInput.placeholder = "Por favor, ingrese un precio válido";
        return false
    }
}

function validStock() {
    let valueNum = Number(stockInput.value);
    let valueRed = Math.round(valueNum);

    if (stockInput.value !== "" && valueNum === valueRed) {
        stockInput.className="form-control is-valid";
        return true
    }else{
        stockInput.classList.remove("is-valid");
        stockInput.className = "form-control is-invalid";
        stockInput.placeholder = "Por favor, ingrese un stock válido";
        return false
    }
}

function validCategory() {
    if (categoryInput.value !== "") {
        categoryInput.className="form-control is-valid";
        return true
    }else{
        categoryInput.classList.remove("is-valid");
        categoryInput.className = "form-control is-invalid";
        categoryInput.placeholder = "Por favor, selecciona una categoria";
        return false
    }
}

nameInput.addEventListener('blur',()=>validName());
descriptionInput.addEventListener('blur',()=>validDescription());
priceInput.addEventListener('blur',()=>validPrice());
stockInput.addEventListener('blur',()=>validStock());
categoryInput.addEventListener('blur',()=>validCategory());

function validateFile(selectedFile) {
    if (!selectedFile) {
        toastr.options.positionClass = 'toast-top-right';
        toastr.error('Por favor ingrese una imagen del producto');
        return false
    }
    return true;
}


function validateAll() {
    
    if (!validName()) {
        toastr.options.positionClass = 'toast-top-right';
        toastr.error('Por favor ingrese un nombre del producto');
        return false
    }
    if (!validDescription()) {
        toastr.options.positionClass = 'toast-top-right';
        toastr.error('Por favor ingrese una descripción del producto');
        return false
    }
    if (!validPrice()) {
        toastr.options.positionClass = 'toast-top-right';
        toastr.error('Por favor coloque precio del producto');
        return false
    }
    if (!validStock()) {
        toastr.options.positionClass = 'toast-top-right';
        toastr.error('Por favor coloque el stock del producto');
        return false
    }
    if (!validCategory()) {
        toastr.options.positionClass = 'toast-top-right';
        toastr.error('Por favor seleccione una categoria del producto');
        return false
    }
    return true;
  }

function saveProduct(e) {
    e.preventDefault();
    
    if (isProduct) {
        editProduct(uid);
    }else {
        createProduct();
    }
    uid = 0;
}

function createProduct() {

    let selectedFile = fileInput.files[0];
    if (validateFile(selectedFile) && validateAll()) {
        const reader = new FileReader();

        reader.onload = function (e) {
            let newId = random();
            let product = new Product(
                newId,
                e.target.result,
                nameInput.value,
                descriptionInput.value,
                parseFloat(priceInput.value),
                parseInt(stockInput.value),
                categoryInput.value
            );

            saveProductToLocalstorage(product);
            newRow(product);
            $('#btn-create-exit').click();
            toastr.options.positionClass = 'toast-top-right';
            toastr.success('Producto agregado ' +newId + ' exitosamente');

        };
        reader.readAsDataURL(selectedFile);   
    }
}

function editProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    let fileInput = form.querySelector('input[type="file"]');

    let selectedFile = fileInput.files[0];

    if (validateAll()) {
        if (selectedFile) {
            const reader = new FileReader();
    
            reader.onload = function (e) {
                
                let editedProducts = products.map((obj)=> {
                    if (obj.code == id) {
                        obj.image = e.target.result;
                        obj.names = nameInput.value;
                        obj.description = descriptionInput.value;
                        obj.price = parseFloat(priceInput.value);
                        obj.stock = parseInt(stockInput.value);
                        obj.category = categoryInput.value;
                    }
                    return obj;
                })
                
                //edit to local storage
                editProductToLocalstorage(editedProducts);
                // exit modal
                $('#btn-create-exit').click();
    
                //render to table
                products = JSON.parse(localStorage.getItem("products"));
                renderTable(products);
                
                //toast
                toastr.options.positionClass = 'toast-top-right';
                toastr.success('Producto editado ' +id + ' exitosamente');
    
            };
            reader.readAsDataURL(selectedFile);
        } else {
    
            let editedProducts = products.map((obj)=> {
                if (obj.code == id) {
                    obj.names = nameInput.value;
                    obj.description = descriptionInput.value;
                    obj.price = parseFloat(priceInput.value);
                    obj.stock = parseInt(stockInput.value);
                    obj.category = categoryInput.value;
                }
                return obj;
            })
        
            //edit to local storage
            editProductToLocalstorage(editedProducts);
            $('#btn-create-exit').click();
    
            //render to table
            products = JSON.parse(localStorage.getItem("products"));
            renderTable(products);
    
            //toast
            toastr.options.positionClass = 'toast-top-right';
            toastr.success('Producto editado ' +id + ' exitosamente');
        }
    }
}


window.prepareEdit = function (id) {

    let products = JSON.parse(localStorage.getItem("products"));
    let product = products.find(obj => obj.code == id);
    
    btn.click();
    
    imgPreview.src = product.image;
    imgPreview.style.width = "30%";
    imgPreview.style.height = "30%";

    nameInput.value= product.names;
    descriptionInput.value= product.description;
    priceInput.value= product.price;
    stockInput.value= product.stock;
    categoryInput.value= product.category;

    nameInput.className= "form-control is-valid";
    descriptionInput.className= "form-control is-valid";
    priceInput.className= "form-control  is-valid";
    stockInput.className= "form-control is-valid";
    categoryInput.className= "form-control is-valid";

    isProduct = true;
    uid = id;
}

window.removeProduct = function (id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {

        if (result.isConfirmed) {
            let products = JSON.parse(localStorage.getItem("products"))
            let newProducts = products.filter((obj) => obj.code != id);
            editProductToLocalstorage(newProducts);
            renderTable(newProducts);
            //toast
            toastr.options.positionClass = 'toast-top-right';
            toastr.error('Producto eliminado ' +id + ' exitosamente');
        }
    });
}


function newRow(product) {
    let productTable = document.getElementById("table-body");
    productTable.innerHTML += `<tr>
      <th scope="row">${product.code}</th>
      <td><img src="${product.image}" alt=""></td>
      <td>${product.names}</td>
      <td>${product.description}</td>
      <td>${product.price}</td>
      <td>${product.stock}</td>
      <td>${product.category}</td>
      <td class="text-center"><button class="btn btn-white btn-load border border-1 border-dark my-1" onclick="prepareEdit(${
        product.code
      })"><i class="far fa-edit"></i></button> <button class="btn btn-load border border-1 border-dark my-1" onclick='eraseProduct(${
        product.code
    })'><i class="fas fa-trash"></i></button></td>
    </tr>`;
  }

function saveProductToLocalstorage(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
}

function editProductToLocalstorage(editedProducts) {
    localStorage.setItem('products', JSON.stringify(editedProducts));
}

fileInput.addEventListener('change', function (event) {
    imgPreview.src =  URL.createObjectURL(event.target.files[0]);
    imgPreview.style.width = "30%";
    imgPreview.style.height = "30%";
});

window.LogOut = function() {
    sessionStorage.removeItem("user");
    adminLi.className = "nav-item d-none";
    window.location.replace("/index.html");
};