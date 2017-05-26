import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


@Component({
  selector: 'page-exchanges',
  templateUrl: 'exchanges.html'
})
export class ExchangesPage {
  requests: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, 
              public actionSheetCtrl: ActionSheetController, 
              db: AngularFireDatabase) {
    this.requests = db.list('/sample/requests');
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
            this.requests.push({
              title: data.title,
              description: data.description,
              starttime: d.getTime(),
              duration: 2,
              creator: "user_id(DreamTeam)",
              status: "open"
            });
            // TODO: Add this request to the user's list of requests
          }
        }
      ]
    });
    prompt.present();
  }

  // Shows actions that can be taken to respond to or delete requests
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
            this.requests.update(requestId, {
              description: data.description
            });
          }
        }
      ]
    });
    prompt.present();
  }

  respondToRequest(requestId: string){
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
            this.requests.update(requestId, {
              status: "closed"
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
