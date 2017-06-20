import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestDurationPage } from '../request-duration/request-duration';

@IonicPage()
@Component({
  selector: 'page-request-options',
  templateUrl: 'request-options.html',
})
export class RequestOptionsPage {
  selectedOption;
	requestOptions;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
    this.requestOptions = [ 
      {title: 'Board Games'}, 
      {title: 'Child Minding'}, 
      {title: 'Cooking Lessons'}, 
      {title: 'Cultural Exchange'}, 
      {title: 'Explore the Community'}, 
      {title: 'Language Exchange'}, 
      {title: 'Learn Local Transporation'}, 
      {title: 'Medical Interpretation'}, 
      {title: 'Medical Transportation'}   
    ];
  }

  nextPage(){
    
    if(this.selectedOption == null) {
      document.getElementById("option-error").style.display = 'block';
    }
    else {
      document.getElementById("option-error").style.display = 'none';
      this.navParams.data['title'] = this.selectedOption;
      this.navCtrl.push(RequestDurationPage, this.navParams);
    }
  }

}
