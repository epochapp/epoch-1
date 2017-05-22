import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


@Component({
  selector: 'page-exchanges',
  templateUrl: 'exchanges.html'
})
export class ExchangesPage {
  requests: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, db: AngularFireDatabase) {
    this.requests = db.list('/sample/requests');
  }

}
