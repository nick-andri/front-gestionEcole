import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {NgModel, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { UserCreateComponent } from './user/create/create.component';
import { UserDetailsComponent } from './user/details/details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule} from "@angular/material/icon";
import { EtudiantComponent } from './etudiant/etudiant.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import {
  RECAPTCHA_LANGUAGE,
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings
} from "ng-recaptcha";
import {environment} from "../environments/environment";
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { TitreProComponent } from './titre-pro/titre-pro.component';
import { TitreCreateComponent } from './titre-pro/titre-create/titre-create.component';
import { VilleComponent } from './ville/ville.component';
import { TitreDetailComponent } from './titre-pro/titre-detail/titre-detail.component';
import { VilleCreateComponent } from './ville/ville-create/ville-create.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { VilleDetailComponent } from './ville/ville-detail/ville-detail.component';
import { PromotionComponent } from './promotion/promotion.component';
import { NiveauxComponent } from './niveaux/niveaux.component';
import { NiveauxCreateComponent } from './niveaux/niveaux-create/niveaux-create.component';
import {NgxColorsModule} from "ngx-colors";
import { PromotionCreateComponent } from './promotion/promotion-create/promotion-create.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    UserCreateComponent,
    UserDetailsComponent,
    EtudiantComponent,
    NavbarComponent,
    SidebarComponent,
    TitreProComponent,
    TitreCreateComponent,
    VilleComponent,
    TitreDetailComponent,
    VilleCreateComponent,
    VilleDetailComponent,
    PromotionComponent,
    NiveauxComponent,
    NiveauxCreateComponent,
    PromotionCreateComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatIconModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatSidenavModule,NgxColorsModule

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS, useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'fr'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
