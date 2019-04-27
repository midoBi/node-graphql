import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const submitBook = gql`
  mutation addBook(
    $isbn: String!,
    $title: String!,
    $author: String!,
    $description: String!,
    $publisher: String!,
    $published_year: Int!) {
    addBook(
      isbn: $isbn,
      title: $title,
      author: $author,
      description: $description,
      publisher: $publisher,
      published_year: $published_year) {
      _id
    }
  }
`;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  book: any = { isbn: '', title: '', author: '', description: '', publisher: '', publishedYear: null, updatedDate: null };
  isLoadingResults = false;
  resp: any = {};
  bookForm: FormGroup;
  isbn = '';
  title = '';
  author = '';
  description = '';
  publisher = '';
  publishedYear: number = null;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      isbn: [null, Validators.required],
      title: [null, Validators.required],
      author: [null, Validators.required],
      description: [null, Validators.required],
      publisher: [null, Validators.required],
      publishedYear: [null, Validators.required]
    });
  }

  get f() {
    return this.bookForm.controls;
  }

}
