import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

interface Response<T> {
  count: number;
  results: T[];
}

export interface Movie {
  title: string;
  release_date: string;
  created: string;
  director: string;
  starships: string[];
  planets: string[];
}

export interface Starship {
  name: string;
  url: string;
}

export interface Planet {
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private html = inject(HttpClient);
  private movieApiUrl = 'https://swapi.py4e.com/api/films/';
  private planetApiUrl = 'https://swapi.py4e.com/api/planets/';
  private starShipApiUrl = 'https://swapi.py4e.com/api/starships/';

  getMovies(): Observable<Movie[]> {
    const movies = this.html
      .get<Response<Movie>>(this.movieApiUrl)
      .pipe(map((response) => response.results));
    return movies;
  }

  getPlanetById(id: number): Observable<Planet> {
    const url = this.planetApiUrl + id + '/';
    return this.html.get<Planet>(url);
  }

  getStarshipById(id: number): Observable<Starship> {
    const url = this.starShipApiUrl + id + '/';
    return this.html.get<Starship>(url);
  }

  getPlanets(): Observable<Planet[]> {
    return this.html
      .get<Response<Planet>>(this.planetApiUrl)
      .pipe(map((response) => response.results));
  }

  getStarships(): Observable<Starship[]> {
    return this.html
      .get<Response<Starship>>(this.starShipApiUrl)
      .pipe(map((response) => response.results));
  }
}
