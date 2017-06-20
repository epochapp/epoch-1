import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestDetailPage } from '../request-detail/request-detail';


@IonicPage()
@Component({
  selector: 'page-request-description',
  templateUrl: 'request-description.html',
})
export class RequestDescriptionPage {
	description;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  nextPage(){
  	this.navParams.data['description'] = this.description;
  	this.navCtrl.push(RequestDetailPage, this.navParams);
  }

}
