import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {FormsModule} from '@angular/forms';
import { SearchGalleriesPipe } from './pipes/search-galleries.pipe';
import { SearchByYearPipe } from './pipes/search-by-year.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchGalleriesPipe,
    SearchByYearPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
