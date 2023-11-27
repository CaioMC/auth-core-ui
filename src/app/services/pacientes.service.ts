import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  carregarTodosPacientes(name: string): Observable<any> {
    return this.httpClient.get(environment.url + '/titan/prontuario/core/api/paciente/getAll-pacientes' + (name ? '?nome=' +name : ''))
  }

  carregarPaciente(id: string): Observable<any> {
    return this.httpClient.get(environment.url + '/titan/prontuario/core/api/paciente/get-paciente?id=' + id)
  }

  incluirPacientes(data: any): Observable<any> {
    return this.httpClient.post(environment.url + '/titan/prontuario/core/api/paciente/incluir-paciente', data)
  }

  editarPaciente(data: any): Observable<any> {
    return this.httpClient.post(environment.url + '/titan/prontuario/core/api/paciente/update-paciente', data)
  }

  deletarPaciente(id: string): Observable<any> {
    return this.httpClient.post(environment.url + '/titan/prontuario/core/api/paciente/delete-paciente?id=' + id, null)
  }
}
