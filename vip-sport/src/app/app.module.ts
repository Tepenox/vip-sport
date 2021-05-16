import { TokenInterceptorService } from './services/token-interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import{ChartsModule} from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PostComponent } from './post/post.component';
import { ThreadComponent } from './thread/thread.component';
import { LoginComponent } from './login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PiechartComponent } from './piechart/piechart.component';
import { ProfileComponent } from './profile/profile.component';
import { CardComponent } from './card/card.component';
import { TrainerComponent } from './trainer/trainer.component';
import { ForumComponent } from './forum/forum.component';
import { PostFormComponent } from './post-form/post-form.component';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { SecretComponent } from './secret/secret.component';
import { ForumService } from './services/forum.service';
import { ThreadLinkComponent } from './thread-link/thread-link.component';
import { LikeDislikeComponent } from './like-dislike/like-dislike.component';
import { WallComponent } from './wall/wall.component';
import { CommentaireFormComponent } from './commentaire-form/commentaire-form.component';
import {StatutComponent} from './statut/statut.component';
import { ReplyFormComponent } from './reply-form/reply-form.component';
import { ThreadFormComponent } from './thread-form/thread-form.component';
import { ThreadCreationFormComponent } from './thread-creation-form/thread-creation-form.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    PostComponent,
    ThreadComponent,
    LoginComponent,
    SignUpComponent,
    PiechartComponent,
    ProfileComponent,
    CardComponent,
    TrainerComponent,
    ForumComponent,
    PostFormComponent,
    SecretComponent,
    ThreadLinkComponent,
    LikeDislikeComponent,
    WelcomeComponent,
    WallComponent,
    CommentaireFormComponent,
    StatutComponent,
    ReplyFormComponent,
    ThreadFormComponent,
    ThreadCreationFormComponent,
    DeleteButtonComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,ReactiveFormsModule,
    ChartsModule,
    TextareaAutosizeModule,
    HttpClientModule,
    
  ],
  providers: [ForumService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
