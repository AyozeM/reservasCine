import $ from 'jquery';
import * as template from './templates/pageTemplate';
import progressBar from './classes/progressBar';
import toastr from 'toastr';

let filmInfo;
$(document).ready(()=>{
    template.setLibs(['fontAwsome','toastr'])
    template.setHeader();
    template.setFooter();
    filmInfo = getFilmInfo();
    let progresoCompra = new progressBar(parts,$('section'));
    progresoCompra.draw(filmInfo);
    $('section').on('click','.btn',e=>{
        e.preventDefault();
        if(!progresoCompra.next()){
            let emails = $('input[type="email"]');
            if($('form').is(':valid')){
                if(emails[0].value != emails[1].value){
                    toastr.error("no coinciden los emails")
                }else{
                    if(saveChairs()){
                        $('<span class="spinner"><i class="fas fa-spinner fa-pulse"></i></span>').appendTo('body');
                        setTimeout(()=>{
                            $('.spinner').remove();
                            toastr.success("Compra realizada con éxito");
                        },1000)
                        setTimeout(()=>{
                            window.location = window.location.href.replace('html/paimentPage.html','');
                        },2000);
                    }
                }
            }else{
                toastr.error("Todos los campos son obligatorios, compruebe su validez")
            }
        }
    });
    $('section').on('focusout','input',e=>{
        const tag = $(e.currentTarget);
        if(!tag.is(':valid') && tag.val().length > 0){
            tag.siblings('.bar').css('color','tomato');
            tag.siblings('label').css({
                top:'-3em',
                'font-size':'.8em',
                opacity: '.75'
            })
        }else{
            tag.siblings('.bar').attr('style','');
            tag.siblings('label').attr('style','');
        }

    });
});

const getFilmInfo = () =>{
    let selectedFilm = JSON.parse(localStorage.getItem('selectedFilm'));
    const films = JSON.parse(localStorage.getItem('films'));
    let aux = films.results.find(e=>e.id==selectedFilm.film);
    let tickets = JSON.parse(localStorage.getItem('reservedChairs'));
    selectedFilm.img = `/dist/img/${aux.poster}`;
    selectedFilm.price = aux.price;
    selectedFilm.filmName = aux.name;
    selectedFilm.tickets = tickets;
    return selectedFilm;
}
const parts = [
    {
        name:'Detalles de la compra',
        method:data =>{
            const classTitles = 'title'
            return $('<div>',{class:'details wrapper'}).append(
                $('<img>',{src:data.img})
            ).append(
                $('<div>',{class:'details'}).append(
                    $(`<span class="${classTitles}">Película</span>`)
                ).append(
                    $(`<span>${data.filmName}</span>`)
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
                    $(`<span>${data.price}€</span>`)
                ).append(
                    $(`<span class="${classTitles}">Numero de entradas</span>`)
                ).append(
                    $(`<span>${data.tickets.length}</span>`)
                ).append(
                    $(`<span class="${classTitles}">Precio total</span>`)
                ).append(
                    $(`<span>${(data.tickets.length*data.price)}€</span>`)
                )
            ).append(
                $(`<a href="#" class="btn">Continuar</a>`)
                
            )
            
        }
    },
    {
        name:'Formulario de pago',
        method:() =>
        $('<div>',{class:'form wrapper'}).append(
            $('<form>').append(
                $('<p>').append(
                    $('<h1>Rellena tus datos para formalizar la compra</h1>')
                )
            ).append(
                $('<p>').append(
                    $('<input>',{type:'email',id:'email',required:'required'})
                ).append(
                    $('<i>',{class:'bar'})
                ).append(
                    $('<label for="email">Escribe tu email</label>')                    
                )
            ).append(
                $('<p>').append(
                    $('<input>',{type:'email',id:'confirmEmail',required:'required'})
                ).append(
                    $('<i>',{class:'bar'})
                ).append(
                    $('<label for="confirmEmail">Repite tu email</label>')                    
                )
            ).append(
                $('<p>').append(
                    $('<input>',{type:'text',id:'creditCard',required:'required',pattern:'^\\d{16,19}$'})
                ).append(
                    $('<i>',{class:'bar'})
                ).append(
                    $('<label for="creditCard">Tarjeta de credito</label>')                    
                )
            ).append(
                $('<p>').append(
                    $('<a href="#" class="btn">Confirmar compra</button>')
                )
            )
        )
    }
]

const saveChairs = () =>{
    let cinema = JSON.parse(localStorage.getItem('cinema'));
    let aux = cinema.rooms[filmInfo.room-1].chairs.selectedChairs;
    let i = aux.findIndex(e=> e.film == filmInfo.film && e.hour == filmInfo.hour);

    i == -1
    ? 
    aux.push({
        film:filmInfo.film,
        hour:filmInfo.hour,
        boughtChairs:filmInfo.tickets
    }) 
    :aux[i].boughtChairs = aux[i].boughtChairs.concat(filmInfo.tickets)
    ;
    
    localStorage.setItem('cinema',JSON.stringify(cinema))
    return true;
}