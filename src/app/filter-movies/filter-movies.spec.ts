import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMovies } from './filter-movies';

describe('FilterMovies', () => {
  let component: FilterMovies;
  let fixture: ComponentFixture<FilterMovies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterMovies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterMovies);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
