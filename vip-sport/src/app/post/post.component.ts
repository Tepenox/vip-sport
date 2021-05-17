import { Component, Input, OnInit } from '@angular/core';
import { Role } from 'src/models/Role';
import { ThreadReply } from 'src/models/ThreadReply';
import { User } from 'src/models/User';
import { AuthenticationService } from '../services/authentication.service';
import { ForumPostService } from '../services/forum-post.service';
import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'f-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  @Input('postId') id: number
  @Input('firstPost') firstPost: boolean = false;
  post: ThreadReply;
  user: User;
  currentUser: User;
  currentUserRole: Role;

  constructor(private postService: ForumPostService, private userService: UserService, private authService: AuthenticationService, private roleService: RoleService) { }

  ngOnInit() {
    this.postService.getById(this.id)
      .subscribe((response: ThreadReply) => {
        this.post = response;
        this.post.date += " UTC";
        this.userService.getUserById(this.post.ownerId)
          .subscribe((response : User) => this.user = response);
      });

    this.currentUser = this.authService.getCurrentUser();

    this.roleService.getById(this.currentUser.roleId)
      .subscribe((response: Role) => {
        this.currentUserRole = response;
      });
  }

  deletePost() {
    console.log("Delete button clicked.");
  }
}
