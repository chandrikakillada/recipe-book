import { Component, Input, OnInit, viewChild } from '@angular/core';
import { SampleServiceService } from '../sample-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from '../login/login.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allRecipes: any[] = [];
  paginatedRecipes: any[] = [];
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 0;
  id: any;

  constructor(private service: SampleServiceService, private router: Router) {}

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
          console.log(this.allRecipes);
        } else {
        }
      },
      error: (err) => {
        console.error('Error fetching recipes:', err);
      },
    });
  }

  moreDetails(selected: any) {
    this.id = this.allRecipes[selected].id - 1;
    this.router.navigate([`/recipe/${this.id}`]);
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
