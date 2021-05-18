import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input('isFirstPost') isFirstPost: boolean;
  @Output('delete') delete = new EventEmitter();
  post: ThreadReply;
  user: User;
  currentUser: User;
  currentUserRole: Role;

  constructor(private postService: ForumPostService, private userService: UserService, public authService: AuthenticationService, private roleService: RoleService) { }

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
    let confirmation = this.setConfirmationString();
    if (confirm(confirmation)) {
      if (this.isFirstPost)
        this.delete.emit();
      else {
        this.postService.delete(this.id)
          .subscribe(() => {} );
        window.location.reload();
      }
    }
  }

  private setConfirmationString(): string {
    let message = "Voulez-vous vraiment supprimer ce message ?";
    if (this.isFirstPost)
      message += " Celui-ci étant le premier message du sujet, ce sujet sera supprimé.";
    return message;
  }
}
