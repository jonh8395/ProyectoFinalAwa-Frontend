import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultarComponent } from './components/consultar/consultar.component';
import { LoginComponent } from './components/login/login.component';

import { Login2Component } from './components/login2/login2.component';
import { RegistroComponent } from './components/registro/registro.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';


const routes: Routes = [
  {path: 'consultar' , component: ConsultarComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Login2' , component: Login2Component},
  {path: 'registro', component: RegistroComponent},
  {path: 'ingreso', component: IngresoComponent},
  {path: '**', redirectTo: 'consultar' , pathMatch: 'full'},


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
