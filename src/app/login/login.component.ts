import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
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
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: any;
  password: any;
  likedRecipes: any[] | undefined;

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
        this.authService.updateUsername(credentials.email);
        this.router.navigate(['/home']);
      },
    });
  }

  loginDetails = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
}
