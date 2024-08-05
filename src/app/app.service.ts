import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './models/book.model';
import { Author } from './models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private selectedAuthor: Author | undefined;

  constructor(private http: HttpClient) { }

  getAllAuthors(): Observable<Author[]>{
    return this.http.get<Author[]>("/api/author/get/all");
  }

  getAuthorById(id: string | null): Observable<Author>{
    return this.http.get<Author>(`/api/author/get/${id}`);
  }

  getBookById(id: string | null): Observable<Book>{
    return this.http.get<Book>(`/api/book/get/${id}`);
  }

  addNewAuthor(author: Author){
    return this.http.post("/api/author/add",author);
  }

  getBookListByAuthor(id: string | null): Observable<Book[]>{
    return this.http.get<Book[]>(`/api/book/get/author/${id}`);
  }

  deleteAuthorById(id: string) {
    return this.http.delete(`/api/author/delete/${id}`)
  }

  deleteBookById(id: string) {
    return this.http.delete(`/api/book/delete/${id}`)
  }

  addBook(book: Book){
    return this.http.post("/api/book/add",book);
  }

  getSelectedAuthor(): Author | undefined{
    return this.selectedAuthor;
  }
  setSelectedAuthor(author: Author | undefined): void{
    this.selectedAuthor = author;
  }
}
