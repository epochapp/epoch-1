import { FormControl } from '@angular/forms';

export class TelValidator {

  static isValid(control: FormControl) {
    // Telephone number regular expression 
    /* Matches the following:
        1234567890
        123-456-7890
        (123) 456-7890
        123 456 7890
        123.456.7890
        +91 (123) 456-7890 
    Source: https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number*/

    const telValidationRegEx = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(control.value);

    if (telValidationRegEx) {
      return null;
    }

    return {
      "invalidTel": true
    };
  }
}