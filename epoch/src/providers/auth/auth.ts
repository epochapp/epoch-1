import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';

@Injectable()
export class AuthProvider {


  constructor(public afAuth: AngularFireAuth) {
    
  }

  signupUser(user: { email: string,
                     password: string, 
                     name: string, 
                     organization: string, 
                     tel: string }): firebase.Promise<any> {
    
    var result = this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then( () => {
      // Create user database reference
      firebase.database().ref(user.organization + '/users/' + this.afAuth.auth.currentUser.uid)
        .set( { 
          metadata : {
            displayName: user.name,
            org: user.organization,
            tel: user.tel,
            credits: 10
          }
        });
      firebase.database().ref('user-org-map/' + this.afAuth.auth.currentUser.uid)
        .set( user.organization );
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
