import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { error } from 'console';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: any;
  password: any;

  constructor(private authService: AuthService, private router: Router) {}
  login() {
    this.email = this.loginDetails.value.username;
    this.password = this.loginDetails.value.password;
    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        console.log('Login Successful!', credentials.email);
        this.authService.username = credentials.email;
        this.router.navigate(['/home']);
      },
    });
  }

  loginDetails = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
}
