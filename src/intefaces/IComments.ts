export interface IComment {
  galleryId: string;
  commentId?: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  dateCreated: Date;
}
