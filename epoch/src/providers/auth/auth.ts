import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';

@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth) {

  }

  signupUser(email: string, password: string): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logoutUser(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }

  resetPassword(email: string): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
}
