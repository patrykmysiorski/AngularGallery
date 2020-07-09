import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {IGallery} from '../../../../intefaces/IGallery';

@Component({
  selector: 'app-gallery-form',
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.scss']
})
export class GalleryFormComponent implements OnInit {
  @ViewChild('galleryEditForm', {static: false})
  galleryEditForm: NgForm;

  @Input() gallery: IGallery;

  @Input() header: string;

  @Output() saveGallery = new EventEmitter();

  @Output() closeForm = new EventEmitter();

  constructor() {
  }

  defaultGallery() {
    const gallery: IGallery = {
      title: '',
      dateCreated: new Date().toDateString(),
      thumbUrl: '',
      description: '',
      tags: [],
      photos: []
    };
    return gallery;
  }

  ngOnInit(): void {
    this.gallery = (!!this.gallery) ? {...this.gallery} : this.defaultGallery();
  }

  onCancel() {
    this.resetForm();
    this.closeForm.emit();
  }

  private resetForm() {
    this.galleryEditForm.controls['title'].setErrors(null);
    this.galleryEditForm.controls['title'].setValue(this.gallery.title);
    this.galleryEditForm.controls['thumbUrl'].setErrors(null);
    this.galleryEditForm.controls['thumbUrl'].setValue(this.gallery.thumbUrl);
    this.galleryEditForm.controls['description'].setErrors(null);
    this.galleryEditForm.controls['description'].setValue(this.gallery.description);
  }

  onSaveChanges() {
    this.saveGallery.emit(this.gallery);
  }

}
