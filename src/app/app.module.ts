import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FormsModule} from '@angular/forms';
import {SearchGalleriesPipe} from './pipes/search-galleries.pipe';
import {SearchByYearPipe} from './pipes/search-by-year.pipe';
import {GalleriesComponent} from './components/galleries/galleries/galleries.component';
import {GalleryItemComponent} from './components/galleries/gallery-item/gallery-item.component';
import {GallerySearchComponent} from './components/galleries/gallery-search/gallery-search.component';
import {GallerySearchByYearComponent} from './components/galleries/gallery-search-by-year/gallery-search-by-year.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './components/dashboard/dashboard/dashboard.component';
import {GalleryComponent} from './components/galleries/gallery/gallery.component';
import {CommentFormComponent} from './components/comments/comment-form/comment-form.component';
import {CommentsContainerComponent} from './components/comments/comments-container/comments-container.component';
import {GalleryTagFormComponent} from './components/galleries/gallery-tag-form/gallery-tag-form.component';
import {GalleryPhotoFormComponent} from './components/galleries/gallery-photo-form/gallery-photo-form.component';
import {GalleryFormComponent} from './components/galleries/gallery-form/gallery-form.component';
import {NewsFormComponent} from './components/dashboard/news-form/news-form.component';
import { NewsContainerComponent } from './components/dashboard/news-container/news-container.component';
import { SingleNewsComponent } from './components/dashboard/single-news/single-news.component';
import { NewsPageComponent } from './components/dashboard/news-page/news-page.component';
import { PagingComponent } from './components/paging/paging.component';
import { TagsContainerComponent } from './components/tags/tags-container/tags-container.component';
import { EditNewsFormComponent } from './components/dashboard/edit-news-form/edit-news-form.component';

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
    GalleryComponent,
    CommentFormComponent,
    CommentsContainerComponent,
    GalleryTagFormComponent,
    GalleryPhotoFormComponent,
    GalleryFormComponent,
    NewsFormComponent,
    NewsContainerComponent,
    SingleNewsComponent,
    NewsPageComponent,
    PagingComponent,
    TagsContainerComponent,
    EditNewsFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
