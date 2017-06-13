import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestDetailPage } from '../request-detail/request-detail';

declare var google;

@IonicPage()
@Component({
  selector: 'page-request-location',
  templateUrl: 'request-location.html',
})
export class RequestLocationPage {

	@ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.loadMap();
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

  getItems(ev: any) {

  }

  nextPage(){
  	this.navCtrl.push(RequestDetailPage);
  }

}
