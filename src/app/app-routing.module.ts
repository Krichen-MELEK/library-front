import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { AddBookComponent } from './add-book/add-book.component';

const routes: Routes = [
  {
    path: "",
    component: AuthorListComponent
  },
  {
    path: "author/:id",
    component: AuthorDetailsComponent
  },
  {
    path: "add-author",
    component: AddAuthorComponent
  },
  {
    path: "edit-author/:id",
    component: AddAuthorComponent
  },
  {
    path: "add-book",
    component: AddBookComponent
  },
  {
    path: "edit-book/:id",
    component: AddBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
