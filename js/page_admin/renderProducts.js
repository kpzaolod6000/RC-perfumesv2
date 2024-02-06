
export function renderTable(productslist) {
    let productTable = document.getElementById("table-body");
    productTable.innerHTML= "";
    let itemText = "";
    productslist.forEach(product => {
        itemText += `<tr>
        <th scope="row">${product.code}</th>
        <td><img src="${product.image}" alt="image.jpg"></td>
        <td>${product.names}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td>${product.stock}</td>
        <td>${product.category}</td>
        <td class="text-center"><button class="btn btn-white border btn-load border-1 border-dark my-1" onclick="prepareEdit(${
            product.code
        })"><i class="far fa-edit"></i></button> <button class="btn btn-load-delete border border-1 border-dark my-1" onclick='removeProduct(${
            product.code
        })'><i class="fas fa-trash"></i></button></td>
        </tr>`;
    });

    productTable.innerHTML = itemText;
}