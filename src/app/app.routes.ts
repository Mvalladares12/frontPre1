import { Routes } from '@angular/router';
import {authGuard} from "./core/guards/auth.guard";

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
];
