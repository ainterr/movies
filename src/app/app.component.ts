import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from "./authentication.service";
import { Movie, Review, DataService } from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  unwatched: Movie[];
  movies: Movie[];

  RANDOMIZER = 'randomizer';
  REVIEWS = 'reviews';

  selected: string = this.RANDOMIZER;

  constructor(
    public auth: AuthenticationService,
    private data: DataService,
  ) { }

  ngOnInit(): void {
    this.data.fetch().subscribe(movies => {
      this.movies = movies;
      this.unwatched = movies.filter(movie => !movie.watched);
    });
  }

  select(state: string): void {
    this.selected = state;
  }
}
