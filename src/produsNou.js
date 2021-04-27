import { http } from "./http.js";
import { getProductsAsTable } from "./admin.js";
import { showErrorMessage } from "./details.js";

const form = document.getElementById("addNewProd");
form.onsubmit = createProdusNou;

const select = document.querySelector('select[name="type"]');
select.addEventListener("change", sortiment);



document.querySelector('[for="pret_prajitura"]').style.visibility = "hidden";
document.querySelector('input[name="pret_prajitura"]').style.visibility ="hidden";
document.querySelector('[for="pret_tort"]').style.visibility = "hidden";
document.querySelector('input[name="pret_tort"]').style.visibility = "hidden";
document.querySelector('[for="gramaj_tort"]').style.visibility = "hidden";
document.querySelector('input[name="gramaj_tort"]').style.visibility = "hidden";

function sortiment() {
  let type = document.querySelector('select[name="type"]').value;
  if (type === "prajitura") {
    document.querySelector('input[name="pret_prajitura"]').style.visibility ="visible";
    document.querySelector('[for="pret_prajitura"]').style.visibility ="visible";
    document.querySelector('[for="pret_tort"]').style.visibility = "hidden";
    document.querySelector('input[name="pret_tort"]').style.visibility ="hidden";
    document.querySelector('[for="gramaj_tort"]').style.visibility = "hidden";
    document.querySelector('input[name="gramaj_tort"]').style.visibility ="hidden";
  } else if (type === "tort") {
    document.querySelector('[for="pret_tort"]').style.visibility = "visible";
    document.querySelector('input[name="pret_tort"]').style.visibility ="visible";
    document.querySelector('[for="gramaj_tort"]').style.visibility = "visible";
    document.querySelector('input[name="gramaj_tort"]').style.visibility ="visible";
    document.querySelector('[for="pret_prajitura"]').style.visibility ="hidden";
    document.querySelector('input[name="pret_prajitura"]').style.visibility ="hidden";
  }
}

function createProdusNou() {
  let type = document.querySelector('select[name="type"]').value;
  if (type === "tort") {
    createTort();
  } else if (type === "prajitura") {
    createPrajitura();
  }
  
}

function createTort() {
  const img = document.querySelector('input[name="img"]').value;
  const denumire = document.querySelector('input[name="denumire"]').value;
  const descriere = document.querySelector('input[name="descriere"]').value;
  const gramaj_tort = document.querySelector('input[name="gramaj_tort"]').value;
  const pret_tort = document.querySelector('input[name="pret_tort"]').value;
  const item = {
    img: img,
    denumire: denumire,
    descriere: descriere,
    prices: [
      {
        label: `${gramaj_tort} - ${pret_tort} Ron`,
        value: parseInt(pret_tort),
      },
    ],
  };
  http.post("http://localhost:3000/torturi/", item)
  .then(()=>{
    window.location.href = "/admin"
  })
}

function createPrajitura() {
  const img = document.querySelector('input[name="img"]').value;
  const denumire = document.querySelector('input[name="denumire"]').value;
  const descriere = document.querySelector('input[name="descriere"]').value;
  const pret = document.querySelector('input[name="pret_prajitura"]').value;
  const item = {
    img: img,
    denumire: denumire,
    descriere: descriere,
    prices: pret,
  };
    http.post("http://localhost:3000/prajituri/", item)
    .then(()=>{
      window.location.href = "/admin"
    })
}


