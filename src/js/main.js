import $ from 'jquery';
import {getLibrary} from './templates/libraryTemplate';
let cinema,films;

$(document).ready(()=>{
    getLibrary();
    getData();
    writeFilms();
    $('section').on('click','.smallFilm',e=>{
        localStorage.setItem('selectedFilm',$(e.currentTarget).attr('id'));
        $('<span class="spinner"><i class="fas fa-spinner fa-pulse"></i></span>').appendTo('body');
        setTimeout(()=>{
            window.location = `${window.location.href}html/cinemaRoom.html`;
        },1000);
    });
});
const writeFilms = () =>{
    const container = $('section');
    films.results.map(e=>{
        $('<div>',{id:e.id,class:'smallFilm'}).append(
            $('<img>',{src:`img/${e.poster}`,alt:e.name})
        ).append(
            $(`<span>${e.name}</span>`)
        ).appendTo(container);
    });
}

const getData = () =>{
    cinema = JSON.parse(localStorage.getItem("cinema"));
    if(cinema == null){
        cinema = require("./data/cinema.json");
        localStorage.setItem("cinema",JSON.stringify(cinema));
    }
    films = JSON.parse(localStorage.getItem("films"));
    if(films == null){
        films = require("./data/films.json");
        localStorage.setItem("films",JSON.stringify(films));
    }
}