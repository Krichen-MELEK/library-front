import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Author } from '../models/author.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.scss'
})
export class AuthorListComponent {
  authors: Author[] = [];

  constructor(
    private appService: AppService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.LoadAuthorList();
  }

  private LoadAuthorList() {
    this.appService.getAllAuthors().subscribe({
      next: data => {
        this.authors = data;
      }
    });
  }

  selectAuthor(author: Author) {
    this.router.navigate(['/author', author.id])
  }

  editAuthor(author: Author) {
    this.router.navigate(['/edit-author', author.id])
  }

  navigateToAddAuthorPage() {
    this.router.navigate(['/add-author'])
  }

  deleteAuthor(author: Author) {  
    this.confirmationService.confirm({
      message: 'Do you want to delete this author?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.appService.deleteAuthorById(author.id).subscribe({
          next: () => {
            this.LoadAuthorList();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Author deleted successfully' })
          }
        })
      }
    });
  }
}
