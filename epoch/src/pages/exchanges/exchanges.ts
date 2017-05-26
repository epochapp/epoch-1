import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


@Component({
  selector: 'page-exchanges',
  templateUrl: 'exchanges.html'
})
export class ExchangesPage {
  requests: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, db: AngularFireDatabase) {
    this.requests = db.list('/sample/requests');
  }

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

  showOptions(requestId) {
    // TODO: Direct to request-detail page
  }

}
