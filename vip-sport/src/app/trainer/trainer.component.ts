import { YoutubeAPIService } from './../services/youtube-api.service';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Exercice } from 'src/models/Exercice';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css'],
})
export class TrainerComponent implements OnInit {
  exercices: Exercice[];
  categories: number[];
  exercicesId: number[];

  constructor(private apiSportService: ApiService) {
    this.getCategories();
  }

  ngOnInit(): void {
    this.getExercise();
  }

  getExercise(filter?: number) {
    this.exercices = [];
    this.apiSportService.request(['exercise'], filter).subscribe(
      (data) => {
        this.exercices = data.results;
        this.exercices.map(async (exercice) => {
          exercice.description = exercice.description.replace(
            /(<([^>]+)>)/gi,
            ''
          );
          exercice.nameId = exercice.name.replace(/(\s+|\d+)/gi, '');
          return exercice;
        });
      },
      (err) => console.log(err)
    );
  }

  getCategories() {
    this.apiSportService.requestCategory().subscribe((data) => {
      this.categories = data.results;
      (err) => console.log(err);
    });
  }
}
