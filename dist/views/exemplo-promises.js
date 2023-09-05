"use strict";
let numero = 10;
const usuario = 'tiago-academia-do-programador';
console.time('TesteAsync');
console.time('TesteSincrono');
const request = fetch(`https://api.github.com/users/${usuario}`, {
    method: 'GET'
});
request
    .then(res => res.json())
    .then(obj => {
    console.log(obj);
    console.timeEnd('TesteAsync');
});
console.timeEnd('TesteSincrono');
