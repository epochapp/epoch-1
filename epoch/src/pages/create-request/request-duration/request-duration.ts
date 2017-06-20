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
  duration;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  nextPage(){

    if(this.date == null || this.time == null || this.duration == null) {
      document.getElementById("duration-error").style.display = 'block';
    }
    else {
      document.getElementById("duration-error").style.display = 'none';
      this.navParams.data['date'] = this.date;
      this.navParams.data['time'] = this.time;
      this.navParams.data['duration'] = this.duration;
      this.navCtrl.push(RequestLocationPage, this.navParams);
    }
  }
}
