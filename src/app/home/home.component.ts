import { Component, OnInit } from '@angular/core';
import { SampleServiceService } from '../sample-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allRecipes: any[] = [];
  paginatedRecipes: any[] = [];
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 0;

  constructor(private service: SampleServiceService) {}

  ngOnInit(): void {
    this.showAllRecipes();
  }

  showAllRecipes() {
    this.service.getData().subscribe({
      next: (data) => {
        if (data && data.recipes && Array.isArray(data.recipes)) {
          this.allRecipes = data.recipes;
          this.totalPages = Math.ceil(this.allRecipes.length / this.pageSize);
          this.updatePaginatedRecipes();
          console.log('Recipes fetched successfully:', this.allRecipes);
        } else {
          console.warn('No recipes found or incorrect API response:', data);
        }
      },
      error: (err) => {
        console.error('Error fetching recipes:', err);
      },
    });
  }

  updatePaginatedRecipes() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedRecipes = this.allRecipes.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedRecipes();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedRecipes();
    }
  }
}
