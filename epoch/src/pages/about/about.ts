import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as Firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { OrganizationProvider } from '../../providers/organization/organization';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  currentUser: Observable<Firebase.User>;
  currentUserMetadata: FirebaseObjectObservable<any>;
  currentUserRequests: FirebaseListObservable<any[]>;
  currentUserResponses: FirebaseListObservable<any[]>;


  constructor(public navCtrl: NavController, 
              public db: AngularFireDatabase, 
              public afAuth: AngularFireAuth,
              public organizationData: OrganizationProvider) {
    
    this.currentUser = afAuth.authState;

    var currentUser = Firebase.auth().currentUser;
    this.currentUserMetadata = db.object(organizationData.getOrganization() + '/users/' + currentUser.uid + '/metadata');
    this.currentUserRequests = db.list(organizationData.getOrganization() + '/users/' + currentUser.uid + '/requests-open');
    this.currentUserResponses = db.list(organizationData.getOrganization() + '/users/' + currentUser.uid + '/responses-open');


    const orgObservable = organizationData.organization.subscribe( org =>
    {
      var currentUser = Firebase.auth().currentUser;
      console.log("Updating organization on about page: " + org);
      if (org) {
        this.currentUserMetadata = db.object(org + '/users/' + currentUser.uid + '/metadata');
        this.currentUserRequests = db.list(org + '/users/' + currentUser.uid + '/requests-open');
        this.currentUserResponses = db.list(org + '/users/' + currentUser.uid + '/responses-open');
      }
    });
    

  }

  logoutUser() {
    this.afAuth.auth.signOut();
    this.navCtrl.popToRoot();
  }
}
