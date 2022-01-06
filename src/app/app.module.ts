import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'



import { AppComponent } from './app.component';
import { ConsignarComponent } from './pages/consignar/consignar.component';
import { RetirarComponent } from './pages/retirar/retirar.component';
import { ConsultarComponent } from './pages/consultar/consultar.component';
import { CrearComponent } from './pages/crear/crear.component';

import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    ConsignarComponent,
    RetirarComponent,
    ConsultarComponent,
    CrearComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
