import { AuthGuard } from './_helpers/auth.guard';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user/details/details.component';
import {UserCreateComponent} from "./user/create/create.component";
import {EtudiantComponent} from "./etudiant/etudiant.component";
import {TitreProComponent} from "./titre-pro/titre-pro.component";
import {TitreCreateComponent} from "./titre-pro/titre-create/titre-create.component";
import {TitreDetailComponent} from "./titre-pro/titre-detail/titre-detail.component";
import {VilleComponent} from "./ville/ville.component";
import {VilleCreateComponent} from "./ville/ville-create/ville-create.component";
import {VilleDetailComponent} from "./ville/ville-detail/ville-detail.component";
import {PromotionComponent} from "./promotion/promotion.component";
import {NiveauxComponent} from "./niveaux/niveaux.component";
import {NiveauxCreateComponent} from "./niveaux/niveaux-create/niveaux-create.component";

const routes: Routes = [
  { path:'', component: AdminComponent, canActivate: [AuthGuard]},
  { path:'home', component: HomeComponent},
  { path:'login', component: LoginComponent},
  { path:'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path:'users', component: UserComponent, canActivate: [AuthGuard]},
  { path:'villes', component: VilleComponent, canActivate: [AuthGuard]},
  { path:'users/:id/details', component: UserDetailsComponent, canActivate: [AuthGuard]},
  { path:'users/create', component: UserCreateComponent, canActivate: [AuthGuard]},
  { path:'users/update/:id', component: UserCreateComponent, canActivate: [AuthGuard]},
  { path:'etudiants', component: EtudiantComponent, canActivate: [AuthGuard]},
  { path:'etudiants/:id/details', component: UserDetailsComponent, canActivate: [AuthGuard]},
  { path:'etudiants/create', component: UserCreateComponent, canActivate: [AuthGuard]},
  { path:'etudiants/update/:id', component: UserCreateComponent, canActivate: [AuthGuard]},
  { path:'titres', component: TitreProComponent, canActivate: [AuthGuard]},
  { path:'titres/create', component: TitreCreateComponent, canActivate: [AuthGuard]},
  { path:'titres/update/:id', component: TitreCreateComponent, canActivate: [AuthGuard]},
  { path:'titres/:id/details', component: TitreDetailComponent, canActivate: [AuthGuard]},
  { path:'villes/create', component: VilleCreateComponent, canActivate: [AuthGuard]},
  { path:'villes/update/:id', component: VilleCreateComponent, canActivate: [AuthGuard]},
  { path:'villes/:id/details', component: VilleDetailComponent, canActivate: [AuthGuard]},
  { path:'promotions', component: PromotionComponent, canActivate: [AuthGuard]},
  { path:'niveaux', component: NiveauxComponent, canActivate: [AuthGuard]},
  { path:'niveaux/create', component: NiveauxCreateComponent, canActivate: [AuthGuard]},
  { path:'niveaux/update/:id', component: NiveauxCreateComponent, canActivate: [AuthGuard]},
/*
  { path:'niveaux/:id/details', component: NiveauxDetailComponent, canActivate: [AuthGuard]},
*/
  /*{ path:'promotions/create', component: PromotionCreateComponent, canActivate: [AuthGuard]},
  { path:'promotions/update/:id', component: PromotionCreateComponent, canActivate: [AuthGuard]},
  { path:'promotions/:id/details', component: PromotionDetailComponent, canActivate: [AuthGuard]},
*/


  //otherwire, redirect to AdminComponent
  { path:'**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

