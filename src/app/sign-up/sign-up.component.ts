import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ERROR_MESSAGES} from './sign-up.constants';
import {FormValidationsService} from './form-validations.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnDestroy {

  signUpForm: FormGroup;

  errorMessages = ERROR_MESSAGES;

  private subscriptions: any = {};

  constructor(private fb: FormBuilder, private formValidationsService: FormValidationsService) {
    this.initForm();
  }

  /**
   * Initialize the form
   */
  private initForm(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.formValidationsService.containsLowerAndUpper,
        this.formValidationsService.containsName
      ]],
      confirmPassword: ['', [
        Validators.required,
        this.formValidationsService.passwordMatch.bind(this)
      ]]
    });

    // update password validations when first name value changes
    this.subscriptions.firstNameField = this.signUpForm.get('firstName').valueChanges.subscribe(val => {
      this.signUpForm.get('password').updateValueAndValidity();
    });

    // update password validations when last name value changes
    this.subscriptions.laststNameField = this.signUpForm.get('lastName').valueChanges.subscribe(val => {
      this.signUpForm.get('password').updateValueAndValidity();
    });

    // update confirm password validations when password value changes
    this.subscriptions.passwordField = this.signUpForm.get('password').valueChanges.subscribe(val => {
      this.signUpForm.get('confirmPassword').updateValueAndValidity();
    });
  }

  /**
   * Handle form submission
   */
  onFormSubmit(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      this.signUpForm.updateValueAndValidity();
      return;
    }
  }

  /**
   * Unsubscribe from Subscriptions when destroying component
   */
  ngOnDestroy(): void {
    Object.keys(this.subscriptions).forEach(key => {
      (this.subscriptions[key] as Subscription).unsubscribe();
    });
  }
}
