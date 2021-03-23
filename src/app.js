document.addEventListener('DOMContentLoaded', () => {
    initializareCart();
    getNrOfProducts();
});


// initializam cosul de cumparaturi cand se incarca site-ul prima oara
function initializareCart(){
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    //verificam la load daca cosul nu exista atunci il initializez
    if(!cart){
        window.localStorage.setItem("cart",JSON.stringify([]));
    }
    
}
// o functie care imi ia nr de produse
export function getNrOfProducts(){
 const cart = JSON.parse(window.localStorage.getItem("cart"));
 let nrProduse = 0;
 cart.forEach((item) =>
    {
        nrProduse += item.cantitate
    })
 document.getElementById("nrOfProducts").innerHTML = nrProduse;
}