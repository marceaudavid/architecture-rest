import { UnknownBookError } from '../errors/unknown-book.error'
import { BookDao } from '../dao/books.dao';
import { BookModel } from '../models/book.model';

const uuid = require('uuid')
const jwt = require('jsonwebtoken');

export class BooksService {
  private bookDAO: BookDao = new BookDao()

  public getAllBooks(params: any): BookModel[] {
      return this.bookDAO.list(params)
  }

  public createBook(book: BookModel) {
      if (!this.checkBookToCreateIsValid(book)) {
          throw new Error('invalid book');
      }

      const bookToCreate = {
          ...book,
          id: uuid.v4()
      }
      return this.bookDAO.create(bookToCreate);
  }

  public deleteBook(bookID: string, currentBookID: string) {
      if (bookID === currentBookID) {
          throw new Error('Book cannot remove himself !')
      }
      const Book = this.bookDAO.getByID(bookID);
      if (!Book) {
          throw new UnknownBookError('unknown Book')
      }
      return this.bookDAO.delete(bookID);
  }

  public updateBook(book: BookModel): BookModel {
      const existingBook = this.bookDAO.getByID(book.id);
      if (!existingBook) {
          throw new UnknownBookError('unknown Book')
      }
      const BookToUpdate = {
          ...existingBook,
          ...book
      }

      return this.bookDAO.update(BookToUpdate)
  }

  public addBookComment(bookID: string, comment: string): string {
      return this.bookDAO.addComment(bookID, comment)
  }

  private checkBookToCreateIsValid(book: BookModel) {
      return book && book.isbn && book.title && book.subtitle && book.author && book.published && book.publisher && book.pages && book.description && book.website
  }

}