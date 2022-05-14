const http = require('http');
const fs = require('fs');
const { text } = require('stream/consumers');

const PUERTO = 9090;

//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => {

  console.log("Petición recibida")
  
  //-- Analizar el recurso
  //-- Construir el objeto url con la url de la solicitud
  const url = new URL(req.url, 'http://' + req.headers['host']);
  console.log(url.pathname);

  //-- Variable para guardar el archivo solicitado
  let archivo = "";

  //-- El archivo solicitado será la página principal
  if (url.pathname == '/') {
     archivo = "Funkastico.html";
  //-- El archivo solicitado comienza a partir del /
  }else if (url.pathname == '/productos'){
      archivo = "tienda.json"
  }else{
      archivo = url.pathname.substring(1);
  }

  //-- Se muestra el archivo solicitado en la consola
  console.log("Archivo: " + archivo);

  //-- Nos quedamos con la extensión del archivo solicitado
  let extension = archivo.split('.')[1];

  //-- Tipo de archivo pedido 
  //-- en función de su extensión
  const tipomime = {
    html : "text/html",
    css : "text/css",
    jpg : "image/jpg",
    png : "image/png",
    ico : "image/x-icon",
    ttf : "font/ttf",
    json : "application/json"
  };

  /* se guarda el tipo de archivo
   en la variable mime y se muestra
   en la consola */
  let mime = tipomime[extension];
  console.log("Tipo mime: " + mime);

  //-- Leemos el archivo del recurso solicitado 
  fs.readFile(archivo, (err,data) => {
    //-- Si se produce un error
    if (err){
      archivo = "error.html";
      contenido = fs.readFileSync(archivo, 'utf-8');
      res.writeHead(400, {'Content-type' : 'text/html'});
      console.log("El archivo solicitado no se puede encontrar");
      res.write(contenido);
      res.end();
    //-- En caso de que no se produzca ningín error
    }else{
      res.writeHead(200, {'Content-type' : mime});
      console.log("Petición correcta, 200 OK");
    }
    //-- Enviar los datos 
    res.write(data);
    res.end();
  })

});

server.listen(PUERTO);

console.log("Servidor listo listo!. Escuchando en puerto: " + PUERTO);
