import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestLocationPage } from './request-location';

@NgModule({
  declarations: [
    RequestLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestLocationPage),
  ],
  exports: [
    RequestLocationPage
  ]
})
export class RequestLocationPageModule {}
