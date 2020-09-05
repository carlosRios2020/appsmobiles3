import mysql from 'mysql';
import bcrypt from 'bcrypt';


class dBServer{
    
    public con : mysql.Connection = mysql.createConnection({
        host: "localhost",
        user: "admin",
        password: "admin",
        database: "prueba"
        });

    constructor(){
       
    }

    public start( ): void{

                this.con.connect(function(err) {
                    if (err) {
                      console.error('error connecting: ' + err.stack);
                      return;
                    }
                  
                    console.log('connected');
                  });
        
    }

    public compararPassword(passworddB: string, passwordUser: string): boolean {

        if (bcrypt.compareSync( passworddB, passwordUser)){
            console.log(passworddB);
            console.log(passwordUser);
            return true;
        } else {
            return false;
        }
    
    }
  
}

export const dB = new dBServer();