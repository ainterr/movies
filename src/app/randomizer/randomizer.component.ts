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

  constructor() { }

  private random(options: Movie[]): Movie {
    return options[Math.floor(Math.random()*options.length)];
  }

  select(): void {
    this.selected = this.random(this.movies);
  }

  reset(): void {
    this.selected = undefined;
  }

  genre_emoji = genre_emoji;

  genre_color = genre_color;
}
