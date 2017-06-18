import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-request-detail',
  templateUrl: 'request-detail.html',
})
export class RequestDetailPage {
	title;
	date;
	time;
	duration;
	address;
	description;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.title = navParams.get('title');
  	this.date = navParams.get('date');
  	this.time = navParams.get('time');
  	this.duration = navParams.get('duration');
  	this.address = navParams.get('address');
  	this.description = navParams.get('description');
  }
}
