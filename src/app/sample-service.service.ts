import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SampleServiceService {
  URL = 'https://dummyjson.com/recipes';
  searchTerm: string = 'pasta';

  constructor(private http: HttpClient) {}

  searchRecipes(): Observable<any> {
    console.log('searchRecipes called with query:', this.searchTerm);
    return this.http.get(`${this.URL}/search?q=${this.searchTerm}`);
  }

  getSearchTerm(term: string) {
    console.log('loggin inside service: ', term);
    this.searchTerm = term;
    this.searchRecipes();
  }

  getRecipeById(id: number): Observable<any> {
    console.log('Fetching recipe with ID:', id);
    return this.http.get(`${this.URL}/${id}`);
  }

  getData(): Observable<any> {
    console.log('Fetching all recipes...');
    return this.http.get(this.URL);
  }
}
