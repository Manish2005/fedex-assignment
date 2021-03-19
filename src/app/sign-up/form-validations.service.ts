import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationsService {

  constructor() {
  }


  /**
   * Password must contain at least one lowercase and one uppercase letters
   * @param control: Form control to be validated
   */
  containsLowerAndUpper(control: AbstractControl): ValidationErrors | null {
    if (!control.value || control.value.length < 8) {
      return null;
    }

    if (!(/[a-z]/.test(control.value)) || !(/[A-Z]/.test(control.value))) {
      return {containLowerUpper: true};
    }

    return null;
  }

  /**
   * Password must not contain first name or last name
   * @param control: Form control to be validated
   */
  containsName(control: AbstractControl): ValidationErrors | null {
    if (!control.value || control.value.length < 8) {
      return null;
    }

    // check if password contains first name, case insensitive
    const firstNameControl = control.parent.get('firstName');
    if (firstNameControl.value && new RegExp(firstNameControl.value, 'i').test(control.value)) {
      return {containsName: true};
    }

    // check if password contains last name, case insensitive
    const lastNameControl = control.parent.get('lastName');
    if (lastNameControl.value && new RegExp(lastNameControl.value, 'i').test(control.value)) {
      return {containsName: true};
    }

    return null;
  }

  /**
   * Confirm password must match with password value
   * @param currentControl: Confirm password control
   */

  passwordMatch(currentControl: AbstractControl): ValidationErrors | null {
    if (currentControl.value && currentControl.parent.get('password').value !== currentControl.value) {
      return {passwordMismatch: true};
    }
    return null;
  }
}
