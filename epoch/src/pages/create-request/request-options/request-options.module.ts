import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestOptionsPage } from './request-options';

@NgModule({
  declarations: [
    RequestOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestOptionsPage),
  ],
  exports: [
    RequestOptionsPage
  ]
})
export class RequestOptionsPageModule {}
