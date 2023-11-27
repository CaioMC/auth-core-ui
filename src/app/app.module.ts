import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { MatButtonModule } from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { CadastroComponent } from './pages/cadastro/cadastro.component'
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import {MatCardModule} from '@angular/material/card';
import { BgCardComponent } from './components/bg-card/bg-card.component';
import { MenuComponent } from './components/menu/menu.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AtendimentosComponent } from './pages/atendimentos/atendimentos.component';
import { PacienteDetalhesComponent } from './pages/pacientes/paciente-detalhes/paciente-detalhes.component';
import { AngularSplitModule } from 'angular-split';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AtendimentosDetalhesComponent } from './pages/atendimentos/atendimentos-detalhes/atendimentos-detalhes.component';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
import { InterceptorTokenInterceptor } from './interceptor/interceptor-token.interceptor';
import { PacientesService } from './services/pacientes.service';
import { PacientesViewComponent } from './pages/pacientes/pacientes-view/pacientes-view.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AtendimentosViewComponent } from './pages/atendimentos/atendimentos-view/atendimentos-view.component';
import { PaginacaoComponent } from './components/paginacao/paginacao.component';




@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
     CadastroComponent,
     PacientesComponent,
     BgCardComponent,
     MenuComponent,
     AtendimentosComponent,
     PacienteDetalhesComponent,
     AtendimentosDetalhesComponent,
     PacientesViewComponent,
     AtendimentosViewComponent,
     PaginacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatStepperModule,
    MatSelectModule,
    MatCardModule,
    MatButtonToggleModule,
    AngularSplitModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    NgxPaginationModule,
    MatSnackBarModule,
    MatAutocompleteModule
  ],
  providers: [
    MatDatepickerModule,
    AuthService,
    provideNgxMask(),
    {
      provide: HTTP_INTERCEPTORS, useClass: InterceptorTokenInterceptor, multi:true
    },
    PacientesService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
