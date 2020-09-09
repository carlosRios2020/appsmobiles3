import express from 'express'

export default class Server{

    public app : express.Application;
    public port : number = 3706;

    constructor(){

        this.app = express();
    }

    start( callback: any){

        this.app.listen( this.port, callback);
    }
}