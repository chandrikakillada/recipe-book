import { Component, OnInit } from '@angular/core';
import { SampleServiceService } from '../sample-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';

export interface Recipe {
  id: number;
  name: string;
  image: string;
  caloriesPerServing: number;
  cookTimeMinutes: number;
  prepTimeMinutes: number;
  cuisine: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  mealType: string[];
  servings: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  userId: number;
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit {
  searchTerm: any;
  errorMessage: any;
  isLoading: boolean | undefined;
  allRecipes!: Recipe[];
  allRecipeImages: string[] = [];
  randomImages: string[] = [];
  typingValue: any;
  suggestingValue: string[] = [];
  recipeFromImages: any[] = [];
  countIds!: any;

  constructor(private service: SampleServiceService) {}

  ngOnInit() {
    this.service.getData().subscribe((data) => {
      this.allRecipes = data.recipes;
      this.allRecipeImages = data.recipes
        .filter((recipe: any) => recipe.image)
        .map((data: any) => data.image);
    });

    this.randomImages = this.getRandomStrings(this.allRecipeImages);
    console.log(this.searchTerm);
    this.storingIds();
    console.log(this.recipeFromImages);
    for (let i of this.recipeFromImages) {
      i = i - 1;
      console.log(this.allRecipes[i]);
    }
  }

  storingIds() {
    for (let i of this.randomImages) {
      this.countIds = i.split('/').pop()?.split('.')[0];
      this.recipeFromImages.push(this.countIds);
    }
  }

  getRandomStrings(arr: string[]): string[] {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }

  getSearch() {
    if (!this.typingValue.trim()) {
      this.errorMessage = 'Please enter a search term.';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';

    this.service.getSearchTerm(this.typingValue);
  }

  onInputChange(event: Event) {
    this.typingValue = (event.target as HTMLInputElement).value;
    if (this.typingValue == '') {
      this.suggestingValue = [];
    }

    this.suggestingValue = [];
    for (let item of this.allRecipes) {
      if (item.name.toLowerCase().includes(this.typingValue)) {
        this.suggestingValue.push(item.name);
        console.log(item.name);
      }
    }
  }
  selectItem(name: any) {
    this.typingValue = name;
    this.suggestingValue = [];
  }
}
