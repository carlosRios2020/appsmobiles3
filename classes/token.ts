
import jwt from 'jsonwebtoken';


export default class Token {

    private static seed: string = 'seed-de-prueba';
    private static caducidad: string = '30d';

    contructor(){}


    static getJwtToken( payload: any): string{

        return jwt.sign({
            usuario: payload
        }, this.seed, { expiresIn: this.caducidad });
    }

    static comprobarToken (userToken: string){

        const decoded= jwt.verify(userToken, this.seed);
            console.log(decoded);
        return new Promise( (resolve, reject)  => {
            jwt.verify( userToken, this.seed, (err, decoded) =>{

                if(err){
                    reject();
                } else{
                    resolve(decoded);
                }
            })
        });
    }

    

}