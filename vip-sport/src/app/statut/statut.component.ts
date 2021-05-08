import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/models/User';


/// <reference path="wall.component.ts" />


@Component({
  selector: 'app-statut',
  templateUrl: './statut.component.html',
  styleUrls: ['./statut.component.css']
})
export class StatutComponent implements OnInit {

  @Input() userInput:string;
  @Input() user:User;

  constructor() {
   }

  ngOnInit(): void {
  }

}
