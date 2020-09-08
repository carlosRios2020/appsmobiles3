"use strict";
exports.__esModule = true;
var server_1 = require("./classes/server");
//import dB from "./classes/dBServer";
var usuario_1 = require("./routes/usuario");
var body_parser_1 = require("body-parser");
var dBServer_1 = require("./classes/dBServer");
var cors_1 = require("cors");
var server = new server_1["default"]();
server.app.use(body_parser_1["default"].urlencoded({ extended: true }));
server.app.use(body_parser_1["default"].json());
server.app.use(cors_1["default"]({ origin: true, credentials: true }));
//rutas de la app
server.app.use('/user', usuario_1["default"]);
// Conectar DB
//const dB = new dBServer()
dBServer_1.dB.start();
dBServer_1.dB.con.query("SELECT * FROM usuario", function (err, result) {
    if (err)
        throw err;
    console.log(result[0].nombre);
});
//levantar express
server.start(function () {
    console.log("Servidor corriendo en puerto " + server.port);
});
