import {Component} from '@angular/core';
import {IGallery} from './IGallery';
import {Galleries} from './constants/galleries.constant';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
  }
}
