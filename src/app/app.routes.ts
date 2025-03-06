import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'recipe/:id', component: RecipesComponent },
  { path: '', component: SearchComponent },
  { path: 'ingredients', component: HomeComponent },
];
