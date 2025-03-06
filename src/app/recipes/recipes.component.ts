import { Component, OnInit } from '@angular/core';
import { SampleServiceService } from '../sample-service.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent implements OnInit {
  recipe: any;
  recipes: any[] = [];
  checked: boolean = false;
  ingredients: Number = 0;

  constructor(
    private route: ActivatedRoute,
    private service: SampleServiceService
  ) {}

  ngOnInit() {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (recipeId) {
      this.service.getRecipeById(+recipeId).subscribe((data) => {
        this.recipe = data;
      });
    }
    console.log('entered recipe');
  }

  checkBoxClick() {
    this.ingredients = this.recipe.ingredients.length;
    console.log(this.ingredients);
  }
}
