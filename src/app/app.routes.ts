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
    loadComponent: () => import('./pantallas/principal/principal.component').then(m => m.PrincipalComponent),
  },
  {
    path: 'departamento',
    canActivate: [departamentoGuard],
    loadComponent: () => import('./pantallas/departamento/departamento.component').then(m => m.DepartamentoComponent),
  },
  {
    path: 'distrito',
    canActivate: [distritoGuard],
    loadComponent: () => import('./pantallas/distrito/distrito.component').then(m => m.DistritoComponent),
  },
];
