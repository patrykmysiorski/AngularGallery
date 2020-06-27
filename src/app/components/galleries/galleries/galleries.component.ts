import { Component, OnInit } from '@angular/core';
import {IGallery} from '../../../IGallery';
import {Galleries} from '../../../constants/galleries.constant';
import * as moment from 'moment';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss']
})
export class GalleriesComponent implements OnInit {
  title = 'AngularGallery';
  description: string;
  galleries: IGallery[];
  searchValue: any;
  travelYearsSet;
  travelYearsArray = [];
  yearSearch: any = null;

  createSortedYearsArray = () => {
    this.travelYearsSet = new Set();
    Galleries.map(travel => this.travelYearsSet.add(moment(travel.dateCreated).format('yyyy')));
    this.travelYearsSet.forEach(year => {
      this.travelYearsArray.push(parseInt(year, 10));
    });
    this.travelYearsArray.sort((a, b) => a - b);
  }

  setValue = (value) => {
    this.yearSearch = value;
  }

  constructor() {
    this.title = 'My travels';
    this.description = 'Website created for front-end technologies at university';
    this.galleries = Galleries;
    this.searchValue = '';
    this.createSortedYearsArray();
  }

  ngOnInit(): void {
  }

}
