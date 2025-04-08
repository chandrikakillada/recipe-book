import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WishlistComponent } from './wishlist/wishlist.component';

export const routes: Routes = [
  { path: 'recipe/:id', component: RecipesComponent },
  { path: 'search', component: SearchComponent },
  {
    path: 'home',

    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  { path: '', component: LandingPageComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'register', component: RegisterComponent },
];
