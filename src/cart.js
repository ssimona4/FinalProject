import { http } from "./http.js";

// Get  All Products from Cart on DOM load
document.addEventListener("DOMContentLoaded", () => {
  getProductsfromCart();

  document.querySelectorAll(".minusBtn").forEach((item) => {
    item.addEventListener("click", (event) => decreaseQtySubtotal(event));
  });

  document.querySelectorAll(".plusBtn").forEach((item) => {
    item.addEventListener("click", (event) => increaseQtySubTotal(event));
  });
  document.querySelectorAll(".removeBtn").forEach((item) => {
    item.addEventListener("click", (event) => removeFromCart(event));
  });
});

function getProductsfromCart() {
  const cart = JSON.parse(window.localStorage.getItem("cart"));
  let output = "";
  cart.forEach((element, index) => {
    output += ` <tr class="productRow">
				<td><a href="/details?id=${element.id}&type=${element.type}">${element.denumire}</a></td>
				<td>${element.pret}</td>
				<td>  
                <button data-id="${index}_${element.id}" type="button" class="btn minusBtn">-</button>                    
                <input data-id="${index}_${element.id}" value="${element.cantitate}" type="number" class="quantity" name="quantity" min="1">
                <button data-id="${index}_${element.id}" type="button" class="btn plusBtn">+</button> 
                </td>
				<td class="subTotalCell" data-id="${index}_${element.id}">${element.subTotal}</td>
                <td><button data-id="${index}_${element.id}" type="button" class="btn removeBtn">Remove</button> </td>
            </tr>
        `;
  });
  output +=`<div class="totalCmd">Total comanda</div>
            <button class="btn btn-primary cmdBtn">Cumpara</button>`

  document.getElementById("tableProductCart").innerHTML += output;
}

function increaseQtySubTotal(event) {
  // caut unde am dat click exact cu data-id si aduc valoarea lui data-id
  const target = event.target.getAttribute("data-id");
  const targetArray = target.split("_");
  const indexRow = targetArray[0];
  const idProduct = targetArray[1];

  //caut inputu cu acelasi data-id ca si btn de -/+
  const qtyInput = document.querySelector(
    `input.quantity[data-id="${target}"]`
  );
  const qtyCurenta = parseInt(qtyInput.value);
  const qtyUpdated = qtyCurenta + 1;
  qtyInput.value = qtyUpdated;

  //  Recalcularea subtotalului
  const subTotal = document.querySelector(
    `td.subTotalCell[data-id="${target}"]`
  );
  let subTotalCurent = parseInt(subTotal.textContent);
  const cart = JSON.parse(window.localStorage.getItem("cart"));
  cart[indexRow].cantitate = qtyUpdated;

  let subTotalUpdated = subTotalCurent + cart[indexRow].pret;
  subTotal.textContent = subTotalUpdated;
  cart[indexRow].subTotal = subTotalUpdated;

  window.localStorage.setItem("cart", JSON.stringify(cart));
}

function decreaseQtySubtotal(event) {
  // caut unde am dat click exact cu data-id si aduc valoarea lui data-id
  const target = event.target.getAttribute("data-id");
  const targetArray = target.split("_");
  const indexRow = targetArray[0];
  const idProduct = targetArray[1];

  //caut inputu cu acelasi data-id ca si btn de -/+
  const qtyInput = document.querySelector(
    `input.quantity[data-id="${target}"]`
  );
  const qtyCurenta = parseInt(qtyInput.value);
  if (qtyCurenta > 1) {
    const qtyUpdated = qtyCurenta - 1;
    qtyInput.value = qtyUpdated;

    const cart = JSON.parse(window.localStorage.getItem("cart"));
    cart[indexRow].cantitate = qtyUpdated;
    //  Recalcularea subtotalului
    const subTotal = document.querySelector(
      `td.subTotalCell[data-id="${target}"]`
    );
    let subTotalCurent = parseInt(subTotal.textContent);
    let subTotalUpdated = subTotalCurent - cart[indexRow].pret;
    subTotal.textContent = subTotalUpdated;
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }
}

function removeFromCart(event) {
  const target = event.target.getAttribute("data-id");
  const targetArray = target.split("_");
  const indexRow = targetArray[0];
  const idProduct = targetArray[1];
  const cart = JSON.parse(window.localStorage.getItem("cart"));
    cart.splice(indexRow, 1);
  window.localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}
