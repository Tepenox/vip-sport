import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  infos = [
    {
      age: '21',
      sport: 'Vélo',
      citation: 'Go Muscu',
      weigth: '80',
    },
  ];
  moreInfos = [
    { content: 'Regime haute protéine' },
    { content: 'Sportif monstreux' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
