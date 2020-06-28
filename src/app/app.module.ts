import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {FormsModule} from '@angular/forms';
import { SearchGalleriesPipe } from './pipes/search-galleries.pipe';
import { SearchByYearPipe } from './pipes/search-by-year.pipe';
import { GalleriesComponent } from './components/galleries/galleries/galleries.component';
import { GalleryItemComponent } from './components/galleries/gallery-item/gallery-item.component';
import { GallerySearchComponent } from './components/galleries/gallery-search/gallery-search.component';
import { GallerySearchByYearComponent } from './components/galleries/gallery-search-by-year/gallery-search-by-year.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { GalleryComponent } from './components/galleries/gallery/gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchGalleriesPipe,
    SearchByYearPipe,
    GalleriesComponent,
    GalleryItemComponent,
    GallerySearchComponent,
    GallerySearchByYearComponent,
    DashboardComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
