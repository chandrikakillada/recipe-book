import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  email: any;
  password: any;
  username: any;
  registerDetails = new FormGroup({
    email: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
    favouriteCuisine: new FormControl(),
  });
  errorMessage: any;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.email = this.registerDetails.value.email;

    this.password = this.registerDetails.value.password;
    const credentials = {
      email: this.email,

      password: this.password,
    };

    console.log(credentials);

    this.authService.register(credentials).subscribe({
      next: (response) => {
        console.log('Registration Successful!', response.token);
        this.authService.saveToken(response.token);
        this.authService.updateUsername(this.email || '');
        this.router.navigate(['/home']);
      },

      error: (err) => {
        if (err.status == 400) {
          this.errorMessage =
            'Uh-Oh, User with same Email-ID exists, Try something else, I know you have got many, ha ha';
        } else {
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      },
    });
  }
}
