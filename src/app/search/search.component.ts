import { Component, OnInit } from '@angular/core';
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
export class SearchComponent implements OnInit {
  filteredRecipe: any = [];
  isLoading: boolean = false;

  constructor(private service: SampleServiceService) {
    console.log('Service:', service);
  }
  ngOnInit(): void {
    this.getRecipes();
  }
  getRecipes() {
    this.isLoading = true;
    this.service.getSearchTerm(this.service.searchTerm).subscribe({
      next: (data) => {
        if (data && data.recipes) {
          this.filteredRecipe = data.recipes;
          console.log('Recipes fetched successfully:', this.filteredRecipe);
        } else {
          console.warn('No recipes found or incorrect API response:', data);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching recipes:', err);
        this.isLoading = false;
      },
    });
  }
}
