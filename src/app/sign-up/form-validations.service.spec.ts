import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormValidationsService} from './form-validations.service';
import {FormControl, FormGroup} from '@angular/forms';

describe('FormValidationsService', () => {
  let service: FormValidationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FormValidationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('containsLowerAndUpper()', () => {
    let control: FormControl;

    beforeEach(() => {
      control = new FormControl('');
    });

    it('should return null if control value is less than 8 characters', () => {
      // assume
      control.setValue('Man');

      // act
      const error = service.containsLowerAndUpper(control);

      // assert
      expect(error).toBeNull();
    });

    it('should return error if control value does not contain at least one uppercase characters', () => {
      // assume
      control.setValue('manish@1234');

      // act
      const error = service.containsLowerAndUpper(control);

      // assert
      expect(error?.containLowerUpper).toEqual(true);
    });

    it('should return error if control value does not contain at least one lowercase characters', () => {
      // assume
      control.setValue('MANISH@1234');

      // act
      const error = service.containsLowerAndUpper(control);

      // assert
      expect(error?.containLowerUpper).toEqual(true);
    });
  });

  describe('passwordMatch()', () => {
    it('should return null if the passwords match', () => {
      // assume
      const form = new FormGroup({
        password: new FormControl('Manish@1234'),
        confirmPassword: new FormControl('Manish@1234')
      });

      // act
      const error = service.passwordMatch(form.get('confirmPassword'));

      // assert
      expect(error).toBeNull();
    });

    it(`should return error if the passwords don't match`, () => {
      // assume
      const form = new FormGroup({
        password: new FormControl('Manish@1234'),
        confirmPassword: new FormControl('Manish@12345')
      });

      // act
      const error = service.passwordMatch(form.get('confirmPassword'));

      // assert
      expect(error?.passwordMismatch).toEqual(true);
    });
  });

  describe('containsName()', () => {
    let form: FormGroup;

    beforeEach(() => {
      form = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        password: new FormControl(''),
      });
    });

    it('should return null if control value is less than 8 characters', () => {
      // assume
      const control = form.get('password');

      // act
      const error = service.containsName(control);

      // assert
      expect(error).toBeNull();
    });

    it('should return error if control value contains firstName', () => {
      // assume
      const control = form.get('password');
      form.patchValue({
        firstName: 'Manish',
        password: 'Manish@1234'
      });

      // act
      const error = service.containsName(control);

      // assert
      expect(error?.containsName).toEqual(true);
    });

    it('should return error if control value contains lastName', () => {
      // assume
      const control = form.get('password');
      form.patchValue({
        firstName: 'Test',
        lastName: 'Manish',
        password: 'Manish@1234'
      });

      // act
      const error = service.containsName(control);

      // assert
      expect(error?.containsName).toEqual(true);
    });

    it('should return null if control value does not contain firstName or lastName', () => {
      // assume
      const control = form.get('password');
      form.patchValue({
        firstName: 'Test',
        lastName: 'Manish',
        password: 'Password@1234'
      });

      // act
      const error = service.containsName(control);

      // assert
      expect(error).toBeNull();
    });
  });
});
