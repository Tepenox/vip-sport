import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Thread } from 'src/models/Thread';
import { ThreadService } from '../services/thread.service';

@Component({
  selector: 'thread-link',
  templateUrl: './thread-link.component.html',
  styleUrls: ['./thread-link.component.css']
})
export class ThreadLinkComponent implements OnInit {
  @Input('threadId') id: number;
  subcategoryID: number;
  thread: Thread;

  constructor(private route: ActivatedRoute, private service: ThreadService) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => this.subcategoryID = +params.get('subcategoryID'));

    this.service.getById(this.id)
      .subscribe((response: Thread[]) => this.thread = response[0]);
  }

}
