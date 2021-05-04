import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'thread-link',
  templateUrl: './thread-link.component.html',
  styleUrls: ['./thread-link.component.css']
})
export class ThreadLinkComponent implements OnInit {
  @Input('threadId') id: number;

  constructor() { }

  ngOnInit(): void {
  }

}
