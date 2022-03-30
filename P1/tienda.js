const http = require('http');
const fs = require('fs');

const PUERTO = 9090;

//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => {

  console.log("Petición recibida")
  
  //-- Analizar el recurso
  //-- Construir el objeto url con la url de la solicitud
  const url = new URL(req.url, 'http://' + req.headers['host']);
  console.log(url.pathname);

  let recurso = "";
  //-- El recurso será la página principal
  if (url.pathname == '/') {
     recurso = "Funkastico.html";
  }else{
    recurso = url.pathname.substring(1);
  }
  console.log("Recurso: " + recurso);

  //-- Nos quedamos con la extensión del archivo del recurso solicitado
  let extension = recurso.split('.')[1];
  console.log("Extension del archivo: " + extension);

  //-- Tipo de archivo pedido 
  //-- en función de su extensión
  const tipomime = {
    html : "text/html",
    css : "text/css",
    jpg : "image/jpg",
    png : "image/png",
    ico : "image/x-icon",
    ttf : "font/ttf"
  };

  //-- se guarda el tipo de archivo
  //-- en la variable mime
  let mime = tipomime[extension];
  console.log("Tipo mime: " + mime);

  //-- Leemos el archivo del recurso solicitado 
  fs.readFile(recurso, (err,data) => {
    //-- Si se produce un error
    if ((err) || (recurso == 'error.html')){
      res.writeHead(400, {'Content-type' : mime});
      console.log("El archivo solicitado no se puede encontrar");
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
