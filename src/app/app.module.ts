import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RandomizerComponent } from './randomizer/randomizer.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { KonamiComponent } from './konami/konami.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RandomizerComponent,
    ReviewsComponent,
    KonamiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
