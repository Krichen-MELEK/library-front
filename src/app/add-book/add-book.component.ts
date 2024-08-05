import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '../models/author.model';
import { AppService } from '../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Book } from '../models/book.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
  providers: [DatePipe]
})
export class AddBookComponent implements OnInit, OnDestroy {
  currentAuthor: Author | undefined;
  bookForEdit: Book | undefined;
  bookForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private appService: AppService,
    private messageService: MessageService) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      publicationDate: ['']
    });
  }

  ngOnInit(): void {
    this.currentAuthor = this.appService.getSelectedAuthor();
    const idBookForEdit = this.route.snapshot.paramMap.get('id');
    if (idBookForEdit) {
      this.appService.getBookById(idBookForEdit).subscribe({
        next: book => {
          this.bookForEdit = book;
          this.bookForm = this.fb.group({
            title: [book.title, Validators.required],
            price: [book.price, Validators.required],
            publicationDate: [ this.datePipe.transform(book.publicationDate,"yyyy-MM-dd")]
          });
        }
      });
    }
  }

  save() {
    if (this.bookForm.valid) {
      console.log(this.bookForm.value);
      let book = this.bookForm.value as Book;
      book.author = this.currentAuthor!;
      if (this.bookForEdit) {
        book.id = this.bookForEdit.id;
      }
      this.appService.addBook(book).subscribe({
        next: () => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Book added successfully'})
          this.router.navigate(['/author', this.currentAuthor?.id]);
        }
      })
    }
  }

  cancel() {
    console.log(this.currentAuthor);
    
    this.router.navigate(['/author', this.currentAuthor?.id]);
  }

  ngOnDestroy(): void {
    this.appService.setSelectedAuthor(undefined);
  }
}
