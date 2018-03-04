import $ from 'jquery';
/** 
 * DB con las librerias necesarias
*/
const _libs  = {
    fontAwsome:`<script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>`,
    toastr:`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">`
}
/** 
 * Crea el pie de pagina
*/
export const setFooter = () =>{
    $('<span class="date">Ayoze Martin Hdez - 2018</span>').appendTo('footer');
}
/** 
 * Crea la cabecera
*/
export const setHeader = () => {

    $('<h1>Cines Orotava</h1>').click(e=>{        
        window.location = window.location.href.includes('github')?'/reservasCine/dist/' :'/dist/';
    }).appendTo('header');    
    $('<div>',{class:'social'}).append(
        $('<span>').append(
            $('<i class="fab fa-facebook-square"></i>')
        )
    ).append(
        $('<span>').append(
            $('<i class="fab fa-twitter-square"></i>')
        )
    ).append(
        $('<span>').append(
            $('<i class="fab fa-google-plus-square"></i>')
        )
    ).appendTo('header');
}
/**
 * Importa las librerias necesarias
 * @param {array} libs lista con los nombres de las librerias necesarias
 */
export const setLibs = libs =>{
    libs.map(e=>{
        $(_libs[e]).appendTo('head');
    })
}