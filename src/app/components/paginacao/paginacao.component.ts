import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.scss']
})
export class PaginacaoComponent implements OnInit{

  formGroup: FormGroup = this.formBuilder.group({
    itensPorPagina: [10]
  })

  constructor(private formBuilder: FormBuilder) {
  }

  @Input('itensPorPagina') itensPorPagina: number = 10;
  @Output('alterarItensPorPagina') alterarItensPorPagina = new EventEmitter<any>();

  ngOnInit(): void {
  }

  change(): void {
    this.alterarItensPorPagina.emit(this.formGroup.getRawValue().itensPorPagina)
  }

}
