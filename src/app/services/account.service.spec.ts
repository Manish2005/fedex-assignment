import {TestBed} from '@angular/core/testing';

import {AccountService} from './account.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ISignUpRequest} from '../sign-up/sign-up.model';
import {APP_CONSTANTS} from '../shared/constants';
import {HttpErrorResponse} from '@angular/common/http';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;
  const apiBase = APP_CONSTANTS.apiBase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signUp()', () => {
    it('should perform signup successfully', () => {
      // assume
      const payload: ISignUpRequest = {
        firstName: 'Manish',
        lastName: 'Gharat',
        email: 'manish@gmail.com',
        password: 'Manish@1234'
      };

      // act
      service.signUp(payload).subscribe(res => {
        expect(res).toBeNull();
      });
      const req = httpMock.expectOne(apiBase + '/users');
      req.flush(null);

      // assert
      expect(req.request.method).toEqual('POST');
    });

    it('should throw error when the API call fails', () => {
      // assume
      const payload: ISignUpRequest = {
        firstName: 'Manish',
        lastName: 'Gharat',
        email: 'manish@gmail.com',
        password: 'Manish@1234'
      };

      // act
      service.signUp(payload).subscribe(res => {
        // not executed
      }, (err: HttpErrorResponse) => {
        expect(err.status).toEqual(404);
      });
      const req = httpMock.expectOne(apiBase + '/users');
      req.error(null, {status: 404});

      // assert
      expect(req.request.method).toEqual('POST');
    });
  });
});
