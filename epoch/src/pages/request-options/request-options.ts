import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestDurationPage } from '../request-duration/request-duration';

@IonicPage()
@Component({
  selector: 'page-request-options',
  templateUrl: 'request-options.html',
})
export class RequestOptionsPage {

	public requestOptions;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
    this.requestOptions = [
      {title: 'Language Exchange'},
      {title: 'Medical Interpretation'},
      {title: 'Medical Transportation'},
      {title: 'Child Minding'}
    ];
  }

  nextPage(){
    this.navCtrl.push(RequestDurationPage);
  }

}
