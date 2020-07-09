import {Component, Input, OnInit} from '@angular/core';
import {INews} from '../../../../intefaces/INews';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.scss']
})
export class SingleNewsComponent implements OnInit {

  @Input() news: INews;

  constructor() { }

  ngOnInit(): void {
  }

}
