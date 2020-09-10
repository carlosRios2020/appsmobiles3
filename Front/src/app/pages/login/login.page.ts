import { Component, OnInit, ViewChild, ReflectiveInjector } from '@angular/core';
import { NgForm,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiservicesService } from '../../services/uiservices.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  datos:FormGroup;
  constructor(private formBuilder: FormBuilder, private UsuarioService: UsuarioService,
    private navCtrl: NavController,
    private UiservicesService: UiservicesService) { }
 
  ngOnInit() {
    this.datos = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
      
    });
  }

  @ViewChild('slidePrincipal') slides: IonSlides;

  loginUser = {
      email: 'xxxxx@123.com',
      password: 'xxxxx'
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

  
  registro(){
    //console.log(fRegistro.valid);
    this.UsuarioService.create(this.datos.value);
    if(this.datos.value != undefined){
      this.mostrarLogin();
    }else{
      this.mostrarRegistro();
    }
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
