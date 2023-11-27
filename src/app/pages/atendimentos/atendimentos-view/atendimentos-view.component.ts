import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AtendimentoService } from 'src/app/services/atendimento.service';

@Component({
  selector: 'app-atendimentos-view',
  templateUrl: './atendimentos-view.component.html',
  styleUrls: ['./atendimentos-view.component.scss']
})
export class AtendimentosViewComponent implements OnInit, OnChanges {

  @Input('atendimento') atendimento!: any;
  @Output('fecharDetalhamento') fecharDetalhamento = new EventEmitter<any>()
  @Output('carregarAtendimentos') carregarAtendimentos = new EventEmitter<any>()

  isEditContract: boolean = false;

  constructor(
    private atendimentoService: AtendimentoService
  ) {}

  ngOnInit(): void {
    this.carregarAtendimento()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.carregarAtendimento()
  }

  carregarAtendimento(): void {
    this.atendimentoService.carregaAtendimento(this.atendimento.id).subscribe({
      next: (response) => {
        this.atendimento = response;
      }, error: (e) => console.log(e)
    })
  }

  deletarAtendimento(): void {
    this.atendimentoService.excluirAtendimento(this.atendimento.id).subscribe({
      next: () => this.fecharDetalhamento.emit()
    })

  }

  editarAtendimento() {
    this.isEditContract = true;
  }

  fecharEditar(): void {
    this.isEditContract = false;
    this.carregarAtendimento()
    this.carregarAtendimentos.emit()
  }

}
