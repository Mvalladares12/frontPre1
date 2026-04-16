import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Municipio} from '../modelos/principal';
import {Departamento} from '../modelos/departamento';
import {Distrito} from '../modelos/distrito';
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

  public getDepartamentos():Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${environment.apiUrl}/departamento`);
  }

  public getDistritos():Observable<Distrito[]> {
    return this.http.get<Distrito[]>(`${environment.apiUrl}/distrito`);
  }
}
