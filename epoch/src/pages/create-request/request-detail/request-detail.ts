import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RequestsProvider } from '../../../providers/requests/requests';
import { ExchangesPage } from '../../exchanges/exchanges';

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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public requests: RequestsProvider) {
  	this.title = navParams.get('title'); 
    this.date = navParams.get('date'); 
    this.time = navParams.get('time'); 
    this.duration = navParams.get('duration'); 
    this.address = navParams.get('address'); 
    this.description = navParams.get('description');
  }

  createRequest(){
    
    // If no description was provided, initialize the property as an empty string
    if(this.description == null) {
      this.description = '';
    }

    var data = {
      'title': this.title,
      'date': this.date,
      'time': this.time,
      'duration': this.duration,
      'address': this.address,
      'description': this.description
    }
    var openRequests = this.navParams.get('openRequests');
    this.requests.postOpenRequest(data, openRequests);
    this.navCtrl.push(ExchangesPage);
  }

}
