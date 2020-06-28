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
  limit: number;
  start: number;
  end: number;
  currentPage: number;
  numberOfPages: any;

  createSortedYearsArray = () => {
    this.travelYearsSet = new Set();
    Galleries.map(travel => this.travelYearsSet.add(moment(travel.dateCreated).format('yyyy')));
    this.travelYearsSet.forEach(year => {
      this.travelYearsArray.push(parseInt(year, 10));
    });
    this.travelYearsArray.sort((a, b) => a - b);
  };

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
      this.galleries = response;
      this.numberOfPages = Array(Math.ceil(this.galleries.length /
        this.limit)).fill(1);
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
        this.numberOfPages = Array(Math.ceil(this.galleries.length /
          this.limit)).fill(1);
        this.galleries.push(response);
      }, (errResponse) => {
        console.log('error', errResponse);
      });
    });
  }

  removeGalleries() {
    this.galleries.forEach((gallery: IGallery) => {
      this.http.post('http://project.usagi.pl/gallery/delete/' +
        gallery.galleryId, {}, this.httpOptions).toPromise().then((response) => {
        this.galleries.splice(0, 1);
        this.numberOfPages = Array(Math.ceil(this.galleries.length /
          this.limit)).fill(1);
        console.log('success', response);
      }, (errResponse) => {
        console.log('error', errResponse);
      });
    });
  }

  removeGallery(galleryId) {
    const index = this.galleries.findIndex((gallery: IGallery) =>
      gallery.galleryId === galleryId);
    this.http.post('http://project.usagi.pl/gallery/delete/' + galleryId,
      {}, this.httpOptions).toPromise().then((response) => {
      this.galleries.splice(index, 1);
      this.numberOfPages = Array(Math.ceil(this.galleries.length /
        this.limit)).fill(1);
      console.log('success', response);
    }, (errResponse) => {
      console.log('error', errResponse);
    });
  }

  setCurrentPage(page = 0) {
    this.limit = 3;
    this.currentPage = page;
    this.start = this.currentPage * this.limit;
    this.end = this.start + 3;
    localStorage.setItem('galleryPage', this.currentPage.toString());
  }


  ngOnInit(): void {
    this.setCurrentPage();
    this.http.get('http://project.usagi.pl/gallery',
      this.httpOptions).toPromise().then((response: IGallery[]) => {
      this.galleries = response;
      this.numberOfPages = Array(Math.ceil(this.galleries.length /
        this.limit)).fill(1);
    });
    // this.currentPage = parseInt(localStorage.getItem('galleryPage')) || 0;
    // this.setCurrentPage(this.currentPage);
  }

}
