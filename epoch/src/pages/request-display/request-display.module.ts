import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestDisplayPage } from './request-display';

@NgModule({
  declarations: [
    RequestDisplayPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestDisplayPage),
  ],
  exports: [
    RequestDisplayPage
  ]
})
export class RequestDisplayPageModule {}
