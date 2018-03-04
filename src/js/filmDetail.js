import $ from 'jquery';
import * as template from './templates/pageTemplate';
let filmId;
$(document).ready(()=>{
    template.setLibs(['fontAwsome'])
    template.setHeader();
    template.setFooter();
    writePage();
    $('iframe').css('height',$('iframe').width()/4)
    $('.timeTable').on('click','.btnFindChair',e=>{
        let aux = {
            film:filmId,
            hour:$(e.currentTarget).prev().prev().text(),
            room:parseInt($(e.currentTarget).prev().text())
        }
        localStorage.setItem('selectedFilm',JSON.stringify(aux));
        $('<span class="spinner"><i class="fas fa-spinner fa-pulse"></i></span>').appendTo('body');
        setTimeout(()=>{
            window.location = window.location.href.replace('filmDetail','cinemaRoom');
        },2000)
    });
});
/** 
 * Obtiene los datos de la pelicula actual
*/
const getFilm = () =>{
    filmId = JSON.parse(localStorage.getItem('selectedFilm')).film;
    let films = JSON.parse(localStorage.getItem('films'));
    return films.results.find(e=>e.id == filmId)
}
/** 
 * Vuelca la informacion de la pelicula en la pagina
*/
const writePage = () =>{
    let film = getFilm();
    let timeTable = getTimeTable();
    $('.poster').find('img').attr('src',`${window.location.href.includes('github')? '/reservasCine/dist/': '/dist/'}/img/${film.poster}`).attr('alt',`Portada de la película ${film.name}`);
    $('.sinopsis').find('span').text(film.sinopsis);
    $('.trailer').find('iframe').attr('src',film.trailer);
    timeTable.map(e=>{
        e.hours.map(y=>{
            $('<div>').append(
                $(`<span>${y.hour}</span>`)
            ).append(
                $(`<span>${e.room}</span>`)
            ).append(
                $(`<span class="btnFindChair" data-room="${e.room}" data-hour="${y.hour}">Elige tu asiento</span>`)
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