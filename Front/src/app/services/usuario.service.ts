import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Storage } from '@ionic/storage';
import { resolve, Resolver } from 'dns';
import { promise } from 'protractor';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;

  constructor(private http: HttpClient,
              private storage: Storage) { }


  login (email: string, password: string){

      const data = {email, password};

      return new Promise( resolve => {
      this.http.post('http://localhost:3706/user/login',data)
              .subscribe(resp =>{
                console.log(resp);

                if (resp['ok']){
                  this.guardarToken(resp['token']);
                  resolve(true);
                }else{
                  this.token = null;
                  this.storage.clear();
                  resolve(false);
                }
              })
      });
      
  }

  async guardarToken(token: string){
      this.token = token;
      await this.storage.set('token', token);
  }

  create(datos){

    console.log(datos);

    return this.http.post("http://localhost:3706/user/create", datos)
    .subscribe(resp =>{
      console.log(resp);
      if (resp['ok']){
        alert("insersion exitosa");
      }else{
        alert("Algo salio mal revise los datos");
      }
    })
  } 
}

