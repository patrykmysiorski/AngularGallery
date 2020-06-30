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
  editGallery: NgForm;

  @Input() gallery: IGallery;

  @Output() savedGallery = new EventEmitter();

  @Output() closeForm = new EventEmitter();

  constructor() {
  }

  galleryCopy: IGallery;

  ngOnInit(): void {
    this.galleryCopy = {...this.gallery};
  }

  onCancel() {
    this.resetForm();
    this.closeForm.emit();
  }

  private resetForm() {
    console.log(this.gallery.title);
    this.editGallery.controls['title'].setErrors(null);
    this.editGallery.controls['title'].setValue(this.galleryCopy.title);
    this.editGallery.controls['thumbUrl'].setErrors(null);
    this.editGallery.controls['thumbUrl'].setValue(this.galleryCopy.thumbUrl);
    this.editGallery.controls['description'].setErrors(null);
    this.editGallery.controls['description'].setValue(this.galleryCopy.description);
  }

  onSaveChanges() {
    this.savedGallery.emit(this.gallery);
  }

}
