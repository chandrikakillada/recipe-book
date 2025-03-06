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
  recipe: any = [];
  constructor(private service: SampleServiceService) {}
  ngOnInit(): void {
    this.makeRecipe();
  }

  makeRecipe() {
    this.service.getIngredients().subscribe({
      next: (data) => {
        this.recipe = data.recipes;
      },
    });
    console.log(this.recipe);
  }
}
