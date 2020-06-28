import {Component, OnInit} from '@angular/core';
import {IGallery} from '../../../../intefaces/IGallery';
import {Galleries} from '../../../constants/galleries.constant';
import * as moment from 'moment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss']
})
export class GalleriesComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        Authorization: '104'
      }
    )
  };

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

  constructor(private http: HttpClient) {
    this.title = 'My travels';
    this.description = 'Website created for front-end technologies at university';
    this.galleries = this.fetchGalleries();
    this.searchValue = '';
    this.createSortedYearsArray();
  }

  fetchGalleries() {
    this.galleries = [];
    this.http.get('http://project.usagi.pl/gallery', this.httpOptions).toPromise().then((response: IGallery[]) => {
      console.log(response);
      this.galleries = response;
    });
    return this.galleries;
  }

  setSearchValue($event) {
    this.searchValue = $event;
  }

  setSearchYear($event) {
    this.yearSearch = $event;
  }

  exportGalleries() {
    Galleries.forEach((gallery: IGallery) => {
      delete (gallery.galleryId);

      this.http.post('http://project.usagi.pl/gallery', gallery, this.httpOptions).toPromise().then((response: IGallery) => {
        console.log('success', response);
        this.galleries.push(response);
      }, (errResponse) => {
        console.log('error', errResponse);
      });
    });
  }

  ngOnInit(): void {
  }

}
