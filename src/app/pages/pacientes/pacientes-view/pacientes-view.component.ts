import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-pacientes-view',
  templateUrl: './pacientes-view.component.html',
  styleUrls: ['./pacientes-view.component.scss']
})
export class PacientesViewComponent implements OnInit, OnChanges {
  @Input('paciente') paciente!: any;
  @Output('fecharDetalhamento') fecharDetalhamento = new EventEmitter<any>()
  @Output('carregarPacientes') carregarPacientes = new EventEmitter<any>()


  isEditContract: boolean = false;

  constructor(
    private pacienteService: PacientesService,
    private _atendimentoService: AtendimentoService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.carregaPaciente()
  }
  
  ngOnInit(): void {
    this.carregaPaciente()
  }

  carregaPaciente(): void {
    this.pacienteService.carregarPaciente(this.paciente.id).subscribe({
      next: (response) => this.paciente = response,
      error: (e) => console.log(e)
    })
  }

  deletarPaciente(): void {
    this._atendimentoService.carregaAtendimentos('', '', '').subscribe({
      next: (response) => {
        debugger;
        const item = response.find((atendimento: any) => atendimento.nomePaciente === this.paciente.nome)
        if (item) {
          this._snackBar.open('Não é possível excluir um paciente que já foi atendido', '', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 3000
          })
          return;
        }
        this.pacienteService.deletarPaciente(this.paciente.id).subscribe({
          next: () => {
            this.fecharDetalhamento.emit()
          },
          error: (e) => console.log(e)
        })
      }
    })
  }

  editarPaciente(): void {
    this.isEditContract = true;
  }

  fecharEditar(): void {
    this.isEditContract = false;
    this.carregaPaciente()
    this.carregarPacientes.emit()
  }

}
