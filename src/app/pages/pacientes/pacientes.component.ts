import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  pacienteSelecionado!: any
  paginaAtual: number = 1;
  pacientes: any[] = []
  isCriacao: boolean = false;
  itensPorPagina = 10;

  formGroup: FormGroup = this._formBuilder.group({
    nomePaciente: ['']
  })

  constructor(
    private _pacientesService: PacientesService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.carregarPacientes()

    const x = this.formGroup.get('nomePaciente')

    x?.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
      this.carregarPacientes();
    })
  }

  carregarPacientes(): void {
    this.paginaAtual = 1;
    const name = this.formGroup.getRawValue().nomePaciente ?? ''
    this._pacientesService.carregarTodosPacientes(name).subscribe({
      next: (response) => this.pacientes = response,
      error: (e) => console.log(e)
    })
  }

  selecionarPaciente(paciente: any): void {
    this.isCriacao = !paciente?.nome
    this.pacienteSelecionado = paciente;
  }

  fecharDetalhamento(): void {
    this.pacienteSelecionado = null;
    this.isCriacao = false;

    this.carregarPacientes()
  }

  fecharCriacao(): void {
    this.pacienteSelecionado = null;
    this.isCriacao = false;
  }

  change($event: any): void {
    this.itensPorPagina = $event;
  }

}
