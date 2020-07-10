import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IGallery} from '../../../../intefaces/IGallery';
import {HttpClient} from '@angular/common/http';
import {IComment} from '../../../../intefaces/IComment';
import {httpOptions} from '../../../constants/httpUtils';
import {Location} from '@angular/common';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  httpOptions = httpOptions;

  private galleryId: string;
  gallery: IGallery;
  comments: IComment[];
  showPhotoForm: boolean = false;
  showEditGalleryForm: boolean = false;
  showCommentForm: boolean = true;
  galleryCopy: IGallery;
  currentPage: number;
  numberOfPages: any;
  limit: number;
  start: number;
  end: number;
  withoutText = true;


  togglePhotoForm() {
    this.showPhotoForm = !this.showPhotoForm;
  }

  openEditGallery() {
    this.showPhotoForm = false;
    this.showCommentForm = false;
    this.showEditGalleryForm = true;
  }

  onGalleryEdiClose() {
    this.showPhotoForm = false;
    this.showCommentForm = true;
    this.showEditGalleryForm = false;
  }

  onGallerySave(gallery) {
    this.gallery = {...gallery};
    this.http.post(`http://project.usagi.pl/gallery/${gallery.galleryId}`,
      this.gallery, this.httpOptions).toPromise().then((response: IGallery) => {
    });
  }

  updateGallery() {
    if (this.gallery.thumbUrl === '' || this.gallery.thumbUrl == undefined && this.gallery.photos.length < 2) {
      this.gallery = {...this.gallery, thumbUrl: this.gallery.photos[0].thumbUrl};
    } else {
      this.gallery = {...this.gallery};
    }
    this.http.post(`http://project.usagi.pl/gallery/${this.gallery.galleryId}`,
      this.gallery, this.httpOptions).toPromise().then((response: IGallery) => {
      this.gallery = response;
    });
    this.numberOfPages = this.calculateNumberOfPages();
  }

  addPhoto(photo) {
    const databasePhoto = {...photo, photoId: this.generatePhotoId()};
    this.gallery.photos.push(databasePhoto);
    this.updateGallery();
    this.togglePhotoForm();
  }

  deletePhoto(photoId) {
    const index = this.gallery.photos.findIndex(photo => {
      return photo.photoId === photoId;
    });

    this.gallery.photos.splice(index, 1);
    this.updateGallery();
    if (this.gallery.photos.length % 4 === 0 && this.currentPage != 0) {
      this.setCurrentPage(this.currentPage - 1);
    }
  }

  generatePhotoId() {
    let lastId = '';
    if (this.gallery.photos.length > 0) {
      lastId = this.gallery.photos[this.gallery.photos.length - 1].photoId;
    } else {
      lastId = '-1';
    }
    const newId = parseInt(lastId) + 1;
    return newId;
  }

  removeTag(tag) {
    const tagUpper = tag.toUpperCase();
    const index = this.gallery.tags.findIndex(tag => {
      return tag === tagUpper;
    });

    this.gallery.tags.splice(index, 1);
    this.updateGallery();
  }

  addTag(tag: string) {
    const tagUpper = tag.toUpperCase();
    const index = this.gallery.tags.findIndex(tag => {
      return tag === tagUpper;
    });
    if (index === -1) {
      this.gallery.tags.push(tagUpper);
      this.updateGallery();
    }
  }

  convertTagsToUpperCase(response) {
    const tags = response.tags;
    const upperCaseTags = tags.map((tag: string) => tag.toUpperCase());
    return this.gallery = {...response, tags: upperCaseTags};
  }

  updateComments(event) {
    this.comments.push(event);
  }

  deleteComment(commentId) {
    this.comments = this.comments.filter(comment => comment.commentId !== commentId);
  }

  constructor(private route: ActivatedRoute, private http: HttpClient, private _location: Location) {
  }

  createGalleryCopy() {
    this.galleryCopy = {...this.gallery};
  }

  backToGalleries() {
    this._location.back();
  }

  setCurrentPage(page = 0) {
    this.limit = 4;
    this.currentPage = page;
    this.start = this.currentPage * this.limit;
    this.end = this.start + 4;
    localStorage.setItem('photosPage', this.currentPage.toString());
  }

  moveBack() {
    this.setCurrentPage(this.currentPage - 1);
  }

  moveForward() {
    this.setCurrentPage(this.currentPage + 1);
  }

  calculateNumberOfPages(): any {
    let numberOfPages = Array(Math.ceil(this.gallery.photos.length /
      this.limit)).fill(1);
    if (numberOfPages[0] == undefined) {
      numberOfPages[0] = 1;
    }
    return numberOfPages;
  }

  ngOnInit(): void {
    this.galleryId = this.route.snapshot.paramMap.get('galleryId');
    const url = 'http://project.usagi.pl/gallery/' + this.galleryId;
    this.http.get(url, this.httpOptions).toPromise().then((response: IGallery) => {
      this.gallery = this.convertTagsToUpperCase(response);
      this.numberOfPages = this.calculateNumberOfPages();
      this.createGalleryCopy();
      this.calculateNumberOfPages();
      // this.gallery.photos.splice(-1, 1);
    });
    const urlForComments = 'http://project.usagi.pl/comment/byGallery/' + this.galleryId;
    this.http.get(urlForComments, this.httpOptions).toPromise().then((response: IComment[]) => {
      this.comments = response;
    });
    this.currentPage = parseInt(localStorage.getItem('photosPage')) || 0;
    this.setCurrentPage(this.currentPage);
  }

}
