import { computed, Component, input } from '@angular/core';
import { Movie } from '../movie-service';
import { TableListItem } from '../table-list-item/table-list-item';

@Component({
  selector: 'app-movie-table',
  imports: [TableListItem],
  templateUrl: './movie-table.html',
  styleUrl: './movie-table.css',
})
export class MovieTable {
  movies = input.required<Movie[] | never[] | undefined>();
  movieError = input<boolean>(false);

  formatDate(date: string) {
    return date.slice(0, 10);
  }
}
