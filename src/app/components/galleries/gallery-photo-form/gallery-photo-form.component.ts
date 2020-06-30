import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {IPhoto} from '../../../../intefaces/IPhoto';

@Component({
  selector: 'app-gallery-photo-form',
  templateUrl: './gallery-photo-form.component.html',
  styleUrls: ['./gallery-photo-form.component.scss']
})
export class GalleryPhotoFormComponent implements OnInit {

  @ViewChild('photoForm', {static: false})
  photoForm: NgForm;

  @Output()
  addPhoto = new EventEmitter();

  @Output()
  closeForm = new EventEmitter();

  photo: IPhoto;

  constructor() {
  }

  onAddPhoto() {
    if (this.photoForm.valid) {
      this.addPhoto.emit(this.photo);
      this.resetForm();
    }
  }

  onCancel() {
    this.resetForm();
    this.closeForm.emit();
  }

  private resetForm() {
    this.photo = this.generateEmptyPhoto();
    this.photoForm.resetForm();
    this.photoForm.controls['thumbUrl'].setErrors(null);
  }

  ngOnInit(): void {
    this.photo = this.generateEmptyPhoto();
  }

  private generateEmptyPhoto() {
    return {
      imgUrl: '',
      thumbUrl: '',
      photoId: undefined
    };
  }

}
