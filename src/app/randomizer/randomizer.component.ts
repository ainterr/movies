import { Component, Input } from '@angular/core';

import { Movie } from '../data.service';
import { genre_emoji, genre_color } from '../utils'

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent {
  @Input() movies: Movie[];
  selected: Movie;

  private filters: {[name: string]: boolean} = {};

  constructor() { }

  private random(options: Movie[]): Movie {
    return options[Math.floor(Math.random()*options.length)];
  }

  genres(): string[] {
    return this.movies.map(
      m => m.genre
    ).filter(
      (item, pos, self) => self.indexOf(item) == pos
    );
  }

  filter(genre: string): void {
    this.filters[genre] = true;
  }

  unfilter(genre: string): void {
    this.filters[genre] = false;
  }

  toggleFilter(genre: string): void {
    this.filters[genre] = !this.filters[genre];
  }

  resetFilter(): void {
    this.filters = {};
  }

  isFiltered(genre?: string): boolean {
    if(genre === undefined) {
      let filtered: boolean = false;

      Object.keys(this.filters).forEach(
        g => {
          if(this.filters[g] === true) filtered = true;
        }
      )

      return filtered;
    }

    return this.filters[genre] === true;
  }

  select(): void {
    let options: Movie[] = this.movies;
    
    if(this.isFiltered()) {
      options = options.filter(
        m => this.filters[m.genre]
      );
    }

    this.selected = this.random(options);
  }

  reset(): void {
    this.selected = undefined;
  }

  genre_emoji = genre_emoji;

  genre_color = genre_color;
}
