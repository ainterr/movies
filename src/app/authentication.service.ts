import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // the password that was used in the movie
  private PASSWORD: string = "430";

  private authenticated: boolean = false;
  private stream: number[] = [];

  constructor() { }

  authenticate(value: string): boolean {
    if(value === this.PASSWORD) {
      this.authenticated = true;
    }

    return this.authenticated;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}
