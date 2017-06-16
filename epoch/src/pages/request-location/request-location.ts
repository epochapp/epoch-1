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
  location;
  marker;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private modalCtrl: ModalController) {
    this.location = {
      address: ''
    };
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
    let latLng = this.geocoder.geocode({'address': this.location.address}, function(results, status) {
      
      if (status === 'OK') {
        if (results[0]) {
          
          me.map.panTo(results[0].geometry.location);
          
          var marker = new google.maps.Marker({
            setMap: me.map,
            animation: google.maps.Animation.DROP,
            position: me.map.getCenter(),
          });
        }
      }
    });
  }

  showAddressModal () {
    let modal = this.modalCtrl.create(SearchLocationPage);
    let me = this;
    modal.onDidDismiss(data => {
      this.location.address = data;
      this.updateMap();
    });
    modal.present();
  }

  nextPage(){
  	this.navCtrl.push(RequestDescriptionPage);
  }

}
