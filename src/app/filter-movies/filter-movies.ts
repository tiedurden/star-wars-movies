import { Component, input, output } from '@angular/core';
import { Planet, Starship } from '../movie-service';

@Component({
  selector: 'app-filter-movies',
  imports: [],
  templateUrl: './filter-movies.html',
  styleUrl: './filter-movies.css',
})
export class FilterMovies {
  placeholder = input.required<string>();
  filterValuesSet = input<Set<string>>();
  filterValues = input<Planet[] | Starship[]>();

  filterChanged = output<string>();

  onFilterChanged(value: string) {
    this.filterChanged.emit(value);
  }
}
