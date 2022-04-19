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

const routes: Routes = [
  /*
  { path: '', component: DisconnectedPageLayoutComponent,
    canActivate: [AuthGuardDisconnectedService],
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
    ]
  },
   */
  { path: '', component: ConnectedUserPageLayoutComponent,
    //canActivate: [AuthGuardConnectedService],
    children: [
      { path: 'my-account', component: MyAccountComponent },
      { path: 'board', component: BoardComponent },
    ]
  },

  { path: '404', component: NotFoundPageComponent },

  { path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
