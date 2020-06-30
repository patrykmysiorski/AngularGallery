import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-gallery-tag-form',
  templateUrl: './gallery-tag-form.component.html',
  styleUrls: ['./gallery-tag-form.component.scss']
})
export class GalleryTagFormComponent implements OnInit {
  @ViewChild('tagForm', {static: false})
  tagForm: NgForm;
  @Output()
  addTag = new EventEmitter();
  tag: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.tagForm.valid) {
      this.addTag.emit(this.tag);
      this.tagForm.resetForm();
      this.tag = '';
    }
  }

}
