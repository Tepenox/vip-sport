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
  muscles: number[];
  exercicesId: number[];

  constructor(private apiSportService: ApiService) {
    this.getCategories();
    this.getMuscles();
  }

  ngOnInit(): void {
    this.getExercise(null,null);
  }

  getExercise(filter: number,muscle: number) {
    this.exercices = [];
    this.apiSportService.request(['exercise'], filter,muscle).subscribe(
      (data) => {
        this.exercices = data.results;
        this.exercices.map(async (exercice) => {
          exercice.description = exercice.description.replace(
            /(<([^>]+)>)/gi,
            ''
          );
          exercice.nameId = exercice.name.replace(/(\s+|\d+)/gi, '');
          exercice.imageUrl = "../assets/Workout/" + exercice.name + ".jpg";
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

  getMuscles() {
    this.apiSportService.requestMuscles().subscribe((data) => {
      this.muscles = data.results;
      (err) => console.log(err);
      console.log(this.muscles)
    });
  }
}
