import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SampleServiceService {
  URL = 'https://dummyjson.com/recipes';
  searchTerm: string = '';

  constructor(private http: HttpClient) {}
  searchRecipes(): Observable<any> {
    console.log('API called with search term:', this.searchTerm);
    const apiUrl = `${this.URL}/search?q=${this.searchTerm}`;
    console.log('API URL:', apiUrl);
    return this.http
      .get(apiUrl)
      .pipe(tap((response) => console.log('API Response:', response)));
  }

  getSearchTerm(term: string): Observable<any> {
    console.log('Logging inside service: ', term);
    this.searchTerm = term;
    return this.searchRecipes();
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
