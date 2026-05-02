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

  public getMunicipio(id:number):Observable<Municipio> {
    return this.http.get<Municipio>(`${environment.apiUrl}/municipio/${id}`);
  }

  public getDepartamentos():Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${environment.apiUrl}/departamento`);
  }

  public getDepartamento(id:number):Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${environment.apiUrl}/departamento/${id}`);
  }

  public getDistritos():Observable<Distrito[]> {
    return this.http.get<Distrito[]>(`${environment.apiUrl}/distrito`);
  }

  public getDistrito(id:number):Observable<Distrito> {
    return this.http.get<Distrito>(`${environment.apiUrl}/distrito/${id}`);
  }

  crearMunicipio(municipio: any) {
    return this.http.post(`${environment.apiUrl}/municipio`, municipio);
  }

  actualizarMunicipio(municipio: any) {
    return this.http.put(`${environment.apiUrl}/municipio`, municipio);
  }

  crearDepartamento(departamento: any) {
    return this.http.post(`${environment.apiUrl}/departamento`, departamento);
  }

  actualizarDepartamento(departamento: any) {
    return this.http.put(`${environment.apiUrl}/departamento`, departamento);
  }

  crearDistrito(distrito: any) {
    return this.http.post(`${environment.apiUrl}/distrito`, distrito);
  }

  actualizarDistrito(distrito: any) {
    return this.http.put(`${environment.apiUrl}/distrito`, distrito);
  }
}
