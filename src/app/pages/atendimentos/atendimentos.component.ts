import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { AtendimentoService } from 'src/app/services/atendimento.service';

@Component({
  selector: 'app-atendimentos',
  templateUrl: './atendimentos.component.html',
  styleUrls: ['./atendimentos.component.scss']
})
export class AtendimentosComponent implements OnChanges, OnInit {
  atendimentoSelecionado!: any
  atendimentos: any[] = []
  isCriacao = false;
  paginaAtual = 1
  itensPorPagina = 10;

  formGroupFilter = this._formBuilder.group({
    nomePaciente: [''],
    queixaPrincipal: [''],
    diagnostico: ['']
  })

  constructor(private _atendimentoService: AtendimentoService, private _formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.carregaAtendimentos()

    const x = this.formGroupFilter.get('nomePaciente')

    x?.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
      this.carregaAtendimentos();
    })

    const y = this.formGroupFilter.get('queixaPrincipal')
    y?.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
      this.carregaAtendimentos();
    })

    const z = this.formGroupFilter.get('diagnostico')
    z?.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
      this.carregaAtendimentos();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.carregaAtendimentos()
  }

  selecionarAtendimento(paciente: any): void {
    this.isCriacao = !paciente.id
    this.atendimentoSelecionado = paciente;
  }

  carregaAtendimentos(): void {
    this.paginaAtual = 1;
    const resultFilter = this.formGroupFilter.getRawValue();
    const name = resultFilter.nomePaciente ?? ''
    const queixa = resultFilter.queixaPrincipal ?? '';
    const diagnostico  =resultFilter.diagnostico ?? ''

    this._atendimentoService.carregaAtendimentos(name, queixa, diagnostico).subscribe({
      next: (response) => this.atendimentos = response,
      error: (e) => console.log(e)
    })
  }

  fecharDetalhamento(): void {
    this.atendimentoSelecionado = null;
    this.isCriacao = false;

    this.carregaAtendimentos()
  }

  fecharCriacao() {
    this.isCriacao = false
    this.atendimentoSelecionado = null;

    this.carregaAtendimentos()
  }

  change($event: any): void {
    this.itensPorPagina = $event;
  }

}
