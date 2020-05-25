import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ConsultarComponent } from './components/consultar/consultar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import { ListadoComponent } from './components/listado/listado.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogoComponent } from './components/dialogo/dialogo.component';
import { RegistroComponent } from './components/registro/registro.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { Login2Component } from './components/login2/login2.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import {MatMenuModule} from '@angular/material/menu';
import { DialoComponent } from './components/dialo/dialo.component';
import { AparicionesComponent } from './components/apariciones/apariciones.component';
import { PowerComponent } from './components/power/power.component';
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ConsultarComponent,
    ListadoComponent,
    DialogoComponent,
    RegistroComponent,
    Login2Component,
    IngresoComponent,
    DialoComponent,
    AparicionesComponent,
    PowerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    MatSelectModule,
    MatRadioModule,
    MatListModule,
    MatDialogModule,
    MatMenuModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
