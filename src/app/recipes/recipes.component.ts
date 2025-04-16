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
  ingredients: any[] = [];
  blobs: any[] = [];
  tips: any[] = [
    {
      title: " Tip from Grandma's Notebook #1",
      tip: 'Always add your garlic after the onions. Burnt garlic = bitter disaster. And grandma knows. 🧄❤️',
      blob: '/assets/blob.svg',
    },
    // {
    //   title: " Tip from Grandma's Notebook #2",
    //   tip: 'Taste as you go. Because salt is a blessing… until it’s a curse. 🧂👀',
    //   blob: '/assets/blob.svg',
    // },
    // {
    //   title: " Tip from Grandma's Notebook #3",
    //   tip: "Don't crowd the pan. Even veggies need personal space to glow up and get crispy. 🥦💁‍♀️",
    //   blob: '/assets/blob.svg',
    // },
    // {
    //   title: " Tip from Grandma's Notebook #4",
    //   tip: 'Butter makes everything better. No one ever cried over a golden-brown crust. 🧈🥲',
    //   blob: '/assets/blob.svg',
    // },
    {
      title: " Tip from Grandma's Notebook #5",
      tip: 'Let it rest. That goes for steak... and your overachieving brain. 🥩🛌',
      blob: '/assets/blob.svg',
    },
    {
      title: " Tip from Grandma's Notebook #6",
      tip: "If you're not dancing a little while stirring, it's not seasoned enough. Shake in those spices — and your shoulders. 🕺🌶️",
      blob: '/assets/blob.svg',
    },
  ];

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
    this.ingredients = this.recipe.ingredients;
    console.log(this.ingredients[0].name);
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
