import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SampleServiceService } from '../sample-service.service';
import { AuthService } from '../services/auth.service';
import { VariableBinding } from '@angular/compiler';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    SearchComponent,
    CommonModule,
    FormsModule,
    RouterOutlet,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  searchTerm: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  username: any;
  loginStatus: boolean = false;

  constructor(
    private service: SampleServiceService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authService.currentUsername.subscribe({
      next: (response) => {
        this.username = response;
        this.loginStatus = true;
      },
    });
    console.log('Username', this.username);
  }

  logout() {
    this.authService.saveToken('');
    this.authService.updateUsername('');
    this.loginStatus = false;
  }

  getSearch() {
    if (!this.searchTerm.trim()) {
      this.errorMessage = 'Please enter a search term.';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';

    this.service.getSearchTerm(this.searchTerm);
  }
}
