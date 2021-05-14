import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent {
  @Input('postId') postId: number;

  constructor() { }

  deletePost() {
    console.log(this.postId);
  }

}
