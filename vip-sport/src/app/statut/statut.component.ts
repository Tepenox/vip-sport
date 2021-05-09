import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/models/Post';
import { User } from 'src/models/User';
import { UserService } from '../services/user.service';




/// <reference path="wall.component.ts" />


@Component({
  selector: 'app-statut',
  templateUrl: './statut.component.html',
  styleUrls: ['./statut.component.css']
})
export class StatutComponent implements OnInit {

  @Input() userPost:Post;

  public ownerUser:User;


  constructor(private userService:UserService) {
   
   }

  ngOnInit(): void {
    this.userService.getUserById(this.userPost.ownerId).subscribe(data => {
      this.ownerUser = data;
    } )

  }

}
