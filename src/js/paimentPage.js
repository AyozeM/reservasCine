import $ from 'jquery';
import * as template from './templates/pageTemplate';
import progressBar from './classes/progressBar';
$(document).ready(()=>{
    template.setHeader();
    template.setFooter();
    let x = new progressBar(parts,$('section'));
    x.draw(getFilmInfo());
    $('section').on('click','.btn',e=>{
        e.preventDefault();
        x.next();
    })
});

const getFilmInfo = () =>{
    let selectedFilm = JSON.parse(localStorage.getItem('selectedFilm'));
    const films = JSON.parse(localStorage.getItem('films'));
    let aux = films.results.find(e=>e.id==selectedFilm.film);
    let tickets = JSON.parse(localStorage.getItem('reservedChairs'));
    selectedFilm.img = `/dist/img/${aux.poster}`;
    selectedFilm.price = aux.price;
    selectedFilm.film = aux.name;
    selectedFilm.tickets = tickets.length;
    return selectedFilm;
}
const parts = [
    {
        name:'Detalles de la compra',
        method:data =>{
            const classTitles = 'title'
            return $('<div>',{class:'detailsWrapper'}).append(
                $('<img>',{src:data.img})
            ).append(
                $('<div>',{class:'details'}).append(
                    $(`<span class="${classTitles}">Película</span>`)
                ).append(
                    $(`<span>${data.film}</span>`)
                ).append(
                    $(`<span class="${classTitles}">Hora</span>`)
                ).append(
                    $(`<span>${data.hour}</span>`)
                ).append(
                    $(`<span class="${classTitles}">Sala</span>`)
                ).append(
                    $(`<span>${data.room}</span>`)
                ).append(
                    $(`<span class="${classTitles}">Precio Unidad</span>`)
                ).append(
                    $(`<span>${data.price}</span>`)
                ).append(
                    $(`<span class="${classTitles}">Numero de entradas</span>`)
                ).append(
                    $(`<span>${data.tickets}</span>`)
                )
            ).append(
                $('<div>',{class:'btnBox'}).append(
                    $(`<a href="#" class="btn">Continuar</a>`)
                )
            )
            
        }
    },
    {
        name:'Formulario de pago',
        method:() =>
        $('<div>',{class:'formWrapper'}).append(
            $('<form>').append(
                $('<input>',{type:'email',id:'email'})
            ).append(
                $('<label for="email">Escribe tu email</label>')
            )
        ).append(
            $('<p>').append(
                $('<input>',{type:'email',id:'confirmEmail'})
            ).append(
                $('<label for="conformEmail">Repite tu email</label>')
            )
        ).append(
            $('<p>').append(
                $('<input>',{type:'text',id:'creditCard'})
            ).append(
                $('<label for="creditCard">Tarjeta de credito</label>')
            )
        ).append(
            $('<a href="#" class="btn">Confirmar compra</button>')
        )
    }
]