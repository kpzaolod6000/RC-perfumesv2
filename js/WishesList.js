let Wishes =  JSON.parse(localStorage.getItem("productsWishList")) || [];
const container = document.querySelector(".Wishes");


function ListFav(Wishes) {
    console.log(Wishes);
    let html = "";
    Wishes.forEach(product => {

        html += `<div class="col-lg-3 col-md-6 col-sm-12 m-3 my-sm-6 p-0 mx-auto card product-card" >`+
        `  <img src="${product.image}" class="card-img-top img-fluid" style="width: 100%; height: 350px;" alt="image.jpeg">`+
        `  <div class="card-body product-card-body d-flex flex-column" style="height: 500px;">`+
        `    <h5 class="card-title text-center title-text" style="height: 90px; overflow: hidden; text-overflow: ellipsis;">${product.names}</h5>`+
        `    <p class="card-text text-center d-none d-sm-block" style="height: 240px; overflow: hidden; text-overflow: ellipsis;">${product.description}</p>`+
        `    <h4 class="text-center">$${product.price}</h4>`+
        `    <a href="../../src/pages/detailPages.html?id=${product.code}" class="btn mx-auto buy-button ">Más detalles</a>`+
        `  </div>`+
        `</div>`;
    });
    return html;
}
container.innerHTML = ListFav(Wishes);