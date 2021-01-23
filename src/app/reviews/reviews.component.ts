import { Component, Input } from '@angular/core';

import { Movie, Review } from '../data.service';
import { genre_emoji } from '../utils';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {
  @Input() movies: Movie[];

  constructor() { }

  genre_emoji = genre_emoji;
}
