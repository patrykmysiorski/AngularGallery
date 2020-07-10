import {IPhoto} from './IPhoto';

export interface INews {
  newsId?: string;
  title: string;
  shortContent: string;
  fullContent: string;
  dateCreated: Date;
  photo?: IPhoto;
}
