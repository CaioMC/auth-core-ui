import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { AtendimentosComponent } from './pages/atendimentos/atendimentos.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'prefix'},
  {path: 'login', component: LoginComponent},
  {path: 'sing-up', component: CadastroComponent},
  {path: 'patients', component: PacientesComponent},
  {path: 'services', component: AtendimentosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
