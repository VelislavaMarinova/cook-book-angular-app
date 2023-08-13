import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { imageUrlValidator } from '../shared/validators/url-validator';
import { ApiService } from '../api.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private router: Router
    ) { };

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.categoryForm = new FormGroup({
      'catName': new FormControl('', [Validators.required]),
      'imageUrl': new FormControl('', [Validators.required, imageUrlValidator()]),
    });
  };
  onSubmit() {

    this.apiService.addCategory(this.categoryForm.value).subscribe({
      next:()=>{
        this.router.navigate([`/recipes`])
      },
      error:(err)=>{
        console.log(`Error ${err.message}`);
      }
    });
  }
}
