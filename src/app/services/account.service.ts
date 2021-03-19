import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ISignUpRequest} from '../sign-up/sign-up.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private basePath = 'https://demo-api.now.sh';

  constructor(private http: HttpClient) {
  }

  signUp(payload: ISignUpRequest): Observable<any> {
    return this.http.post(`${this.basePath}/users`, payload);
  }
}
