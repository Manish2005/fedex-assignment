import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

import {ERROR_MESSAGES} from './sign-up.constants';
import {FormValidationsService} from '../services/form-validations.service';
import {ISignUpFormData, ISignUpRequest} from './sign-up.model';
import {AccountService} from '../services/account.service';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnDestroy {
  /**
   *   Font awesome check circle icon displayed with signup success message
   */
  faCheckCircle = faCheckCircle;

  /**
   * Validation error messages used by the form
   */
  errorMessages = ERROR_MESSAGES;

  /**
   * Store subscriptions to easily unsubscribe before navigating away, to avoid memory leaks
   */
  private subscriptions: any = {};

  /**
   * Reactive Form instance
   */
  signUpForm: FormGroup;

  /**
   * Flag set to true when signup successfully. Used as trigger to show success message
   */
  signUpCompleted = false;

  /**
   * Flag set to true while submitting the form data. User as trigger to disable the submit button
   */
  submitting = false;

  /**
   * Flag indicating if the previous submit returner API error
   */
  error = false;

  constructor(
    private fb: FormBuilder,
    private formValidationsService: FormValidationsService,
    private accountService: AccountService
  ) {
    this.initForm();
  }

  /**
   * Initialize the form
   */
  private initForm(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email // https://angular.io/api/forms/Validators#email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.formValidationsService.containsLowerAndUpper,
        this.formValidationsService.containsName
      ]],
      confirmPassword: ['', [
        Validators.required,
        this.formValidationsService.passwordMatch
      ]]
    });

    // update password validations when first name value changes
    this.subscriptions.firstNameField = this.signUpForm.get('firstName').valueChanges.subscribe(() => {
      this.signUpForm.get('password').updateValueAndValidity();
    });

    // update password validations when last name value changes
    this.subscriptions.laststNameField = this.signUpForm.get('lastName').valueChanges.subscribe(() => {
      this.signUpForm.get('password').updateValueAndValidity();
    });

    // update confirm password validations when password value changes
    this.subscriptions.passwordField = this.signUpForm.get('password').valueChanges.subscribe(() => {
      this.signUpForm.get('confirmPassword').updateValueAndValidity();
    });
  }

  /**
   * Handle form submission
   */
  onFormSubmit(): void {
    // clear existing error message, if needed
    this.error = false;

    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      this.signUpForm.updateValueAndValidity();
      return;
    }

    const {firstName, lastName, email, password} = (this.signUpForm.value as ISignUpFormData);
    const payload: ISignUpRequest = {firstName, lastName, email, password};
    this.submitting = true;
    this.accountService.signUp(payload)
      .pipe(take(1))
      .subscribe(() => {
        this.submitting = false;
        this.signUpCompleted = true;
        this.initForm();
      }, () => {
        this.submitting = false;
        this.error = true;
      });
  }

  /**
   * Unsubscribe from Subscriptions when destroying component
   */
  ngOnDestroy(): void {
    Object.keys(this.subscriptions).forEach(key => {
      (this.subscriptions[key] as Subscription).unsubscribe();
    });
  }

  /**
   * Show empty form
   */
  resetSignUp(): void {
    this.signUpCompleted = false;
  }
}
