import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit {

  @Output()
  moveForward = new EventEmitter();

  @Output()
  moveBack = new EventEmitter();

  @Output()
  setCurrentPage = new EventEmitter();

  @Input() itemsList: any;
  @Input() currentPage: number;
  @Input() numberOfPages: [];

  onMoveBack() {
    this.moveBack.emit(this.currentPage - 1);
  }

  onSetCurrentPage(numberOfPage) {
    this.setCurrentPage.emit(numberOfPage);
  }

  onMoveForward() {
    this.moveForward.emit(this.currentPage + 1);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
