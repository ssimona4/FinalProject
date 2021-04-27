import {http} from './http.js';

// Get Products on DOM load
document.addEventListener('DOMContentLoaded',getProducts);

function getProducts(){
    
    http.get('http://localhost:3000/prajituri')
        .then((data) => {
            console.log(data)
            let output = '';
            data.forEach((prajitura) => {
            output += 
            `<div class="card" >
                <img class="card-img-top" src="${prajitura.img}"/>    
                <h2 class="card-title"> ${prajitura.denumire}</h2>
                <a href="/details?id=${prajitura.id}&type=prajitura" class="btn btn-primary detailsBtn">Detalii</a>
                </div>`
            });
            document.getElementById('output_prajituri').innerHTML = output;
        });
}