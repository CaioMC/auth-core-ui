import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-atendimentos-detalhes',
  templateUrl: './atendimentos-detalhes.component.html',
  styleUrls: ['./atendimentos-detalhes.component.scss']
})
export class AtendimentosDetalhesComponent implements OnChanges, OnInit {

  @Output('carregarAtendimentos') carregarAtendimentos = new EventEmitter<any>()
  @Output('fecharCriacao') fecharCriacao = new EventEmitter<any>()
  @Output('fecharEditar') fecharEditar = new EventEmitter<any>()

  @Input('atendimentoSelecionado') atendimentoSelecionado!: any

  pacientes: any[] = []
  filteredOptions!: Observable<any[]>;

  formGroupAtendimento: FormGroup = this._formBuilder.group({
    pacienteId: ['', Validators.required],
    queixaPrincipal: ['', Validators.required],
    dataAtendimento: [null]
  })

  formGroupProntuario: FormGroup = this._formBuilder.group({
    historicoAntecedentes: ['', Validators.required],
    exameFisico: ['', Validators.required],
    condutas: ['', Validators.required],
    diagnostico: ['', Validators.required]
  })

  constructor(private _formBuilder: FormBuilder, private _pacientes: PacientesService, private _atendinetoService: AtendimentoService) {
  }
  ngOnInit(): void {
    this._pacientes.carregarTodosPacientes('').subscribe({
      next: (response) => {
        console.log(response)
        this.pacientes = response
        console.log(this.pacientes)
        const control = this.formGroupAtendimento.get('pacienteId');
        if (this.atendimentoSelecionado.pacienteId) {
          this.formGroupAtendimento.setValue({
            pacienteId: this.atendimentoSelecionado.pacienteId,
            queixaPrincipal: this.atendimentoSelecionado.queixaPrincipal,
            dataAtendimento: this.atendimentoSelecionado.dataAtendimento
          })
        }

    if (control) {
      this.filteredOptions = control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    }
      }
    })

    if (this.atendimentoSelecionado.id) {
      this.formGroupAtendimento.setValue({
        pacienteId: this.atendimentoSelecionado.pacienteId,
        queixaPrincipal: this.atendimentoSelecionado.queixaPrincipal,
        dataAtendimento: this.atendimentoSelecionado.dataAtendimento
      })

      this.formGroupProntuario.setValue({
        historicoAntecedentes: this.atendimentoSelecionado.historicoAntecedentes,
        exameFisico: this.atendimentoSelecionado.exameFisico,
        condutas: this.atendimentoSelecionado.condutas,
        diagnostico: this.atendimentoSelecionado.diagnostico
      });
    }

  }

  displayFn(data: any): string {
    const pa = this.pacientes?.find((paci) => paci.id ===data)
    return pa && pa.nome ? pa.nome : '';
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  concluirCadastro(): void {
    const data = {...this.formGroupAtendimento.getRawValue(), ...this.formGroupProntuario.getRawValue()}

    if (this.atendimentoSelecionado?.id) {
      data.id = this.atendimentoSelecionado.id
      this._atendinetoService.editarAtendimento(data).subscribe({
        next: (response) => {
          this.fecharEditar.emit()
        },
        error: (e) => console.log(e)
      })
      return;
    }

    data.dataAtendimento = new Date()
    this._atendinetoService.incluirAtendimento(data).subscribe({
      next: (response) => {
        this.carregarAtendimentos.emit()
        this.fecharEmit()
      },
      error: (e) => console.log(e)
    })
  }

  fecharEmit(): void {
    if (this.atendimentoSelecionado?.id) {
      this.fecharEditar.emit();
      return;
    }

    this.fecharCriacao.emit()
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.pacientes.filter(pacientes => pacientes.nome.toLowerCase().includes(filterValue));
  }

}
