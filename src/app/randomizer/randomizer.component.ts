import { Component, OnInit } from '@angular/core';

import { Movie, Review, DataService } from '../data.service';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent implements OnInit {
  GENRE_EMOJI_MAP = {
    'Shit': '💩',
    'Weeby': '🍣',
    'Action': '🔫',
    'Comedy': '🤣',
    'Kung Fu': '🥋',
    'Ghibli': '🐹',
    'Horror': '🧟',
    'Suspense': '😨',
    'Drama': '🎭'
  }
  GENRE_EMOJI_UNKNOWN = '🍿';

  GENRE_COLOR_MAP = {
    'Shit': '#ffedd6',
    'Weeby': '#ffd4f4',
    'Action': '#ffe6e6',
    'Comedy': '#e8ffd6',
    'Kung Fu': '#d6fff5',
    'Ghibli': '#f9d6ff',
    'Horror': '#b0b0b0',
    'Suspense': '#e6e7ff',
    'Drama': '#d6fff8'
  }
  GENRE_COLOR_UNKNOWN = '#eee';

  movies: Movie[];
  selected: Movie;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.fetch().subscribe(movies => this.movies = movies);
  }

  private random(options: Movie[]): Movie {
    return options[Math.floor(Math.random()*options.length)];
  }

  select(): void {
    this.selected = this.random(this.movies);
  }

  reset(): void {
    this.selected = undefined;
  }

  genre_emoji(selected: string): string {
    let emoji: string = this.GENRE_EMOJI_MAP[selected];

    if(emoji === undefined) {
      emoji = this.GENRE_EMOJI_UNKNOWN;
    }

    return emoji;
  }

  genre_color(selected: string): string {
    let color: string = this.GENRE_COLOR_MAP[selected];

    if(color === undefined) {
      color = this.GENRE_COLOR_UNKNOWN;
    }

    return color;
  }
}
