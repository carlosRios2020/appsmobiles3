import { Component, OnInit, ViewChild, ReflectiveInjector } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiservicesService } from '../../services/uiservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  loginUser = {
      email: 'Pedro8@123.com',
      password: '123456'
  }

  constructor(private UsuarioService: UsuarioService,
                private navCtrl: NavController,
                private UiservicesService: UiservicesService) { }

  ngOnInit( ) {
    
  }

  ionViewDidEnter(){
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm){
    /*console.log(fLogin.valid);
    console.log(this.loginUser);*/

    if (fLogin.invalid){return;}
    const valido = await this.UsuarioService.login(this.loginUser.email, this.loginUser.password);
    if(valido){
        //navegar al tabs
        this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    }else{
        //mostrar alert
        this.UiservicesService.alertaInformativa('Usuario o Contraseña no son correctos');
    }
  }

  registro(fRegistro: NgForm){
    console.log(fRegistro.valid);
  }

  mostrarLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}
