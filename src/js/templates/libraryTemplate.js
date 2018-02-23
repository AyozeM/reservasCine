import $ from 'jquery';
const fontAwsome = `<script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>`;
export const getLibrary = ()=>{
    $(fontAwsome).appendTo('head');
}