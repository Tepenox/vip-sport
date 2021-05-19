import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './auth.guard';
import { SecretComponent } from './secret/secret.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { CardComponent } from './card/card.component';
import { ForumComponent } from './forum/forum.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ThreadComponent } from './thread/thread.component';
import { TrainerComponent } from './trainer/trainer.component';
import { WallComponent } from './wall/wall.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CommentsComponent } from './comments/comments.component';
import { NoContentPageComponent } from './no-content-page/no-content-page.component';
import { ThreadReplyResolver } from './resolvers/thread-reply.resolver';
import { ThreadResolver } from './resolvers/thread.resolver';
import { CategoriesResolver } from './resolvers/categories.resolver';
import { SubcategoriesResolver } from './resolvers/subcategories.resolver';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload'
};

const routes: Routes = [
  {path: '', component : WelcomeComponent},
  {path: 'welcome', component : WelcomeComponent},
  {path: 'profile/:id',canActivate:[AuthGuard],component : ProfileComponent},
  {path: 'login', component : LoginComponent},
  {path: 'signup', component : SignUpComponent},
  {path: 'sportspage', component : CardComponent},
  {path: 'trainer', component : TrainerComponent},
  {path: 'secret', canActivate :[AuthGuard],component : SecretComponent},
  {path: 'forum/:subcategoryID/thread/:threadID/:threadTitle', component : ThreadComponent, resolve: { replies: ThreadReplyResolver, thread: ThreadResolver, subcategories: SubcategoriesResolver }},
  {path: 'forum/:subcategoryID', component : ForumComponent, resolve: { categories: CategoriesResolver, subcategories: SubcategoriesResolver }},
  {path: 'forum', component : ForumComponent, resolve: { categories: CategoriesResolver, subcategories: SubcategoriesResolver }},
  {path: 'posts', component : WallComponent},
  {path: 'posts/replies', component: CommentsComponent},
  {path: '**', component : NoContentPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
