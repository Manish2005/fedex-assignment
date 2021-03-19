import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ISignUpRequest} from '../sign-up/sign-up.model';
import {APP_CONSTANTS} from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private basePath = APP_CONSTANTS.apiBase;

  constructor(private http: HttpClient) {
  }

  signUp(payload: ISignUpRequest): Observable<any> {
    return this.http.post(`${this.basePath}/users`, payload);
  }
}
