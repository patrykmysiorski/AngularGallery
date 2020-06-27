import {Component} from '@angular/core';
import {IGallery} from './IGallery';
import {Galleries} from './constants/galleries.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularGallery';
  description: string;
  galleries: IGallery[];
  searchValue: any;

  constructor() {
    this.title = 'My travels';
    this.description = 'Website created for front-end technologies at university';
    this.galleries = Galleries;
    this.searchValue = '';
  }
}
