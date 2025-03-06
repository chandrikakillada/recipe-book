import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SampleServiceService {
  url = 'https://dummyjson.com/recipes';

  constructor(private http: HttpClient) {}

  public searchRecipes(query: string): Observable<any> {
    console.log('searchRecipes called with query:', query);
    return this.http.get(`${this.url}/search?q=${query}`);
  }

  public getRecipeById(id: number): Observable<any> {
    console.log('Fetching recipe with ID:', id);
    return this.http.get(`${this.url}/${id}`);
  }

  public getData(): Observable<any> {
    console.log('Fetching all recipes...');
    return this.http.get(this.url);
  }
}
