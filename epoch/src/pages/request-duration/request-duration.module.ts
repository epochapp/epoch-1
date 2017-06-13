import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestDurationPage } from './request-duration';

@NgModule({
  declarations: [
    RequestDurationPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestDurationPage),
  ],
  exports: [
    RequestDurationPage
  ]
})
export class RequestDurationPageModule {}
