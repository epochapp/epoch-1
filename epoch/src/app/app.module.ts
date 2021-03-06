import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ExchangesPage } from '../pages/exchanges/exchanges';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RequestDisplayPage } from '../pages/request-display/request-display';
import { RequestOptionsPage } from '../pages/create-request/request-options/request-options';
import { RequestDurationPage } from '../pages/create-request/request-duration/request-duration';
import { RequestLocationPage } from '../pages/create-request/request-location/request-location';
import { SearchLocationPage } from '../pages/create-request/search-location/search-location';
import { RequestDetailPage } from '../pages/create-request/request-detail/request-detail';
import { RequestDescriptionPage } from '../pages/create-request/request-description/request-description';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { firebaseConfig } from '../firebaseConfig.ts';
import { AuthProvider } from '../providers/auth/auth';
import { OrganizationProvider } from '../providers/organization/organization';
import { RequestsProvider } from '../providers/requests/requests';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    ExchangesPage,
    TabsPage,
    LoginPage,
    RequestDisplayPage,
    RequestOptionsPage,
    RequestDurationPage,
    RequestLocationPage,
    SearchLocationPage,
    RequestDetailPage,
    RequestDescriptionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    ExchangesPage,
    TabsPage,
    LoginPage,
    RequestDisplayPage,
    RequestOptionsPage,
    RequestDurationPage,
    RequestLocationPage,
    SearchLocationPage,
    RequestDetailPage,
    RequestDescriptionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    OrganizationProvider,
    RequestsProvider
  ]
})
export class AppModule {}
