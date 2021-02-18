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
  watched: Movie[];
  selected: Movie;

  RANDOMIZER = 'randomizer';
  REVIEWS = 'reviews';

  view: string = this.RANDOMIZER;

  constructor(
    public auth: AuthenticationService,
    private data: DataService,
  ) { }

  ngOnInit(): void {
    this.data.fetch().subscribe(movies => {
      this.unwatched = movies.filter(movie => !movie.watched);
      this.watched = movies.filter(movie => movie.watched);
    });
  }

  select(state: string): void {
    this.view = state;
  }

  selectMovie(selection: Movie) {
    this.selected = selection;
  }
}
