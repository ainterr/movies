import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RandomizerComponent } from './randomizer/randomizer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RandomizerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
