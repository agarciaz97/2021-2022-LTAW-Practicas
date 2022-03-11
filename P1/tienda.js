const http = require('http');
const fs = rquire('fs');

const PUERTO = 9090;

//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => {

  console.log("Petición recibida")

  let code = 200;
  let code_msg = "OK";
  let page = fs.readFileSync('principal.html', 'utf-8');

  //-- Analizar el recurso
  //-- Construir el objeto url con la url de la solicitud
  const url = new URL(req.url, 'http://' + req.headers['host']);
  console.log(url.pathname);

  //-- Cualquier recurso que no sea la página principal
  //-- genera un error
  if (url.pathname != '/') {
      code = 404;
      code_msg = "Not Found";
      page = fs.readFileSync('error.html', 'utf-8');
  }

  //-- Generar la respusta en función de las variables
  //-- code, code_msg y page
  res.statusCode = code;
  res.statusMessage = code_msg;
  res.setHeader('Content-Type','text/html');
  res.write(page);
  res.end();
});

server.listen(PUERTO);

console.log("Servidor listo listo!. Escuchando en puerto: " + PUERTO);