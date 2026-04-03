import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Municipio} from '../modelos/principal';
import {environment} from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  constructor(private http: HttpClient) {

  }

  public getMunicipios():Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${environment.apiUrl}/municipio`);
  }
}
