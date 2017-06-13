import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ObjectProvider {

  constructor() {
    console.log('Hello ObjectProvider Provider');
  }
  keys(object: {}) {
    console.log('keys called');
    if (object) {
      this.printObject(object);
    }

    return Object.keys(object);
  }
  printObject(object: {}) {
    var str = JSON.stringify(object);
    console.log(str);
  }

}