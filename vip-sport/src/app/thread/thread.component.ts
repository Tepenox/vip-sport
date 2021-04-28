import { Component } from '@angular/core';

@Component({
  selector: 'f-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent {
  threadTitle = "Thread title"
  posts = [ 0, 1 , 2 ]
}
