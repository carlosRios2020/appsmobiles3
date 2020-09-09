"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bcrypt_1 = __importDefault(require("bcrypt"));
var dBServer_1 = require("../classes/dBServer");
var token_1 = __importDefault(require("../classes/token"));
var userRoutes = express_1.Router();
//login de usuarios
userRoutes.post('/login', function (req, res) {
    var body = req.body;
    var query = dBServer_1.dB.con.query("SELECT * FROM usuario WHERE email = '" + body.email + " '", function (err, result) {
        console.log(err, result);
        if (result.length > 0) {
            var login = bcrypt_1.default.compareSync(body.password, result[0].password);
            if (login) {
                var tokenUser = token_1.default.getJwtToken({
                    nombre: result[0].nombre,
                    email: result[0].email,
                });
                res.json({
                    ok: true,
                    token: tokenUser
                });
            }
            else {
                return res.json({
                    ok: false,
                    mensaje: 'Usuario/Contraseña no son correctos ***'
                });
            }
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/Contraseña no son correctos email no existe'
            });
        }
    });
    query.on('error', function (err) {
        console.log("[mysql error]", err);
    });
});
//crear usuario
userRoutes.post('/create', function (req, res) {
    var user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
    };
    var sql = "INSERT INTO usuario (nombre, email, password) VALUES ('" + user.nombre + "', '" + user.email + "', '" + user.password + "')";
    var query = dBServer_1.dB.con.query(sql, function (err, result) {
        console.log(err, result);
        var tokenUser = token_1.default.getJwtToken({
            nombre: req.body.nombre,
            email: req.body.email,
        });
        return res.json({
            ok: true,
            token: tokenUser
        });
    });
    query.on('error', function (err) {
        console.log("[mysql error]", err);
    });
});
userRoutes.post('/update', function (req, res) {
    //verificaToken,
    var user = {
        nombre: req.body.nombre,
        email: req.body.email,
    };
    var sql = "UPDATE usuario SET nombre = '" + user.nombre + "' WHERE email = '" + user.email + "'";
    var query = dBServer_1.dB.con.query(sql, function (err, result) {
        console.log(err, result);
        return res.json({
            ok: true,
            usuario: req.usuario
        });
    });
    query.on('error', function (err) {
        console.log("[mysql error]", err);
    });
});
userRoutes.post('/delete', function (req, res) {
    //verificaToken,
    var user = {
        email: req.body.email,
    };
    var sql = "DELETE from usuario WHERE email = '" + user.email + "'";
    var query = dBServer_1.dB.con.query(sql, function (err, result) {
        console.log(err, result);
        return res.json({
            ok: true,
            usuario: req.usuario
        });
    });
    query.on('error', function (err) {
        console.log("[mysql error]", err);
    });
});
exports.default = userRoutes;
