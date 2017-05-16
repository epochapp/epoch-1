import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { ExchangesPage } from '../exchanges/exchanges';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ExchangesPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  } 
}
