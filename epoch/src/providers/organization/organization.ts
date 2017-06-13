import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import * as Firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class OrganizationProvider {

  organization: Observable<string>;

  constructor( public afAuth: AngularFireAuth ) {
    this.organization = Observable.of("");
    const organizationObserver = afAuth.authState.subscribe( user => {
      if (user) {
        var ref = Firebase.database().ref("/user-org-map/" + user.uid);
        var retrievedOrg : string;
        ref.once("value", function(org) {
          retrievedOrg = org.val();
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        }).then( () => {
          this.organization = Observable.of(retrievedOrg);
        });
      } else {
        this.organization = Observable.of("");
      }
    });
  }

  getOrganization() : string {
    var user = Firebase.auth().currentUser;
    if (user) {
        var ref = Firebase.database().ref("/user-org-map/" + user.uid);
        var retrievedOrg : string;
        ref.once("value", function(org) {
          retrievedOrg = org.val();
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        }).then( () => {
          return retrievedOrg;
        });
      } else {
        return "";
      }
  }
}