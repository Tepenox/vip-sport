import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { ForumComponent } from './forum/forum.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TrainerComponent } from './trainer/trainer.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: '', component : WelcomeComponent},
  {path: 'welcome', component : WelcomeComponent},
  {path: 'profile', component : ProfileComponent},
  {path: 'login', component : LoginComponent},
  {path: 'signup', component : SignUpComponent},
  {path: 'sportspage', component : CardComponent},
  {path: 'trainer', component : TrainerComponent},
  {path: 'forum', component : ForumComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
