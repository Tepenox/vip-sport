import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../services/user.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit, Output } from '@angular/core';
import { User } from '../../models/User';
import { Post } from '../../models/Post';
import { PostService } from '../services/post.service';
import { FollowService } from '../services/follow.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  notYours: boolean;
  descriptionMaxLength: number = 500;
  usernameMaxLength: number = 40;
  followersCount: any;
  isFollowing: any;
  profileModification: boolean = false;
  imc: number = 0.0;
  styleExp: string = 'black';
  posts: Post[];
  user: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private postService: PostService,
    private follow: FollowService,
    private activatedRoute: ActivatedRoute,
    private auth: AuthenticationService,
    private titleService: Title
  ) {
    this.route.paramMap.subscribe((params) => {
      this.userService
        .getUserById(parseInt(params.get('id')))
        .subscribe((data) => {
          this.user = data;
          this.setFollowing(this.user.id);
          this.getFollowersCount(this.user.id);
          this.notYours = auth.getCurrentUser().id != parseInt(params.get('id'));
          this.calculateImc();
          this.getPosts();
          this.titleService.setTitle(
            this.titleService.getTitle() + ' ' + this.user.userName
          );
        });
    });
  }

  ngOnInit(): void {
  }

  setFollowing(userId: number) {
    this.follow
      .isFollowing(this.auth.getCurrentUser().id, userId)
      .subscribe((val) => {
        this.isFollowing = val;
      });
  }

  getFollowersCount(userId: number) {
    this.follow.getCount(userId).subscribe((val) => {
      this.followersCount = val.count;
    });
  }

  getPosts() {
   // this.activatedRoute.queryParams.subscribe((params) => {
      this.postService.getPostsByOwnerId(this.user.id).subscribe((data) => {
        this.posts = data;
        console.log(this.posts)
      });
   // });
  }

  enableProfileModif() {
    this.profileModification = !this.profileModification;
  }

  saveModification() {
    this.profileModification = !this.profileModification;
    this.route.paramMap.subscribe((params) => {
      this.userService
        .modifyUserById(parseInt(params.get('id')), this.user)
        .subscribe((data) => {
          this.user = data;
          this.calculateImc();
        });
    });
  }

  calculateImc() {
    let height = this.user.height / 100;
    let weigth = this.user.weight;
    this.imc = weigth / (height * height);
    if (this.imc <= 18.5) {
      this.styleExp = 'lightblue';
    }
    if (18.5 < this.imc && this.imc < 25) {
      this.styleExp = '#198754';
    }
    if (25 < this.imc && this.imc < 30) {
      this.styleExp = '#ffc107';
    }
    if (30 < this.imc && this.imc < 35) {
      this.styleExp = 'blue';
    }
    if (35 < this.imc) {
      this.styleExp = 'red';
    }
  }

  addFriend() {
    this.follow.followById(this.user.id).subscribe((val) => {
      this.setFollowing(this.user.id);
      this.getFollowersCount(this.user.id);
    });
  }

  unfriend() {
    this.follow
      .deleteFollow(this.auth.getCurrentUser().id, this.user.id)
      .subscribe((val) => {
        this.setFollowing(this.user.id);
        this.getFollowersCount(this.user.id);
      });
  }
}
