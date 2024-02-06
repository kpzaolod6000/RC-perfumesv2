let productsList = JSON.parse(localStorage.getItem("products"));
const idP = new URLSearchParams(window.location.search).get('id');


let findProduct = productsList.find((product) => product.code == idP);

if (findProduct) {
    let detailContainer = document.querySelector(".detail-container");
    let html = `<div class="container-fluid text-center">`+
            `  <div class="row">`+
            `   <div class="col-12 col-md-6">`+
            `       <img class="rounded-3" src="${findProduct.image}" alt="${findProduct.names}" width="100%" height="100%">`+
            `   </div>`+
            `    <div class="col-12 col-md-6">` +
            `        <div class="row pt-5">` +
            `            <h2 class="fw-bold">${findProduct.names}</h2>` +
            `        </div>` +
            `        <div class="row py-5">` +
            `            <p >${findProduct.description}</p>` +
            `        </div>                       ` +
            `        <div class="mb-3">` +
            `            <h3 >$ ${findProduct.price}</h3>` +
            `            <button type="button" class="btn btn-success m-2">Comprar</button> ` +
            `        </div>` +
            `    </div>` +
            `   </div>` +
            `   </div>`;
    detailContainer.innerHTML = html;
        
}else{
    alert("No se encontro el id")
    detailContainer.innerHTML = "";
}