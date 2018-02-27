import $ from 'jquery';
import * as template from './templates/pageTemplate';
import chair from './classes/chair';
let selectedChairs = [];
$(document).ready(()=>{
    template.setHeader();
    template.setFooter();
    $('use').click(e=>{
        const tag = $(e.currentTarget);
        tag.hasClass('ocupado')?alert('asiento ocupado'):
        tag.toggleClass('escogido');
    })
    $('#reserve').click(e=>{
        e.preventDefault();
        let x = $('.escogido');
        $('.escogido').each(function(i){
            selectedChairs.push({
                row:$(this).closest('g').data('row'),
                column:$(this).data('column')
            });
        });
        localStorage.setItem('reservedChairs',JSON.stringify(selectedChairs));

        window.location = window.location.href.replace('cinemaRoom','paimentPage');
    });
    getRoomInfo();
});

const getRoomInfo = () =>{
    let cinema = JSON.parse(localStorage.getItem('cinema'));
    let roomInfo = JSON.parse(localStorage.getItem('selectedFilm'))
    setBoughtChairs(cinema.rooms[roomInfo.room-1].chairs.selectedChairs.find(e=>e.hour==roomInfo.hour&&e.film==roomInfo.film).boughtChairs);
}

const setBoughtChairs = boughtChairs =>{
    boughtChairs.map(e=>{
        $(document.querySelector('.chairs').children[e.row-1].children[e.column-1]).addClass('ocupado');
    });
}