import { Component, OnInit } from '@angular/core';

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
