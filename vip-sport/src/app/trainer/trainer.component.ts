import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Exercice } from 'src/models/Exercice';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css'],
})
export class TrainerComponent implements OnInit {
  exercices: Exercice[] ;

  constructor(private apiSportService: ApiService) {}

  ngOnInit(): void {}

  onClick() {
    // const response = await fetch(this.apiUrl.toString());
    // const data = await response.json();
    // console.log(data);

    // for (let i = 0; i < 19; i++) {
    //   let name = data.results[i].name;
    //   let descriptionNulle = data.results[i].description;
    //   let description = descriptionNulle.replaceAll(/(<([^>]+)>)/gi, '');
    //   this.addToList(name, description);    // }

    this.apiSportService.request(['exercise']).subscribe(
      (data) => {
        this.exercices = data.results
        this.exercices.map(async (exercice) => {
          exercice.description = exercice.description.replace(/(<([^>]+)>)/gi, '');
          exercice.nameId = exercice.name.replace(/(\s+|\d+)/gi,"")
          console.log( exercice.nameId );
          await this.assignImageId(exercice);
          return exercice;
        });
        console.log(this.exercices);
      },
      (err) => console.log(err)
    );
    
    
  }

  assignImageId(exercice:Exercice){
    this.apiSportService.request(['exerciseimage',exercice.id,'thumbnails']).subscribe((data)=>{
      exercice.image = "https://wger.de/"+data.medium_cropped.url;
    },(err) => console.log(err))
  }
}
