import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Review {
  reviewer: string;
  score: number;
  notes?: string;
}

export interface Movie {
  title: string;
  genre: string;
  watched: boolean;
  reviews?: Review[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private DATA_URL = 'https://spreadsheets.google.com/feeds/cells/1Ft8iBNcATXY4qJr4O6Uc7ASIzJ6BntXMcctnTKc4Wx8/1/public/full?alt=json'
  
  constructor(private http: HttpClient) { }

  private parse(response): Movie[] {
    let table = [];
    let headers: string[] = [];
    response.feed.entry.forEach(entry => {
      let cell = entry.gs$cell;

      let row = parseInt(cell.row);
      let col = parseInt(cell.col);

      if(row === 1) {
        headers.push(cell.inputValue);
      } else {
        let index = row - 2;

        if(table.length < index + 1) {
          table.push({});
        }

        table[index][headers[col-1]] = cell.inputValue;
      }
    });

    let movies: Movie[] = [];

    table.forEach(entry => {
      let movie: Movie = {
        title: entry.Title,
        genre: entry.Genre,
        watched: entry.Watched === 'TRUE',
      } as Movie;

      let reviews: Review[] = [];
      Object.keys(entry).forEach(key => {
        if(key.endsWith('-Score')) {
          let reviewer: string = key.split("-")[0];
          let review: Review = {
            reviewer: reviewer,
            score: parseFloat(entry[key]),
          } as Review;

          if(entry[reviewer+"-Notes"] !== undefined) {
            review.notes = entry[reviewer+"-Notes"];
          }

          reviews.push(review);
        }
      });

      movie.reviews = reviews;

      movies.push(movie);
    });

    return movies;
  }

  public fetch(): Observable<Movie[]> {
    /* Fetch data from the spreadsheet on Drive. 

    Returns:
      The parsed spreadsheet as a list of Movies.
    */

    return this.http.get<Movie[]>(this.DATA_URL).pipe(map(this.parse));
  }
}
