import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerDetails = new FormGroup({
    emailId: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
    favouriteCuisine: new FormControl(),
  });

  register() {
    throw new Error('Method not implemented.');
  }
}
