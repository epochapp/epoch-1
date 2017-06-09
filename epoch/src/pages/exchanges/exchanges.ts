import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import {AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';
import * as Firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { OrganizationProvider } from '../../providers/organization/organization';


@Component({
  selector: 'page-exchanges',
  templateUrl: 'exchanges.html'
})
export class ExchangesPage {
  openRequests: FirebaseListObservable<any[]>;
  currentUserMetadata: FirebaseObjectObservable<any>;

  organization: string;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, 
              public actionSheetCtrl: ActionSheetController,
              public db: AngularFireDatabase,
              public organizationData: OrganizationProvider) {
     
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
        this.currentUserMetadata = db.object(organizationData.getOrganization() + '/users/' + currentUser.uid + '/metadata');
      });
     }
     
  
  }

  // Generates a new request entity in Firebase using user input
  addRequest() {
    var d = new Date();
    let prompt = this.alertCtrl.create({
      title: 'Request Name',
      message: "Enter the title of your new request",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'description',
          placeholder: 'Request description'
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
            var currentUser = Firebase.auth().currentUser;
            var creatorUid, creatorName: String;
            if (currentUser != null) {
              creatorUid = currentUser.uid;
              var userMetadataRef = Firebase.database().ref(this.organization + "/users/"+ creatorUid + "/metadata/displayName");
              userMetadataRef.once('value', function(snapshot)  {
                creatorName = snapshot.val();
              }).then( () => {
                this.openRequests.push({
                  title: data.title,
                  description: data.description,
                  starttime: d.getTime(),
                  duration: 2,
                  creatorUid: creatorUid,
                  creatorName: creatorName
                });
              });
            } else {
              console.log("Failed to create request - couldn't access current user.")
              return;
            }
           
            // TODO: Add this request to the user's list of openRequests
          }
        }
      ]
    });
    prompt.present();
  }

  // Shows actions that can be taken to respond to or delete openRequests
  showOptions(requestId, requestDescription) {
    // TODO: Direct to request-detail page
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Offer Assistance',
          handler: () => {
            this.respondToRequest(requestId);
          }
        },{
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
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  removeRequest(requestId: string){
    this.openRequests.remove(requestId);
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

  respondToRequest(requestId: string) {
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
            var requestOldRef = Firebase.database().ref(this.organization + "/requests-open/" + requestId);
            var requestNewRef = Firebase.database().ref(this.organization + "/requests-confirmed/" + requestId);
            moveFirebaseRecord(requestOldRef, requestNewRef);
            // TODO: Add this request to the responders 'responses'
          }
        }
      ]
    });
    prompt.present();
  }
}

function moveFirebaseRecord(oldRef, newRef) {    
     oldRef.once('value', function(snapshot)  {
          newRef.set( snapshot.val(), function(error) {
               if( !error ) {  oldRef.remove(); }
               else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
          });
     });
}