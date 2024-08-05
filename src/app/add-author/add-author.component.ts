import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { MessageService } from 'primeng/api';
import { Author } from '../models/author.model';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrl: './add-author.component.scss'
})
export class AddAuthorComponent implements OnInit {

  authorForm: FormGroup;
  authorForEdit: Author | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private appService: AppService,
    private messageService: MessageService) {
    this.authorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const idAuthorForEdit = this.route.snapshot.paramMap.get('id');
    if (idAuthorForEdit) {
      this.appService.getAuthorById(idAuthorForEdit).subscribe({
        next: author => {
          this.authorForEdit = author;
          this.authorForm = this.fb.group({
            firstName: [author.firstName, Validators.required],
            lastName: [author.lastName, Validators.required]
          });
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
  save() {
    if (this.authorForm.valid) {
      let authorToSave = this.authorForm.value;
      if (this.authorForEdit) {
        authorToSave.id = this.authorForEdit.id;
      }
      this.appService.addNewAuthor(this.authorForm.value).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Author added successfully' })
          this.router.navigate(['/']);
        }

      })
    }
  }

}
