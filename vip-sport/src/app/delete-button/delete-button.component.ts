import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent {
  @Input('postId') postId: number;
  @Output('delete') delete = new EventEmitter();

  constructor() { }

  deletePost() {
    this.delete.emit();
  }
}
