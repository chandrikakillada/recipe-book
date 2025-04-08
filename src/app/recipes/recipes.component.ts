import { Component, HostAttributeToken, Inject, OnInit } from '@angular/core';
import { SampleServiceService } from '../sample-service.service';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
  recipe: any;
  recipes: any[] = [];
  count: any;
  instructions: boolean = false;
  liked: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: SampleServiceService
  ) {}
  ngOnInit() {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (recipeId) {
      this.service.getRecipeById(+recipeId).subscribe((data) => {
        this.recipe = {
          ...data,
          ingredients: data.ingredients.map((ingredient: string) => ({
            name: ingredient,
            checked: false,
          })),
        };
      });
    }
  }
  checkBoxClick() {
    this.count = 0;
    this.recipe.ingredients.forEach((item: any) => {
      if (item.checked) {
        this.count++;
      }
    });
    if (this.count == this.recipe.ingredients.length) {
      this.instructions = true;
    }
    console.log('Checked ingredients count:', this.count);
  }

  likedRecipe() {
    this.liked = true;
    console.log(this.liked);
    document.getElementById('wishlist')?.setAttribute('fill', 'red');
  }

  unlikeRecipe() {
    this.liked = false;
  }
}
