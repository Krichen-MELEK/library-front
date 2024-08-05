import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { Author } from '../models/author.model';
import { Book } from '../models/book.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.scss'
})
export class AuthorDetailsComponent {
  currentAuthorId: string | null = "";
  currentAuthor: Author | undefined;
  currentAuthorBookList: Book[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.currentAuthorId = this.route.snapshot.paramMap.get('id');
    this.appService.getAuthorById(this.currentAuthorId).subscribe({
      next: author => this.currentAuthor = author
    })
    this.LoadBookList();
  }

  addNewBook() {
    this.appService.setSelectedAuthor(this.currentAuthor);
    this.router.navigate(['/add-book']);

  }
  geBack() {
    this.router.navigate(['/']);
  }
  deleteBook(book: Book) {
    

    this.confirmationService.confirm({
      message: 'Do you want to delete this book?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.appService.deleteBookById(book.id).subscribe({
          next: () => {
            this.LoadBookList();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Book deleted successfully' })
          }
        })
      }
    });
  }
  editBook(book: Book) {
    this.appService.setSelectedAuthor(this.currentAuthor);
    this.router.navigate(['/edit-book', book.id])
  }
  LoadBookList(){
    this.appService.getBookListByAuthor(this.currentAuthorId).subscribe({
      next: data => this.currentAuthorBookList = data
    })
  }
}
