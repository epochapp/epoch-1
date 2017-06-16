import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestDescriptionPage } from './request-description';

@NgModule({
  declarations: [
    RequestDescriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestDescriptionPage),
  ],
  exports: [
    RequestDescriptionPage
  ]
})
export class RequestDescriptionPageModule {}
