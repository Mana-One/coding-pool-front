import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './web-components/home-page/home-page.component';
import { NotFoundPageComponent } from './web-components/not-found-page/not-found-page.component';
import { FooterComponent } from './web-components/global-web-components/footer/footer.component';
import { NavBarComponent } from './web-components/global-web-components/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RegisterPageComponent} from './web-components/register-page/register-page.component';
import {LoginPageComponent} from './web-components/login-page/login-page.component';
import { AboutUsComponent } from './web-components/global-web-components/about-us/about-us.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HttpTokenInterceptor} from './special-implementation/http-token-interceptor';
import { ConnectedUserPageLayoutComponent } from './web-components/connected-user-page-layout/connected-user-page-layout.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MyAccountComponent } from './web-components/my-account/my-account.component';
import {AngularResizedEventModule} from 'angular-resize-event';
import { DisconnectedPageLayoutComponent } from './web-components/disconnected-page-layout/disconnected-page-layout.component';
import { BoardComponent } from './web-components/board/board.component';
import { CodeEditorComponent } from './web-components/code-editor/code-editor.component';
import { UserPageComponent } from './web-components/user-page/user-page.component';
import {MatDialogModule} from '@angular/material/dialog';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { PublicationComponent } from './web-components/publication/publication.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { LogoutComponent } from './web-components/logout/logout.component';
import { SearchUserComponent } from './web-components/search-user/search-user.component';
import { PortfolioComponent } from './web-components/portfolio/portfolio.component';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MyPortfolioComponent } from './web-components/my-portfolio/my-portfolio.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ContestsComponent } from './web-components/contests/contests.component';
import { CreateAdminComponent } from './web-components/create-admin/create-admin.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { ContestComponent } from './web-components/contest/contest.component';
import { ContestClassementComponent } from './web-components/contest-classement/contest-classement.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NotFoundPageComponent,
    FooterComponent,
    NavBarComponent,
    AboutUsComponent,
    ConnectedUserPageLayoutComponent,
    MyAccountComponent,
    DisconnectedPageLayoutComponent,
    BoardComponent,
    CodeEditorComponent,
    UserPageComponent,
    PublicationComponent,
    LogoutComponent,
    SearchUserComponent,
    PortfolioComponent,
    MyPortfolioComponent,
    ContestsComponent,
    CreateAdminComponent,
    ContestComponent,
    ContestClassementComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatIconModule,
        MatSliderModule,
        MatInputModule,
        ReactiveFormsModule,
        SocialLoginModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatListModule,
        AngularResizedEventModule,
        MatDialogModule,
        InfiniteScrollModule,
        MatExpansionModule,
        MatOptionModule,
        MatSelectModule,
        MatProgressBarModule,
        MatTabsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        FormsModule,
    ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('307511357267-597g5h4tc0639950okcat16jof3v0aqr.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
