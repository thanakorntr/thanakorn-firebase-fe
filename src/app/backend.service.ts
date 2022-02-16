import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  loginUrl = 'https://thanakorn-firebase-be3.appspot.com/_ah/api/skeleton/v1/login?email=';

  constructor(private httpClient: HttpClient) {}

  login(email: string) {
    return this.httpClient.post<any>(this.loginUrl + email, null);
  }
}
