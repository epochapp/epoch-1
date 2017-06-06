import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';

import * as Firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  user: Observable<Firebase.User>;

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  logoutUser() {
    this.afAuth.auth.signOut();
    this.navCtrl.popToRoot();
  }
}
