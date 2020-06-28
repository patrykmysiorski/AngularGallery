import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-gallery-search-by-year',
  templateUrl: './gallery-search-by-year.component.html',
  styleUrls: ['./gallery-search-by-year.component.scss']
})
export class GallerySearchByYearComponent implements OnInit {

  @Input() yearsArray: number[];

  @Output()
  searchYear: EventEmitter<number> = new EventEmitter<number>();

  value: number;

  constructor() { }

  ngOnInit(): void {
  }

  setValue = (value) => {
    this.value = value;
    this.onChange();
  }

  onChange() {
    this.searchYear.emit(this.value);
  }

}
