import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private PASSWORD: string = "80085";
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
