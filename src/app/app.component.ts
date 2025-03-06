import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { SearchComponent } from './search/search.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RecipesComponent, SearchComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'sampleApp';
}
