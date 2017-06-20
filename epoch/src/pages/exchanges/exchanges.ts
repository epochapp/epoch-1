import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import {AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';
import * as Firebase from 'firebase/app';

import { OrganizationProvider } from '../../providers/organization/organization';
import { RequestsProvider } from '../../providers/requests/requests';

import { RequestOptionsPage } from '../request-options/request-options'; 

@Component({
  selector: 'page-exchanges',
  templateUrl: 'exchanges.html'
})
export class ExchangesPage {
  openRequests: FirebaseListObservable<any[]>;
  currentUserMetadata: FirebaseObjectObservable<any>;
  currentUserOpenRequests: FirebaseListObservable<any[]>;

  organization: string;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, 
              public actionSheetCtrl: ActionSheetController,
              public db: AngularFireDatabase,
              public organizationData: OrganizationProvider,
              public requests: RequestsProvider) {
    console.log("Exchanges page is being constructed");
     
    // var currentUser = Firebase.auth().currentUser;
    // if (currentUser != null) {
    //   this.openRequests = db.list(organizationData.getOrganization() + '/users/' + currentUser.uid + '/requests-open');
    // }

    // const orgObservable = organizationData.organization.subscribe( org =>
    // {
    //   var currentUser = Firebase.auth().currentUser;
    //   console.log("Updating organization on about page: " + org);
    //   if (org) {
    //     this.openRequests = db.list(org + '/users/' + currentUser.uid + '/requests-open');
    //   }
    // });

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
        this.openRequests = db.list(orgRetrieved + '/requests-open');
        this.currentUserMetadata = db.object(this.organization + '/users/' + currentUser.uid + '/metadata');
        this.currentUserOpenRequests = db.list(this.organization + '/users/' + currentUser.uid + '/requests-open');
      });
     }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // Generates a new request entity in Firebase using user input
  addRequest() {
    this.navCtrl.push(RequestOptionsPage, { 'openRequests': this.openRequests } );
  }

  // Shows actions that can be taken to respond to or delete openRequests
  showOptions(requestId, requestDescription, requestCreatorId) {
    if (requestCreatorId == Firebase.auth().currentUser.uid) {
      // Show creator options
      let actionSheet = this.actionSheetCtrl.create({
        title: 'What do you want to do?',
        buttons: [
          {
            text: 'Update Description',
            handler: () => {
              this.updateRequest(requestId, requestDescription);
            }
          },{
            text: 'Delete Request',
            role: 'destructive',
            handler: () => {
              this.removeRequest(requestId);
            }
          },{
            text: 'Back',
            role: 'cancel',
            handler: () => {
              console.log('Back clicked');
            }
          }
        ]
      });
      actionSheet.present();
    } else {
      // show non-creator options
      let actionSheet = this.actionSheetCtrl.create({
        title: 'What do you want to do?',
        buttons: [
          {
            text: 'Offer Assistance',
            handler: () => {
              this.respondToRequest(requestId, requestCreatorId);
            }
          },{
            text: 'Back',
            role: 'cancel',
            handler: () => {
              console.log('Back clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }
  }

  removeRequest(requestId: string){
    this.requests.remove(requestId);
  }

  updateRequest(requestId: string, requestDescription: string){
    let prompt = this.alertCtrl.create({
      title: 'Request Description',
      message: "Update the description for this request",
      inputs: [
        {
          name: 'description',
          placeholder: 'Description',
          value: requestDescription
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.openRequests.update(requestId, {
              description: data.description
            });
          }
        }
      ]
    });
    prompt.present();
  }

  respondToRequest(requestId: string, requestCreatorId: string) {
    let prompt = this.alertCtrl.create({
      title: 'Respond to Request',
      message: "Will you offer to fulfill this request?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            this.requests.submitResponseToOpenRequest(requestId, requestCreatorId);
          }
        }
      ]
    });
    prompt.present();
  }
}

function moveFirebaseRecord(oldRef, newRef, oldUserRef) {    
     oldRef.once('value', function(snapshot)  {
          newRef.set( snapshot.val(), function(error) {
               if( !error ) {  oldRef.remove(); oldUserRef.remove(); }
               else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
          });
     });
}