import { Routes } from '@angular/router';
import {authGuard} from "./core/guards/auth.guard";
import {departamentoGuard} from "./core/guards/departamento.guard";
import {distritoGuard} from "./core/guards/distrito.guard";

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./pantallas/base/base.component').then(m => m.BaseComponent),
  },
  {
    path: 'municipio',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pantallas/Municipios/municipio/municipio.component').then(m => m.MunicipioComponent),
      },
      {
        path: 'mantenimiento/:id',
        loadComponent: () => import('./pantallas/Municipios/municipio-mantenimiento/municipio-mantenimiento.component').then(m => m.MunicipioMantenimientoComponent),
      }
    ]
  },
  {
    path: 'departamento',
    canActivate: [departamentoGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pantallas/Departamentos/departamento/departamento.component').then(m => m.DepartamentoComponent),
      },
      {
        path: 'mantenimiento/:id',
        loadComponent: () => import('./pantallas/Departamentos/departamento-mantenimiento/departamento-mantenimiento.component').then(m => m.DepartamentoMantenimientoComponent),
      }
    ]
   },
  {
    path: 'distrito',
    canActivate: [distritoGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pantallas/Distritos/distrito/distrito.component').then(m => m.DistritoComponent),
      },
      {
        path: 'mantenimiento/:id',
        loadComponent: () => import('./pantallas/Distritos/distrito-mantenimiento/distrito-mantenimiento.component').then(m => m.DistritoMantenimientoComponent),
      }
    ]
  },
];
