import { http } from "./http.js";

// Get Products on DOM load
document.addEventListener("DOMContentLoaded", () => {
  getProductsAsTable();
});

export function getProductsAsTable() {
  http.get("http://localhost:3000/torturi/").then((data) => {
    let output = "";
    data.forEach((tort, index) => {
      output += `<tr>
        <td><img class="imgtable" src="${tort.img}"/></td>
				<td><a href="/details?id=${tort.id}&type=tort">${tort.denumire}</a></td> 
        <td>`;

      Array.from(tort.prices).forEach((pret) => {
        output += `<p class="preturi">${pret.value} Ron</p>`;
      });
      output += `</td> 
      <td><button data-id="${index}_${tort.id}" data-type="tort" type="button" class="btn btn-primary delBtn">Sterge</button></td>
      </tr>`;
    });
    document.getElementById("tableProducts").innerHTML += output;
    addEventDelBtn();
  });
  http.get("http://localhost:3000/prajituri/").then((data) => {
    let output = "";
    data.forEach((prajitura, index) => {
      output += `<tr>
                <td><img class="imgtable" src="${prajitura.img}"/></td>
				<td><a href="/details?id=${prajitura.id}&type=prajitura">${prajitura.denumire}</a></td>
				<td>${prajitura.prices}</td>
        <td><button data-id="${index}_${prajitura.id}" data-type="prajitura" type="button" class="btn btn-primary delBtn">Sterge</button></td>
	      </tr>`;
    });
    document.getElementById("tableProducts").innerHTML += output;
    addEventDelBtn();
  });
}
function addEventDelBtn() {
  document.querySelectorAll(".delBtn").forEach((item) => {
    item.addEventListener("click", (event) => deleteProd(event));
  });
}

function deleteProd(event) {
  const target = event.target.getAttribute("data-id");
  const targetArray = target.split("_");
  const indexRow = targetArray[0];
  const idProduct = targetArray[1];
  const type = event.target.getAttribute("data-type");
  if (type === "tort") {
    http.delete(`http://localhost:3000/torturi/${idProduct}`);
    window.location.reload();
  } else if (type === "prajitura") {
    http.delete(`http://localhost:3000/prajituri/${idProduct}`);
    window.location.reload();
  }
}
