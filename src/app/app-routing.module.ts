import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from './web-components/home-page/home-page.component';
import {NotFoundPageComponent} from './web-components/not-found-page/not-found-page.component';
import {LoginPageComponent} from './web-components/login-page/login-page.component';
import {RegisterPageComponent} from './web-components/register-page/register-page.component';
import {AboutUsComponent} from './web-components/global-web-components/about-us/about-us.component';
import {ConnectedUserPageLayoutComponent} from './web-components/connected-user-page-layout/connected-user-page-layout.component';
import {MyAccountComponent} from './web-components/my-account/my-account.component';
import {AuthGuardConnectedService} from './special-implementation/auth-guard-connected.service';
import {AuthGuardDisconnectedService} from './special-implementation/auth-guard-disconnected.service';
import {DisconnectedPageLayoutComponent} from './web-components/disconnected-page-layout/disconnected-page-layout.component';
import {CodeEditorComponent} from './web-components/code-editor/code-editor.component';
import {BoardComponent} from './web-components/board/board.component';
import {PublicationComponent} from './web-components/publication/publication.component';
import {LogoutComponent} from './web-components/logout/logout.component';
import {SearchUserComponent} from './web-components/search-user/search-user.component';
import {MyPortfolioComponent} from './web-components/my-portfolio/my-portfolio.component';
import {AuthGuardConnectedAdminService} from './special-implementation/auth-guard-connected-admin.service';
import {ContestsComponent} from './web-components/contests/contests.component';
import {CreateAdminComponent} from './web-components/create-admin/create-admin.component';
import {ContestComponent} from './web-components/contest/contest.component';

const routes: Routes = [
  { path: '', component: DisconnectedPageLayoutComponent,
    canActivate: [AuthGuardDisconnectedService],
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
    ]
  },
  { path: '', component: ConnectedUserPageLayoutComponent,
    canActivate: [AuthGuardConnectedAdminService], data : { role: 'admin'},
    children: [
      { path: 'create-admin', component: CreateAdminComponent },
      { path: 'create-contest', component: ContestsComponent, data : { type: 'admin'} },
      { path: 'contest/:id', component: ContestComponent, data : { type: 'admin'} },
    ]
  },

  { path: '', component: ConnectedUserPageLayoutComponent,
    canActivate: [AuthGuardConnectedService], data : { role: 'user'},
    children: [
      { path: 'my-account', component: MyAccountComponent },
      { path: 'board', component: BoardComponent, data : { type: 'home'} },
      { path: 'my-messages', component: BoardComponent, data : { type: 'me'} },
      { path: 'user/:id', component: BoardComponent, data : { type: 'user'} },
      { path: 'publication/:id', component: PublicationComponent },
      { path: 'users', component: SearchUserComponent },
      { path: 'my-portfolio', component: MyPortfolioComponent, data : { type: 'me'} },
      { path: 'program/:id', component: CodeEditorComponent },
      { path: 'user-portfolio/:id', component: MyPortfolioComponent, data : { type: 'outsider'} },
      { path: 'contests', component: ContestsComponent, data : { type: 'user'} },
      { path: 'contest/:id', component: ContestComponent },
    ]
  },

  { path: 'logout', component: LogoutComponent },

  { path: '404', component: NotFoundPageComponent },

  { path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
