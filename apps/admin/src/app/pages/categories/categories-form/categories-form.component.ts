/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@jontyjr/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {

   form: FormGroup
   isSubmited : boolean = false;
    editMode = false;
   currentCategoryId : string
  constructor(private formBuilder : FormBuilder,
               private categoriesService : CategoriesService ,
               private messageService: MessageService,  
               private location : Location  ,
               private route : ActivatedRoute       ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name:['',Validators.required],
        icon : ['',Validators.required],
        color:['#fff']

      }
    )

    this._checkEditMode();
  }

  onSubmit(){
    this.isSubmited = true;
    if(this.form.invalid){
      return
    }
    const category : Category = {
      _id: this.currentCategoryId,
      name : this.categoryForm.name.value,
      icon : this.categoryForm.icon.value,
      color : this.categoryForm.color.value
    };
    if(this.editMode){
      this._updateCategory(category)

    }else{
      this._addCategory(category)
    }
    
}

  goback(){
     
    
        this.location.back()

        
        
  }

  private _updateCategory(category:Category){
    this.categoriesService.updateCategory(category).subscribe((response) =>{
      this.messageService.add({
        severity:'success',
        summary: 'Success',
        detail : 'Category is updated'
      });
      timer(400).toPromise().then(
        (done) =>{
          this.location.back()
        }
      )
   },
   (error) =>{
     this.messageService.add({
       severity:'error',
       summary: 'Error',
       detail : 'Category is not updated'
     })
   }
   )
  }

  private  _addCategory(category : Category){
    this.categoriesService.createCategory(category).subscribe((category : Category) =>{
      this.messageService.add({
        severity:'success',
        summary: 'Success',
        detail : `Category ${category.name} is created`
      });
      timer(400).toPromise().then(
        (done) =>{
          this.location.back()
        }
      )
   },
   (error) =>{
     this.messageService.add({
       severity:'error',
       summary: 'Error',
       detail : 'Category is not created'
     })
   }
   )

  }

  private _checkEditMode(){
    this.route.params.subscribe(
      (params) => {
        if(params.id){
          this.editMode = true;
          this.currentCategoryId = params.id;
          this.categoriesService.getCategory(params.id).subscribe(
            (category) =>{
              this.categoryForm.name.setValue(category.name);
              this.categoryForm.icon.setValue(category.icon);
              this.categoryForm.color.setValue(category.color)
            }
          )
        }
      }
    )
  }

  get categoryForm() {
    return this.form.controls;
  }}


