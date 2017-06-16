import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestLocationPage } from '../request-location/request-location';


@IonicPage()
@Component({
  selector: 'page-request-duration',
  templateUrl: 'request-duration.html',
})
export class RequestDurationPage {
  date;
  time;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  nextPage(){
    this.navParams.data['date'] = this.date;
    this.navParams.data['time'] = this.time;
    this.navCtrl.push(RequestLocationPage, this.navParams);
  }
}
