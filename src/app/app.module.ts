import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {FormsModule} from '@angular/forms';
import { SearchGalleriesPipe } from './pipes/search-galleries.pipe';
import { SearchByYearPipe } from './pipes/search-by-year.pipe';
import { GalleriesComponent } from './components/galleries/galleries/galleries.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchGalleriesPipe,
    SearchByYearPipe,
    GalleriesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
