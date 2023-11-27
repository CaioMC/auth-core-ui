import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  postLogin(data: any): Observable<any> {
    return this.httpClient.post(environment.urlAuth + '/titan/auth/core/api/auth/sign-in', data)
  }

  postCadastro(data: any): Observable<any> {
    return this.httpClient.post(environment.urlAuth + '/titan/auth/core/api/auth/sign-up', data)
  }

}
