import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css'],
})
export class TrainerComponent implements OnInit {
  public apiUrl: String = 'https://wger.de/api/v2/exercise/?language=2';
  name: String;
  description: String;
  list = [];

  constructor() {}

  ngOnInit(): void {}

  async onClick() {
    const response = await fetch(this.apiUrl.toString());
    const data = await response.json();
    console.log(data);

    for (let i = 0; i < 19; i++) {
      let name = data.results[i].name;
      let descriptionNulle = data.results[i].description;
      let description = descriptionNulle.replaceAll(/(<([^>]+)>)/gi, '');
      this.addToList(name, description);
    }
  }

  addToList(name: string, desc: string) {
    this.list[this.list.length] = { name: name, description: desc };
  }
}

interface Exercice {
  name: string;
  description: string;
}
