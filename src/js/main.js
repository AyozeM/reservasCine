import $ from 'jquery';
import *  as template from'./templates/pageTemplate';
let cinema,films;

$(document).ready(()=>{
    template.setLibs(['fontAwsome']);
    template.setHeader();
    template.setFooter();
    getData();
    writeFilms();
    $('section').on('click','.smallFilm',e=>{
        localStorage.setItem('selectedFilm',JSON.stringify({film:$(e.currentTarget).attr('id')}));
        $('<span class="spinner"><i class="fas fa-spinner fa-pulse"></i></span>').appendTo('body');
        setTimeout(()=>{
            window.location = `${window.location.href}html/filmDetail.html`;
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