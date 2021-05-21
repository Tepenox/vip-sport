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
import { CurrentSubcategoryResolver } from './resolvers/current-subcategory.resolver';
import { ThreadListResolver } from './resolvers/thread-list.resolver';
import { PagesResolver } from './resolvers/pages.resolver';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload'
};

const routes: Routes = [
  {path: '', component : WelcomeComponent, data: { title: 'VipSport' }},
  {path: 'welcome', component : WelcomeComponent, data: { title: 'VipSport' }},
  {path: 'profile/:id',canActivate:[AuthGuard], component : ProfileComponent, data: { title: 'Profil de ' }},
  {path: 'login', component : LoginComponent, data: { title: 'Connexion' }},
  {path: 'signup', component : SignUpComponent, data: { title: 'Inscription' }},
  {path: 'sportspage', component : CardComponent, data: { title: 'Sports' }},
  {path: 'trainer', component : TrainerComponent, data: { title: 'Exercices' }},
  {path: 'secret', canActivate :[AuthGuard],component : SecretComponent, data: { title: 'AMOGUS' }},
  {path: 'forum/:subcategoryID/thread/:threadID/:threadTitle', component : ThreadComponent, 
      resolve: { thread: ThreadResolver, subcategories: SubcategoriesResolver, currentSubcategory: CurrentSubcategoryResolver, pages: PagesResolver },
      data: { title: 'Sujet: ' }},
  {path: 'forum/:subcategoryID', component : ForumComponent, 
      resolve: { categories: CategoriesResolver, subcategories: SubcategoriesResolver, currentSubcategory: CurrentSubcategoryResolver, threadList: ThreadListResolver },
      data: { title: 'Forum - ' }},
  {path: 'forum', component : ForumComponent, resolve: { categories: CategoriesResolver, subcategories: SubcategoriesResolver, currentSubcategory: CurrentSubcategoryResolver },
      data: { title: 'Forum' }},
  {path: 'posts', component : WallComponent, data: { title: 'Mur' }},
  {path: 'posts/replies', component: CommentsComponent, data: { title: 'Mur' }},
  {path: '**', component : NoContentPageComponent, data: { title: '404' }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
