import { http } from './http.js';
// am importat functia care imi actualizaeaza nr de produse din app
import { getNrOfProducts } from './app.js';



// verifica daca am parametrii de query in link si ii punem in const urlParams
const urlParams = new URLSearchParams(window.location.search);
// cauta parametru id si pune in const itemId 
const itemID = urlParams.get('id');
// cauta parametru itype si pune in const type 
const type = urlParams.get('type');


// Get Selected Product on DOM load
document.addEventListener('DOMContentLoaded', getProductDetails);

// afisarea produsului selectat
function getProductDetails() {

    if (type === 'tort') {
        getTort(itemID);
    }
    else if (type === "prajitura") {
        getPrajitura(itemID);
    }

}
// functiile care aduc produsul selectat in functie de id si type(tort sau prajitura)
function getTort(itemID) {
    http.get('http://localhost:3000/torturi/' + itemID)
        .then((tort) => {
            let output = '';
            output +=
                `<div class="detailsCard">
                <img class="card-img-top" src="${tort.img}" />
                <div class="contentDetails">
                    <h2 class="card-title" id="productTitle"> ${tort.denumire}</h2>
                    <p class="card-text">${tort.descriere}</p>
                    <p class="subtil">Vă rugăm să comandați cu minim 2 zile lucrătoare în avans. Ne rezervăm dreptul de a refuza comanda, dacă nu o putem onora – în acest caz, veți fi contactat telefonic în cel mai scurt timp.</p>
                    <select id="pricesDropdown">
                    <option value="" color:darkgrey;>Alege o optiune:</option>
                    `;
            Array.from(tort.prices).forEach((pret) => {
                output += `<option value=${pret.value}> ${pret.label}</option>`
            })
            output += `</select>
                <button type="button" id="comandaBtn" class="btn btn-primary cmdBtn">Comanda</button>
            </div>`
            document.getElementById('output_details').innerHTML += output;
            addEventComandaBtn();
        });
}

function getPrajitura(itemID) {
    http.get('http://localhost:3000/prajituri/' + itemID)
        .then((prajitura) => {
            console.log(prajitura);
            let output = '';
            output +=
                `<div class="detailsCard">
                    <img class="card-img-top" src="${prajitura.img}" />
                    <div class="contentDetails">
                        <h2 class="card-title" id="productTitle"> ${prajitura.denumire}</h2>
                        <p class="card-text">${prajitura.descriere}</p>
                        <p class="subtil">Vă rugăm să comandați cu minim 2 zile lucrătoare în avans. Ne rezervăm dreptul de a refuza comanda, dacă nu o putem onora – în acest caz, veți fi contactat telefonic în cel mai scurt timp.</p>
                        <p><span id="pretPrajitura">${prajitura.prices}</span>Ron/kg</p>
                        <button type="button" id="comandaBtn" class="btn btn-primary cmdBtn">Comanda</button>
                    </div>
                </div>`
            document.getElementById('output_details').innerHTML += output;
            addEventComandaBtn();
        });
}
// addEvent pe comandaBtn care la click
// - apeleaza o functie care care ruleaza 2 functii
// 1. functia are 3 scopuri(creeaza obiect, adauga obiectul in cart in array, afiseaza banner)
// 2. functia actualizeaza nr de produse din Cart

function addEventComandaBtn() {
    const comandaBtn = document.getElementById('comandaBtn');
    comandaBtn.addEventListener('click', () => {
        addToCart();
        getNrOfProducts();
    })
}
//  functia care afiseaza mesajul ptr adaugarea unui produs cu succes
function showSuccesMessage() {
    let addMessage = document.createElement('p');
    addMessage.classList.add('addBanner');
    addMessage.innerHTML =
        'Produsul a fost adaugat in cosul tau de cumparaturi!';

    const outputProdus = document.getElementById("output_details");
    const container = document.getElementById('detailsContainer');
    container.insertBefore(addMessage, outputProdus);

    setTimeout(() => {
        addMessage.remove();
    }, 3000);
}
// functia care afiseaza eroare in cazul in care nu este selectata o optiune
function showErrorMessage() {
    let addMessage = document.createElement('p');
    addMessage.classList.add('addBanner');
    addMessage.innerHTML =
        'Selecteaza o optiune!';

    const outputProdus = document.getElementById("output_details");
    const container = document.getElementById('detailsContainer');
    container.insertBefore(addMessage, outputProdus);

    setTimeout(() => {
        addMessage.remove();
    }, 3000);
}


function addToCart() {
    let pret;
    if (type === 'tort') {
        const select = document.getElementById('pricesDropdown');
        pret = parseInt(select.value);
    }
    else if (type === "prajitura") {
        const pretPrajituraElem = document.getElementById('pretPrajitura');
        pret = parseInt(pretPrajituraElem.textContent);
    }
// 1.creeaza obiect produs selectat

    if (pret) {
        const denumireProdus = document.getElementById('productTitle');
        const typeProdus = type;
        const produs = {
            id: parseInt(itemID),
            pret: pret,
            cantitate: 1,
            type: typeProdus,
            denumire: denumireProdus.textContent,
            subTotal: 1 * pret
        }
        // 2.adauga produs in array de cart in local storage
        const cart = JSON.parse(window.localStorage.getItem("cart"));
        cart.push(produs);
        window.localStorage.setItem("cart", JSON.stringify(cart));
        
        showSuccesMessage();

    }
    else {
        showErrorMessage();
    }
}