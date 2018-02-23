import $ from 'jquery';
/** 
 * DB con las librerias necesarias
*/
const libs  = {
    fontAwsome:`<script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>`
}
/** 
 * Crea el pie de pagina
*/
export const setFooter = () =>{
    $('<span>Ayoze Martin Hdez - 2018</span>').appendTo('footer');
}
/** 
 * Crea la cabecera
*/
export const setHeader = () => {
    $('<h1>Cines Orotava</h1>').appendTo('header');
}
/**
 * Importa las librerias necesarias
 * @param {array} libs lista con los nombres de las librerias necesarias
 */
export const setLibs = (libs) =>{
    libs.map(e=>{
        $(libs[e]).appendTo('head');
    })
}