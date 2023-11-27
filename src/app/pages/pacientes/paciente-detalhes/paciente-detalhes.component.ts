import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-paciente-detalhes',
  templateUrl: './paciente-detalhes.component.html',
  styleUrls: ['./paciente-detalhes.component.scss']
})
export class PacienteDetalhesComponent implements OnInit {

  @Output('carregarPacientes') carregarPacientes = new EventEmitter<any>()
  @Output('fecharCriacao') fecharCriacao = new EventEmitter<any>()
  @Output('fecharEditar') fecharEditar = new EventEmitter<any>()

  @Input() pacienteSelecionado!: any

  formGroupGeral: FormGroup = this._formBuilder.group({
    nome: ['', Validators.required],
    nascimento: [null,  Validators.required],
    sexo: ['',  Validators.required],
    email: ['', Validators.email],
    cpf: ['',  Validators.required],
    rg: ['', Validators.required],
    codigo: ['', Validators.required],
    telefone: ['',  Validators.required],
    telefoneTrabalho: ['',  Validators.required]
  })

  formGroupEndereco: FormGroup = this._formBuilder.group({
    cep: ['',  Validators.required],
    endereco: ['',  Validators.required],
    numero: ['',  Validators.required],
    bairro: ['',  Validators.required],
    complemento: [''],
    uf: ['',  Validators.required],
    cidade: ['',  Validators.required],
    pais: ['',  Validators.required]
  });

  formGroupConveio = this._formBuilder.group({
    convenio: ['', Validators.required],
    numeroCarteirinha: ['', Validators.required],
    acomodacao: ['', Validators.required],
    plano: ['', Validators.required],
    validade: ['', Validators.required]
  })

  constructor(private _formBuilder: FormBuilder, private _pacienteService: PacientesService) {}

  ngOnInit(): void {
      this.formGroupGeral.setValue({
        nome: this.pacienteSelecionado.nome || '',
        nascimento: this.pacienteSelecionado.nascimento || null,
        sexo: this.pacienteSelecionado.sexo || '',
        email: this.pacienteSelecionado.email || '',
        cpf: this.pacienteSelecionado.cpf || '',
        rg: this.pacienteSelecionado.rg || '',
        codigo: this.pacienteSelecionado.codigo || '',
        telefone: this.pacienteSelecionado.telefone || '',
        telefoneTrabalho: this.pacienteSelecionado.telefoneTrabalho || '',
      });
      
      this.formGroupEndereco.setValue({
        cep: this.pacienteSelecionado.cep || '',
        endereco: this.pacienteSelecionado.endereco || '',
        numero: this.pacienteSelecionado.numero || '',
        bairro: this.pacienteSelecionado.bairro || '',
        complemento: this.pacienteSelecionado.complemento || '',
        uf: this.pacienteSelecionado.uf || '',
        cidade: this.pacienteSelecionado.cidade || '',
        pais: this.pacienteSelecionado.pais || '',
      });

      this.formGroupConveio.setValue({
        convenio: this.pacienteSelecionado.convenio || '',
        numeroCarteirinha: this.pacienteSelecionado.numeroCarteirinha || '',
        acomodacao: this.pacienteSelecionado.acomodacao || '',
        plano: this.pacienteSelecionado.plano || '',
        validade: this.pacienteSelecionado.validade || '',
      });
  }

  concluirCadastro(): void {
    const data = {...this.formGroupConveio.getRawValue(), ...this.formGroupEndereco.getRawValue(), ...this.formGroupGeral.getRawValue()}

    if (this.pacienteSelecionado.id) {
      data.id = this.pacienteSelecionado.id
      this._pacienteService.editarPaciente(data).subscribe({
        next: (response) => {
          this.fecharEditar.emit()
        },
        error: (e) => console.log(e)
      })
      return;
    }

    this._pacienteService.incluirPacientes(data).subscribe({
      next: (response) => {
        this.carregarPacientes.emit()
        this.fecharEmit()
      },
      error: (e) => console.log(e)
    })
  }

  fecharEmit(): void {
    if (this.pacienteSelecionado?.id) {
      this.fecharEditar.emit();
      return;
    }

    this.fecharCriacao.emit()
  }

}
