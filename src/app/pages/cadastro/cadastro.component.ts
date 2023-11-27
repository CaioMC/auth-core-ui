import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  dadosPessoaisFormGroup: FormGroup = this._formBuilder.group({
    nome: ['', Validators.required],
    email: ['',  Validators.email],
    cpf: ['',  Validators.required],
    celular: ['', Validators.required],
    sexo: ['',  Validators.required]
  })


  dadosMedicos: FormGroup = this._formBuilder.group({
    tratamento: ['',  Validators.required],
    concelhoProfissional: ['', Validators.required],
    registro: ['',  Validators.required],
    uf: ['',  Validators.required],
    profissao: ['',  Validators.required]
  })

  dadosProfissionais: FormGroup = this._formBuilder.group({
    cbo: ['',  Validators.required],
    rqe: ['',  Validators.required],
    cnes: ['',  Validators.required],
    senha: [''],
    confirmaSenha: ['', this.createPasswordStrengthValidator()]
  })

  constructor(private _route: Router, private _formBuilder: FormBuilder, private _authService: AuthService) {}

  ngOnInit(): void {
  }

  isSmallScreen: boolean =  window.innerWidth < 960;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isSmallScreen = window.innerWidth < 960;
  }

  logar(): void {
    this._route.navigateByUrl('/login')
  }

  criarConta(): void {
    if (!this.dadosProfissionais.valid) {
      return;
    }
    const data = {...this.dadosPessoaisFormGroup.getRawValue(), ...this.dadosMedicos.getRawValue(), ...this.dadosProfissionais.getRawValue()}
    this._authService.postCadastro(data).subscribe({
      next: (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token)
          localStorage.setItem('name', response.nome)
          this._route.navigateByUrl('/patients')
        }
        console.log(response)
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  createPasswordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      const senha = this.dadosProfissionais?.getRawValue()?.senha
      const campoConfirmaSenha = control.value;
  
      if (senha != campoConfirmaSenha) {
        return {
          senhaNaoBate: true
        }
      }
  
      return null;
    }
}

  senhaValidador(control: FormControl) { (1)
    const senha = this.dadosProfissionais.getRawValue().senha
    const campoConfirmaSenha = control.value;

    if (senha != campoConfirmaSenha) {
      return {
        senhaNaoBate: 'A senha não confere'
      }
    }

    return null;
  }

}
