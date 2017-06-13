import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestLocationPage } from '../request-location/request-location';


@IonicPage()
@Component({
  selector: 'page-request-duration',
  templateUrl: 'request-duration.html',
})
export class RequestDurationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestDurationPage');
  }

  nextPage(){
  	this.navCtrl.push(RequestLocationPage);
  }
}
