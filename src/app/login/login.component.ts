import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from "../authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  skull: boolean = true;
  skull_fade: boolean = false;

  private password: string = "";
  valid: boolean = true;

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void { 
    let self = this;
    setTimeout(function() { self.skull_fade = true; }, 4000);
    setTimeout(function() { self.skull = false; }, 5000);
  }

  getPassword(): string {
    return this.password.replace(/./g, "*");
  }

  press(value: number): void {
    this.password = this.password + value.toString();
  }

  submit(): void {
    let self = this;

    this.valid = this.auth.authenticate(this.password);

    if(!this.valid) {
      setTimeout(function() { self.valid = true; }, 1000);
    }
  }

  clear(): void {
    this.password = "";
  }
}
