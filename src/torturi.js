import {http} from './http.js';

// Get Products on DOM load
document.addEventListener('DOMContentLoaded',getProducts);

function getProducts(){
    
    http.get('http://localhost:3000/torturi/')
    .then((data) => {
        console.log(data);
        let output = '';
        data.forEach((tort) => {
            output += `<div class="card">
            <img class="card-img-top" src="${tort.img}"/>
            <h2 class="card-title"> ${tort.denumire}</h2>
            <a href="/details?id=${tort.id}&type=tort" class="btn btn-primary detailsBtn">Detalii</a></div>`
        });
        document.getElementById('output_torturi').innerHTML = output;
    });
}