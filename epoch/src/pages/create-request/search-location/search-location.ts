import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Searchbar } from 'ionic-angular';

declare var google;


@IonicPage()
@Component({
  selector: 'page-search-location',
  templateUrl: 'search-location.html',
})
export class SearchLocationPage {
	
  @ViewChild('searchbar') searchbar: Searchbar;
  autocompleteItems;
	query;
	service = new google.maps.places.AutocompleteService();

  constructor(public navCtrl: NavController,
  						public navParams: NavParams,
  						public viewCtrl: ViewController,
  						private zone: NgZone) {
    this.autocompleteItems = [];
  }

  ionViewDidLoad() {
    this.searchbar.setFocus();
  }

  dismiss() {
  	this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
		this.viewCtrl.dismiss(item);
  }

  updateAutocomplete() {
  	if (this.query == '') {
  		this.autocompleteItems = [];
  		return;
  	}
  	let me = this;
  	this.service.getPlacePredictions({ input: this.query, componentRestrictions: {} }, function (predictions, status) {
  		
      if (status === 'OK') {
        me.autocompleteItems = [];
        me.zone.run(function () {
          predictions.forEach(function (prediction) {
            me.autocompleteItems.push(prediction.description);
          });
        });
      }
		});
  }

}
