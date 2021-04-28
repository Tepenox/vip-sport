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
import {HttpClientModule} from '@angular/common/http'

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
    TrainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,ReactiveFormsModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
