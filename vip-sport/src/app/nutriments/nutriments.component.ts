import { Component, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/models/User';

@Component({
  selector: 'app-nutriments',
  templateUrl: './nutriments.component.html',
  styleUrls: ['./nutriments.component.css'],
})
export class NutrimentsComponent implements OnInit {
  @Input() user: User;

  public proteines: number;
  public glucides: number;
  public lipides: number;

  calories: number;

  constructor() {}

  ngOnInit(): void {}


  calculateCalories(multiplicator: number) {
    this.calories =
      multiplicator *
      (10 * this.user.weight + 6.25 * this.user.height - 5 * this.user.age + 5);
    if (multiplicator == 1) {
      this.proteines = 25;
      this.glucides = 40;
      this.lipides = 35;
    }
    if (multiplicator == 1.5) {
      this.proteines = 30;
      this.glucides = 40;
      this.lipides = 30;
    }
    if (multiplicator == 1.8) {
      this.proteines = 35;
      this.glucides = 40;
      this.lipides = 25;
    }
  }
}
