import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestLocationPage } from '../request-location/request-location';


@IonicPage()
@Component({
  selector: 'page-request-duration',
  templateUrl: 'request-duration.html',
})
export class RequestDurationPage {
  minDate;
  maxDate;
  date;
  time;
  hours;
  minutes;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    var dateObj = new Date();
    var day = dateObj.getDate().toString();
    var month = (dateObj.getMonth() + 1).toString(); // Add 1 because January is treated as 0
    var year = dateObj.getFullYear();

    if(day.length < 2) {
      day = '0' + day;
    } 

    if(month.length < 2) {
      month = '0' + month;
    }

    this.minDate = year + '-' + month + '-' + day;
    this.maxDate = year + 1; 
  }

  nextPage(){

    if(this.date == null || this.time == null || (this.hours == null && this.minutes == null) ) {
      document.getElementById("duration-error").style.display = 'block';
    }
    else {
      document.getElementById("duration-error").style.display = 'none';
      this.navParams.data['date'] = this.date;
      this.navParams.data['time'] = this.time;
      this.navParams.data['hours'] = this.hours;
      this.navParams.data['minutes'] = this.minutes;
      this.navCtrl.push(RequestLocationPage, this.navParams);
    }
  }
}
