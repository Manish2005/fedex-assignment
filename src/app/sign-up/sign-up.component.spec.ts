import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {of, throwError} from 'rxjs';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {SignUpComponent} from './sign-up.component';
import {HeaderComponent, CardComponent, InputErrorComponent} from '../shared/components';
import {AccountService} from '../services/account.service';

const formDataValid = {
  firstName: 'Manish',
  lastName: 'Gharat',
  email: 'manish@gmail.com',
  password: 'Password@1234',
  confirmPassword: 'Password@1234'
};

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let accountService: AccountService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [SignUpComponent, HeaderComponent, InputErrorComponent, CardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    accountService = TestBed.inject(AccountService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    // test the form setup
    expect(component.signUpForm).toBeDefined();
  });

  it('should validate password field when firstName changes', () => {
    // assume
    spyOn(component.signUpForm.get('password'), 'updateValueAndValidity');

    // act
    component.signUpForm.get('firstName').setValue('Manish');

    // assert
    expect(component.signUpForm.get('password').updateValueAndValidity).toHaveBeenCalled();
  });

  it('should validate password field when lastName changes', () => {
    // assume
    spyOn(component.signUpForm.get('password'), 'updateValueAndValidity');

    // act
    component.signUpForm.get('lastName').setValue('Gharat');

    // assert
    expect(component.signUpForm.get('password').updateValueAndValidity).toHaveBeenCalled();
  });

  it('should validate confirmPassword field when password changes', () => {
    // assume
    spyOn(component.signUpForm.get('confirmPassword'), 'updateValueAndValidity');

    // act
    component.signUpForm.get('password').setValue('Manish@1234');

    // assert
    expect(component.signUpForm.get('confirmPassword').updateValueAndValidity).toHaveBeenCalled();
  });

  describe('resetSignUp()', () => {
    it('should reset the form for new Signup', () => {
      // assume
      component.signUpCompleted = true;

      // act
      component.resetSignUp();

      // assert
      expect(component.signUpCompleted).toEqual(false);
    });
  });

  describe('onFormSubmit()', () => {
    it('should not submit the form when the form value is invalid', () => {
      // assume
      component.error = true;
      spyOn(component.signUpForm, 'markAllAsTouched');
      spyOn(component.signUpForm, 'updateValueAndValidity');
      spyOn(accountService, 'signUp');

      // act
      component.onFormSubmit();

      // assert
      expect(component.error).toEqual(false);
      expect(component.signUpForm.markAllAsTouched).toHaveBeenCalled();
      expect(component.signUpForm.updateValueAndValidity).toHaveBeenCalled();
      expect(accountService.signUp).not.toHaveBeenCalled();
    });

    it('should make the API call when the form value is valid', fakeAsync(() => {
      // assume
      component.signUpForm.setValue(formDataValid);
      component.signUpCompleted = false;
      spyOn(accountService, 'signUp').and.returnValue(of(null));

      // act
      component.onFormSubmit();

      // assert
      const payload = JSON.parse(JSON.stringify(formDataValid));
      Reflect.deleteProperty(payload, 'confirmPassword');
      expect(accountService.signUp).toHaveBeenCalledWith(payload);

      tick(1000);

      expect(component.signUpCompleted).toEqual(true);
    }));

    it('should handle API error', fakeAsync(() => {
      // assume
      component.signUpForm.setValue(formDataValid);
      spyOn(accountService, 'signUp').and.returnValue(throwError(null));

      // act
      component.onFormSubmit();

      // assert
      const payload = JSON.parse(JSON.stringify(formDataValid));
      Reflect.deleteProperty(payload, 'confirmPassword');
      expect(accountService.signUp).toHaveBeenCalledWith(payload);

      tick(1000);

      expect(component.error).toEqual(true);
    }));
  });
});
