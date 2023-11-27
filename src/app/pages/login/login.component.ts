import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup!: UntypedFormGroup;
  isShowPassword: boolean = true;

  constructor(private _formBuilder: UntypedFormBuilder, private _router: Router, private _authService: AuthService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this._router.navigateByUrl('/patients')
    }
    this.loginFormGroup = this._formBuilder.group({
      login: ['', Validators.required],
      senha: ['', Validators.required]
    })
  }

  cadastrar(): void {
    this._router.navigateByUrl('/sing-up')
  }

  postLogin(): void {
    this._authService.postLogin(this.loginFormGroup.getRawValue()).subscribe({
      next: (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token)
          localStorage.setItem('name', response.nome)
          this._router.navigateByUrl('/patients')
        }
      },
      error: (e) => {
        this._snackBar.open(e.error.message, undefined, {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['warning']
        })
      }
    })

  }



}
