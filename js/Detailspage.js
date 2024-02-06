let products = JSON.parse(localStorage.getItem("products")) || [];

let names = document.getElementById('names');
let image = document.getElementById('image');
let description = document.getElementById('description');
let price = document.getElementById('price');
let stock = document.getElementById('stock');
let category = document.getElementById('category');


let productId = new URLSearchParams(window.location.search).get('codigo');

function DetailsPage() {
    const prodSelec = arrayProducts.filter((element) => {
        return element.code == productId
    })[0]

    if (!prodSelec) {
        window.location.href = "./adminPage.html"
    }
    title.innerText = prodSelec.name;    
    image.src = prodSelec.image;
    description.innerText = prodSelec.description;
    price.innerText = "$" + prodSelec.price;   
    stock.innerText = "STOCK: " + prodSelec.stock;
    category.innerText = "CATEGORIA: " + prodSelec.category;
}

DetailsPage();
