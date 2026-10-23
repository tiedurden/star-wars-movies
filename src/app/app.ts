import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { MovieTable } from './movie-table/movie-table';
import { FilterMovies } from './filter-movies/filter-movies';
import { Movie, MovieService } from './movie-service';

@Component({
  selector: 'app-root',
  imports: [MovieTable, FilterMovies],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('star-wars-movies');
  private movieService = inject(MovieService);
  movieError = signal(false);
  filteredDirector = signal('');
  filteredPlanet = signal('');
  filteredStarship = signal('');

  movies = toSignal(
    this.movieService.getMovies().pipe(
      catchError((err) => {
        this.movieError.set(true);
        return of([]);
      }),
    ),
  );

  planets = toSignal(this.movieService.getPlanets());

  starships = toSignal(this.movieService.getStarships());

  directors = computed(() => new Set((this.movies() ?? []).map((movie: Movie) => movie.director)));

  filteredMovies = computed(() =>
    (this.movies() ?? []).filter(
      (movie) =>
        movie.director.includes(this.filteredDirector()) &&
        (!this.filteredPlanet() || movie.planets.includes(this.filteredPlanet())) &&
        (!this.filteredStarship() || movie.starships.includes(this.filteredStarship())),
    ),
  );
}
