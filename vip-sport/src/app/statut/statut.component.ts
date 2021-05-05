import { Component, OnInit } from '@angular/core';
import {Comment} from 'src/models/PostComment';

@Component({
  selector: 'app-statut',
  templateUrl: './statut.component.html',
  styleUrls: ['./statut.component.css']
})
export class StatutComponent implements OnInit {

  replies:Comment[] = [new Comment()]; 
  

  constructor() { }

  ngOnInit(): void {
  }

}
