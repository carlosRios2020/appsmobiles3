import Server from "./classes/server";
//import dB from "./classes/dBServer";
import userRoutes from "./routes/usuario";
import bodyParser from 'body-parser';
import mysql from 'mysql';
import { dB } from "./classes/dBServer";

import cors from 'cors';

const server = new Server()


server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json());


server.app.use( cors({ origin: true, credentials: true}));
//rutas de la app

server.app.use('/user', userRoutes);



// Conectar DB
//const dB = new dBServer()
dB.start();

dB.con.query("SELECT * FROM usuario", function (err, result) {
    if (err) throw err;
    console.log(result[0].nombre);
  });
//levantar express


server.start( () =>
{
    console.log(`Servidor corriendo en puerto ${ server.port}`);
}

);