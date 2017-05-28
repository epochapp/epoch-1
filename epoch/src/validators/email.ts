import { FormControl } from '@angular/forms';

export class EmailValidator {

  static isValid(control: FormControl) {
    // Email regular expression from emailregex.com
    const emailValidationRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);

    if (emailValidationRegEx) {
      return null;
    }

    return {
      "invalidEmail": true
    };
  }
}