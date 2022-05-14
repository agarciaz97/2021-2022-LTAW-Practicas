//-- Programa para incrementar en 1 el stock de los productos
//-- del fichero tienda.json

const fs= require('fs');

//-- Nombre del fichero JSON a leer
const FICHERO_JSON = "tienda.json"

//-- Nombre del fichero Json de salida
const FICHERO_JSON_OUT = "tienda.json"

//-- Leer el fichero JSON
const tienda_json = fs.readFileSync(FICHERO_JSON);

//-- Crear la estructura tienda a partir del contenido del fichero
const tienda = JSON.parse(tienda_json);

//-- Seleccionar los productos de la estructura tienda
productos = tienda[0]["Productos"]

//-- Imprimir los productos de la tienda
console.log("productos de la tienda: ");
console.log(productos);

const N = 4;
//-- recorrer los productos y sumarles 1 a la cantidad
for(i = 0; i < N; i++){
    productos[i]["Cantidad"] += 1;
}

console.log("productos incrementados");
console.log(productos);



//-- Convertir la variable a cadena JSON
//-- Convertimos una cadena a JSON con la funcion .stringify
let myJSON = JSON.stringify(tienda);

//-- Guardarla en el fichero destino
fs.writeFileSync(FICHERO_JSON_OUT, myJSON);

console.log("Información guardada en el fichero: " + FICHERO_JSON_OUT);
