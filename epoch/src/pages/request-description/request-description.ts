import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestDetailPage } from '../request-detail/request-detail';


@IonicPage()
@Component({
  selector: 'page-request-description',
  templateUrl: 'request-description.html',
})
export class RequestDescriptionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  nextPage(){
  	this.navCtrl.push(RequestDetailPage);
  }

}
