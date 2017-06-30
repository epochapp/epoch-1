import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
         LoadingController, Loading, AlertController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { TelValidator } from '../../validators/tel'

import { AuthProvider } from '../../providers/auth/auth';

import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public authData: AuthProvider,
              public formBuilder: FormBuilder, 
              public alertCtrl: AlertController, 
              public loadingCtrl: LoadingController) {
                
      this.signupForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        organization: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        tel: ['', Validators.compose([Validators.required, TelValidator.isValid])]
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser(){
    if (!this.signupForm.valid){
      // TODO: Throw an error
      console.log(this.signupForm.value);
    } else {

      var userData = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        name: this.signupForm.value.name, 
        organization: this.signupForm.value.organization,
        tel: this.signupForm.value.tel
      }

      this.authData.signupUser(userData)
        .then(() => {
        // Success!
        this.navCtrl.setRoot(TabsPage);
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

}
