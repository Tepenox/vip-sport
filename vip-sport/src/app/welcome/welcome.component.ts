import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  images: String[] = [
    '../assets/carroussel/1.jpg',
    '../assets/carroussel/2.jpg',
    '../assets/carroussel/3.jpg',
    '../assets/carroussel/4.jpg',
    '../assets/carroussel/5.jpg'
  ];

  constructor() {
  }

  ngOnInit(): void {}
}
