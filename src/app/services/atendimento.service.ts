import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  carregaAtendimentos(nomePaciente: string, queixaprincipal: string, diagnostico: string): Observable<any> {
    return this._httpClient.get(environment.url + '/titan/prontuario/core/api/atendimento/getAll-atendimento?nomePaciente=' + nomePaciente + '&queixaPrincipal='+queixaprincipal+ '&diagnostico=' + diagnostico)
  }

  carregaAtendimento(id: string) {
    return this._httpClient.get(environment.url + '/titan/prontuario/core/api/atendimento/get-atendimento?id=' + id)
  }

  incluirAtendimento(data: string) {
    return this._httpClient.post(environment.url + '/titan/prontuario/core/api/atendimento/incluir-atendimento', data)
  }

  editarAtendimento(data: any) {
    return this._httpClient.post(environment.url + '/titan/prontuario/core/api/atendimento/update-atendimento', data)
  }

  excluirAtendimento(id: string) {
    return this._httpClient.post(environment.url + '/titan/prontuario/core/api/atendimento/delete-atendimento?id=' + id, null)
  }


}
