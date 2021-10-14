import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jontyjr-ui-galley',
  templateUrl: './ui-galley.component.html',
  styles: [
  ]
})
export class UiGalleyComponent implements OnInit {
   selImg : string 

   @Input() images: string[]
   constructor() { }

  ngOnInit(): void {
    if(this.hasImg){
    this.selImg = this.images[0]
  }}


  changeSelectedImg(imgUrl : string){
    this.selImg = imgUrl
  }

  get hasImg (){
    return this.images?.length > 0;
  }

}
