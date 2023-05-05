import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterResponse } from '../models/RegisterResponse';
import { Token } from '../models/Token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'https://localhost:7012/api/';

  constructor(private http: HttpClient) {}

  registerUser(data: any) {
    return this.http.post<RegisterResponse>(this.url + 'Auth/Register', data);
  }

  loginUser(data: any) {
    return this.http.post<Token>(this.url + 'Auth/Token', data);
  }
}
