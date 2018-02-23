import $ from 'jquery';
import * as template from './templates/pageTemplate';
let filmId;
$(document).ready(()=>{
    template.setHeader();
    template.setFooter();
    writePage();
});
/** 
 * Obtiene los datos de la pelicula actual
*/
const getFilm = () =>{
    filmId = localStorage.getItem('selectedFilm');
    let films = JSON.parse(localStorage.getItem('films'));
    return films.results.find(e=>e.id == filmId)
}
/** 
 * Vuelca la informacion de la pelicula en la pagina
*/
const writePage = () =>{
    let film = getFilm();
    let timeTable = getTimeTable();
    $('.poster').find('img').attr('src',`../img/${film.poster}`).attr('alt',`Portada de la película ${film.name}`);
    $('.sinopsis').find('span').text(film.sinopsis);
    $('.trailer').find('iframe').attr('src',film.trailer);
    timeTable.map(e=>{
        e.hours.map(y=>{
            $('<div>').append(
                $(`<span>${y.hour}</span>`)
            ).append(
                $(`<span>${e.room}</span>`)
            ).append(
                $(`<span>Buscar asiento</span>`)
            ).appendTo('.timeTable')
        })
    })
}
const getTimeTable = () =>{
    let cinema = JSON.parse(localStorage.getItem('cinema'));
    let timeTable = [];
    cinema.rooms.map((e,i)=>{
        timeTable.push({
            room:i+1,
            hours:e.timeTable.filter(y=>y.film == filmId)
        })
    });
    return timeTable;
}