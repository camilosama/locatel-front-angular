import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrearComponent} from './pages/crear/crear.component';
import { RetirarComponent} from './pages/retirar/retirar.component';
import { ConsignarComponent} from './pages/consignar/consignar.component';
import { ConsultarComponent} from './pages/consultar/consultar.component';

import { AppComponent} from './app.component';

const routes: Routes = [
  { path: 'crear', component: CrearComponent },
  { path: 'retirar', component: RetirarComponent },
  { path: 'consignar', component: ConsignarComponent },
  { path: 'consultar', component: ConsultarComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
