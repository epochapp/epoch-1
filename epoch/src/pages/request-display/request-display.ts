import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';
import * as Firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { RequestsProvider } from '../../providers/requests/requests';


@IonicPage()
@Component({
  selector: 'page-request-display',
  templateUrl: 'request-display.html',
})
export class RequestDisplayPage {

  request: FirebaseObjectObservable<any>;
  openResponses: FirebaseListObservable<any[]>;
  organization: string;
  requestId: string;

  constructor(public navCtrl: NavController, 
              public params: NavParams,
              public db: AngularFireDatabase,
              public requests: RequestsProvider) {
    
    this.requestId = this.params.get('requestId');
    console.log('Request ID: ' + this.requestId);

    var currentUser = Firebase.auth().currentUser;

    if (currentUser != null) { // Get organization
    var ref  = Firebase.database().ref("/user-org-map/" + currentUser.uid);
    var orgRetrieved : string;
    ref.once("value", function(org) {
      orgRetrieved = org.val();
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }).then( () => {
      this.organization = orgRetrieved;
      this.request = db.object(this.organization + '/requests-open/' + this.requestId);
      this.openResponses = db.list(this.organization + '/requests-open/' + this.requestId + '/responses-open/')
    });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestDisplayPage');
  }

  confirmResponseToOpenRequest( responseId ) {
    this.requests.confirmResponseToOpenRequest(responseId, this.requestId);
    this.navCtrl.pop();
  }

}
