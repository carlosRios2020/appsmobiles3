import { Router } from "express";
import {Request, Response } from 'express';
import  bcrypt from 'bcrypt';
import {dB} from '../classes/dBServer';
import Token from '../classes/token';
import { verificaToken } from '../middleware/autenticacion';


const userRoutes = Router();

//login de usuarios
userRoutes.post('/login',  (req: Request, res: Response) => {

    const body = req.body;

    var query = dB.con.query("SELECT * FROM usuario WHERE email = '" + body.email +" '", (err, result) => {
        console.log(err, result);
        if (result.length>0){
         var login = bcrypt.compareSync( body.password,result[0].password)
            
            if (login){

                const  tokenUser = Token.getJwtToken({
                    nombre : req.body.nombre,
                    email : req.body.email,

                });
                res.json({
                    ok: true,
                    token: tokenUser
                });

            } else {
                return res.json({
                    ok: false,
                    mensaje: 'Usuario/Contraseña no son correctos ***'
                });
            }
        }else{
            return res.json({
                ok: false,
                mensaje: 'Usuario/Contraseña no son correctos email no existe'
            });
        }
    
        
        });
        query.on('error', function(err) {
            console.log("[mysql error]",err);
        });
});


//crear usuario
userRoutes.post('/create',  (req: Request, res: Response) => {

        const user = {
            nombre : req.body.nombre,
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password, 10),
        };

        var sql = "INSERT INTO usuario (nombre, email, password) VALUES ('" + user.nombre +"', '" + user.email +"', '"+ user.password+"')";
        
        var query = dB.con.query(sql, (err, result) => {
            console.log(err, result);
            const  tokenUser = Token.getJwtToken({
                nombre : req.body.nombre,
                email : req.body.email,

            });
            return res.json({
                ok: true,
                token: tokenUser
            });
          });
          query.on('error', function(err) {
            console.log("[mysql error]",err);
        });

        
});

userRoutes.post('/update',  (req: any, res: Response) => {
    //verificaToken,
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
    }
    var sql = "UPDATE usuario SET nombre = '" + user.nombre + "' WHERE email = '" + user.email +"'";
    var query = dB.con.query(sql,  (err, result) => {
        console.log(err, result);
        return res.json({
                ok: true,
                usuario: req.usuario
            });

    });
    query.on('error', function(err) {
        console.log("[mysql error]",err);
    });

    
});
userRoutes.post('/delete',  (req: any, res: Response) => {
    //verificaToken,
   
    const user = {
        email: req.body.email,
    }
    var sql = "DELETE from usuario WHERE email = '"+ user.email +"'";
    var query = dB.con.query(sql,  (err, result) => {
        console.log(err, result);
        return res.json({
                ok: true,
                usuario: req.usuario
            });

    });
    query.on('error', function(err) {
        console.log("[mysql error]",err);
    });

    
});

export default userRoutes;