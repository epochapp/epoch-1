import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { RequestDescriptionPage } from '../request-description/request-description';
import { SearchLocationPage } from '../search-location/search-location';

declare var google;


@IonicPage()
@Component({
  selector: 'page-request-location',
  templateUrl: 'request-location.html',
})
export class RequestLocationPage {

	@ViewChild('map') mapElement: ElementRef;
  map: any;
  geocoder: any;
  address;
  marker;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.loadMap();
    this.geocoder = new google.maps.Geocoder();
  }

  loadMap(){
 
    let latLng = new google.maps.LatLng(43.472292, -80.544807);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  updateMap() {
    let me = this;
    let latLng = this.geocoder.geocode({'address': this.address}, function(results, status) {
      
      if (status === 'OK') {
        if (results[0]) {
          
          me.map.panTo(results[0].geometry.location);
          
          var marker = new google.maps.Marker({
            position: results[0].geometry.location,
            animation: google.maps.Animation.DROP,
            map: me.map
          });
        }
      }
    });
  }

  showSearchModal () {
    let modal = this.modalCtrl.create(SearchLocationPage);
    let me = this;
    modal.onDidDismiss(data => {
      this.address = data;
      this.updateMap();
    });
    modal.present();
  }

  nextPage(){
    this.navParams.data['address'] = this.address;
  	this.navCtrl.push(RequestDescriptionPage, this.navParams);
  }

}
