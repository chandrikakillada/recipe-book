import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5002/api/auth';

  username = new Subject<string>();
  currentUsername = this.username.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/login`,
      credentials
    );
  }

  register(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/register`,
      credentials
    );
  }

  updateUsername(newUsername: string) {
    this.username.next(newUsername);
    console.log('user logged IN with ID', newUsername);
  }
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
}
