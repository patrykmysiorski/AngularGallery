import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IGallery} from '../../../../intefaces/IGallery';
import {HttpClient} from '@angular/common/http';
import {IComment} from '../../../../intefaces/IComments';
import {httpOptions} from '../../../constants/httpUtils';

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
  showPhotoForm: boolean;

  openPhotoForm() {
    this.showPhotoForm = true;
  }

  closePhotoForm() {
    this.showPhotoForm = false;
  }


  updateGallery() {
    this.http.post(`http://project.usagi.pl/gallery/${this.gallery.galleryId}`,
      this.gallery, this.httpOptions).toPromise().then((response: IGallery) => {
      this.gallery = response;
    });
  }

  addPhoto(photo) {
    const databasePhoto = {...photo, photoId: this.generatePhotoId()};
    this.gallery.photos.push(databasePhoto);
    this.updateGallery();
  }

  deletePhoto(photoId) {
    const index = this.gallery.photos.findIndex(photo => {
      return photo.photoId === photoId;
    });

    this.gallery.photos.splice(index, 1);
    this.updateGallery();
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

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.galleryId = this.route.snapshot.paramMap.get('galleryId');
    const url = 'http://project.usagi.pl/gallery/' + this.galleryId;
    this.http.get(url, this.httpOptions).toPromise().then((response: IGallery) => {
      this.gallery = this.convertTagsToUpperCase(response);
    });
    const urlForComments = 'http://project.usagi.pl/comment/byGallery/' + this.galleryId;
    this.http.get(urlForComments, this.httpOptions).toPromise().then((response: IComment[]) => {
      this.comments = response;
    });
  }

}
