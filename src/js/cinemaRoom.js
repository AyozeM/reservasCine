import $ from 'jquery';
import * as template from './templates/pageTemplate';
import chair from './classes/chair';
import toastr from 'toastr';
let selectedChairs = [];
const zoomSpeed = 25;
$(document).ready(()=>{
    template.setLibs(['toastr','fontAwsome']);
    template.setHeader();
    template.setFooter();
    $('use').click(e=>{
        const tag = $(e.currentTarget);
        tag.hasClass('ocupado')?toastr.error('asiento ocupado'):
        tag.toggleClass('escogido');
    });
    let auxTooltip;
    $('use').hover(e=>{
        const tag = $(e.currentTarget);
        $(`<p class="tooltip" style="top:${e.pageY-50}px; left:${e.pageX-30}px">Fila ${tag.closest('g').data('row')} columna ${tag.data('column')}</p>`).appendTo($('body'));
    },e=>{
        $('.tooltip').remove();
    })
    $('#reserve').click(e=>{
        e.preventDefault();
        let seleccionadas = $('.escogido').length
        if(seleccionadas > 0){
            $('.escogido').each(function(i){
                selectedChairs.push({
                    row:$(this).closest('g').data('row'),
                    column:$(this).data('column')
                });
            });
            localStorage.setItem('reservedChairs',JSON.stringify(selectedChairs));
            $('<span class="spinner"><i class="fas fa-spinner fa-pulse"></i></span>').appendTo('body');
            setTimeout(()=>{
                window.location = window.location.href.replace('cinemaRoom','paimentPage');
            },2000)
        }else{
            toastr.error("Debes seleccionar al menos un asiento");
        }
    });
    $('.controls').find('a').click(e=>{
       e.preventDefault();
       let tag = $('#canvas');
       let coordinates = tag.attr('viewBox').split(' ').map(e => parseInt(e));
       switch(e.currentTarget.id){
        case 'more':
            if(coordinates[2] > 400){
                coordinates[2]-=zoomSpeed;
                coordinates[3]-=zoomSpeed;
            }
            break;
        case 'less':
            if(coordinates[2] < 600){
                coordinates[2]+=zoomSpeed;
                coordinates[3]+=zoomSpeed;
            }
            break;
        case 'right':
            if(coordinates[0] < zoomSpeed * ((600 - coordinates[2]) / zoomSpeed)){
                coordinates[0]+=zoomSpeed;
            } 
            break;
        case 'left':
            if(coordinates[0] > 0){
                coordinates[0]-=zoomSpeed;
            } 
            break;
        case 'down':
            if(coordinates[1] < zoomSpeed * ((600 - coordinates[2]) / zoomSpeed)){
                coordinates[1]+=zoomSpeed;
            } 
            break;
        case 'up':
            if(coordinates[1] > 0){
                coordinates[1]-=zoomSpeed;
            } 
            break;
       }
        tag.attr('viewBox',coordinates.toString().replace(/,/g,' '));
    });
    getRoomInfo();
});

const getRoomInfo = () =>{
    let cinema = JSON.parse(localStorage.getItem('cinema'));
    let roomInfo = JSON.parse(localStorage.getItem('selectedFilm'))
    setBoughtChairs(cinema.rooms[roomInfo.room-1].chairs.selectedChairs.find(e=>e.hour==roomInfo.hour&&e.film==roomInfo.film));
}

const setBoughtChairs = selectedChairs =>{
    if(selectedChairs != undefined){
        selectedChairs.boughtChairs.map(e=>{
            $(document.querySelector('.chairs').children[e.row-1].children[e.column-1]).addClass('ocupado');
        });
    }
}