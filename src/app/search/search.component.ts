import { Component } from '@angular/core';
import { SampleServiceService } from '../sample-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchTerm: string = '';
  recipes: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private service: SampleServiceService) {
    console.log('Service:', service);
  }

  getSearch() {
    if (!this.searchTerm.trim()) {
      this.errorMessage = 'Please enter a search term.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    console.log('Search Term:', this.searchTerm);
    this.service.searchRecipes(this.searchTerm).subscribe({
      next: (data) => {
        this.recipes = data.recipes || [];
        this.isLoading = false;
        console.log('Recipes:', this.recipes);

        if (this.recipes.length === 0) {
          this.errorMessage = 'No recipes found.';
        }
      },
      error: (err) => {
        console.error('Error fetching recipes:', err);
        this.errorMessage = 'Failed to fetch recipes. Please try again later.';
        this.isLoading = false;
      },
    });
  }
}
