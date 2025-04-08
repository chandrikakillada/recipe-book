import { Component } from '@angular/core';
import { SampleServiceService } from '../sample-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  searchTerm: any;
  errorMessage: any;
  isLoading: boolean | undefined;

  constructor(private service: SampleServiceService) {}
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
