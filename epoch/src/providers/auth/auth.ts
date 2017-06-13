import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';

@Injectable()
export class AuthProvider {


  constructor(public afAuth: AngularFireAuth) {
    
  }

  signupUser(email: string, password: string, name: string, organization: string): firebase.Promise<any> {
    var result = this.afAuth.auth.createUserWithEmailAndPassword(email, password).then( () => {
      // Create user database reference
      firebase.database().ref(organization + '/users/' + this.afAuth.auth.currentUser.uid)
        .set( { 
          metadata : {
            displayName: name,
            org: organization,
            credits: 10
          }
        });
      firebase.database().ref('user-org-map/' + this.afAuth.auth.currentUser.uid)
        .set( organization );
    }, (error) => {
      return error;
    })
    return result;
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
