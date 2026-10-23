import { Component, inject, signal, input, computed } from '@angular/core';
import { MovieService, Planet, Starship } from '../movie-service';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, of, switchMap } from 'rxjs';

type ItemType = 'Planet' | 'Starship';

@Component({
  selector: 'app-table-list-item',
  imports: [],
  templateUrl: './table-list-item.html',
  styleUrl: './table-list-item.css',
})
export class TableListItem {
  items = input.required<string[]>();
  itemType = input<ItemType>();

  private movieService = inject(MovieService);

  planet = toSignal(this.movieService.getPlanetById(1));

  itemNames = toSignal(
    toObservable(this.items).pipe(
      switchMap((items) => {
        const requests = items.map((itemUrl) => {
          const match = itemUrl.match(/(\d+)(?=\/?$)/);
          if (match) {
            const id = Number(match[1]);
            if (this.itemType() === 'Planet') {
              return this.movieService.getPlanetById(id);
            }
            if (this.itemType() === 'Starship') {
              return this.movieService.getStarshipById(id);
            }
          }
          return of(null);
        });
        return requests.length ? combineLatest(requests) : of([]);
      }),
    ),
    { initialValue: [] as (Planet | Starship | null)[] },
  );
}
