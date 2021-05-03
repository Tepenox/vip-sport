import { Component, OnInit } from '@angular/core';
import { Post} from 'src/models/PostComment';



@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  public isLocked = true;

  posts: Post[];
  categories:String[] = ["Halterophilie","Cyclisme","Judo","Bobsleigh","Ultimate","Tennis","Other"];

  constructor() { }

  ngOnInit(): void {
  }

  unlockAdd(){
    this.isLocked = false;
  }

}
