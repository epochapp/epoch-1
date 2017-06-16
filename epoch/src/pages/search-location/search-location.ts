import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

declare var google;


@IonicPage()
@Component({
  selector: 'page-search-location',
  templateUrl: 'search-location.html',
})
export class SearchLocationPage {
	autocompleteItems;
	userInput;
	service = new google.maps.places.AutocompleteService();

  constructor(public navCtrl: NavController,
  						public navParams: NavParams,
  						public viewCtrl: ViewController,
  						private zone: NgZone) {
  	this.autocompleteItems = [];
  	this.userInput = {
  		query: ''
  	};
  }

  dismiss() {
  	this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
		this.viewCtrl.dismiss(item);
  }

  updateSearch() {
  	if (this.userInput.query == '') {
  		this.autocompleteItems = [];
  		return;
  	}
  	let me = this;
  	this.service.getPlacePredictions({ input: this.userInput.query, componentRestrictions: {} }, function (predictions, status) {
  		me.autocompleteItems = [];
  		me.zone.run(function () {
  			predictions.forEach(function (prediction) {
  				me.autocompleteItems.push(prediction.description);
  			});
  		});
		});
  }

}
