import { Component, OnInit } from '@angular/core';
import { SampleServiceService } from '../sample-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  allRecipes: any = [];
  constructor(private service: SampleServiceService) {}
  ngOnInit(): void {
    this.showAllRecipes();
  }
  showAllRecipes() {
    this.service.getData().subscribe({
      next: (data) => {
        if (data && data.recipes) {
          this.allRecipes = data.recipes;
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
}
