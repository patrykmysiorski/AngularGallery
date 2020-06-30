import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IGallery} from '../../../../intefaces/IGallery';
import {Galleries} from '../../../constants/galleries.constant';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {httpOptions} from '../../../constants/httpUtils';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss']
})
export class GalleriesComponent implements OnInit {

  httpOptions = httpOptions;

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
  addGalleryActive: boolean = false;
  gallery: IGallery;

  @Output() clearValues = new EventEmitter();

  onGallerySave(gallery) {
    this.http.post('http://project.usagi.pl/gallery', gallery, this.httpOptions).toPromise().then((response: IGallery) => {
      console.log('success', response);
      this.setCurrentPage();
      this.galleries.push(response);
      this.numberOfPages = this.calculateNumberOfPages();
      this.addGalleryActive = !this.addGalleryActive;
    }, (errResponse) => {
      console.log('error', errResponse);
    });
  }

  onGalleryEdiClose() {
    this.addGalleryActive = !this.addGalleryActive;
  }

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

  setAddGalleryActive() {
    this.addGalleryActive = true;
  }

  fetchGalleries() {
    this.galleries = [];
    this.http.get('http://project.usagi.pl/gallery', this.httpOptions).toPromise().then((response: IGallery[]) => {
      this.galleries = response;
      this.numberOfPages = this.calculateNumberOfPages();
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
        this.numberOfPages = this.calculateNumberOfPages();
        this.galleries = this.galleries.concat(response);
      }, (errResponse) => {
        console.log('error', errResponse);
      });
    });
  }

  removeGalleries() {
    this.galleries.forEach((gallery: IGallery) => {
      this.http.post('http://project.usagi.pl/gallery/delete/' +
        gallery.galleryId, {}, this.httpOptions).toPromise().then((response) => {
        this.galleries = [];
        this.numberOfPages = this.calculateNumberOfPages();
        this.setCurrentPage();
        console.log('success', response);
      }, (errResponse) => {
        console.log('error', errResponse);
      });
    });
  }

  calculateNumberOfPages(): any {
    let numberOfPages = Array(Math.ceil(this.galleries.length /
      this.limit)).fill(1);
    if (numberOfPages[0] == undefined) {
      numberOfPages[0] = 1;
    }
    console.log(numberOfPages);
    return numberOfPages;
  }

  removeGallery(galleryId) {
    this.http.post('http://project.usagi.pl/gallery/delete/' + galleryId,
      {}, this.httpOptions).toPromise().then((response) => {
      this.galleries = this.galleries.filter((gallery: IGallery) => {
        return gallery.galleryId !== galleryId;
      });
      this.numberOfPages = this.calculateNumberOfPages();
      if (this.galleries.length % 3 === 0 && this.currentPage != 0) {
        this.setCurrentPage(this.currentPage - 1);
      }
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

  moveBack() {
    this.setCurrentPage(this.currentPage - 1);
  }

  moveForward() {
    this.setCurrentPage(this.currentPage + 1);
  }

  ngOnInit(): void {
    this.http.get('http://project.usagi.pl/gallery',
      this.httpOptions).toPromise().then((response: IGallery[]) => {
      this.galleries = response;
      this.numberOfPages = this.calculateNumberOfPages();
    });
    this.currentPage = parseInt(localStorage.getItem('galleryPage')) || 0;
    this.setCurrentPage(this.currentPage);
  }

}
