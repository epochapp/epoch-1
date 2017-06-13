import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';
//import { KeysPipe } from '../../pipes/keys/keys';
import { RequestDisplayPage } from '../../pages/request-display/request-display';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as Firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { OrganizationProvider } from '../../providers/organization/organization';
import { RequestsProvider } from '../../providers/requests/requests';
import { ObjectProvider } from '../../providers/object/object';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  currentUser: Observable<Firebase.User>;
  currentUserMetadata: FirebaseObjectObservable<any>;
  currentUserOpenRequests: FirebaseListObservable<any[]>;
  currentUserConfirmedRequests: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, 
              public db: AngularFireDatabase, 
              public afAuth: AngularFireAuth,
              public organizationData: OrganizationProvider,
              public requests: RequestsProvider,
              public objectProvider: ObjectProvider) {
    console.log("Constructing about page");

    
    this.currentUser = afAuth.authState;

    var currentUser = Firebase.auth().currentUser;
    this.currentUserMetadata = db.object(organizationData.getOrganization() + '/users/' + currentUser.uid + '/metadata');
    this.currentUserOpenRequests = db.list(organizationData.getOrganization() + '/users/' + currentUser.uid + '/requests-open');
    this.currentUserConfirmedRequests = db.list(organizationData.getOrganization() + '/users/' + currentUser.uid + '/requests-confirmed');


    const orgObservable = organizationData.organization.subscribe( org =>
    {
      var currentUser = Firebase.auth().currentUser;
      console.log("Updating organization on about page: " + org);
      if (org) {
        this.currentUserMetadata = db.object(org + '/users/' + currentUser.uid + '/metadata');
        this.currentUserOpenRequests = db.list(org + '/users/' + currentUser.uid + '/requests-open');
        this.currentUserConfirmedRequests = db.list(org + '/users/' + currentUser.uid + '/requests-confirmed');
      }
    });
  }

  showRequestWithResponses(requestId: string) {
    console.log("Opening detailed request page with responses");
    var requestParameters = {requestId: requestId};
    this.navCtrl.push(RequestDisplayPage, requestParameters);
  }

  logoutUser() {
    this.afAuth.auth.signOut();
    this.navCtrl.popToRoot();
  }
}
