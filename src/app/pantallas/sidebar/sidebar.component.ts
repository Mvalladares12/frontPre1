import {Component, inject, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {RouterLink, RouterLinkActive} from '@angular/router';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  private keycloakService = inject(Keycloak);

  // Variable para controlar la visibilidad en el HTML
  hasMunicipioRole = false;

  async ngOnInit() {

    if (await this.keycloakService.authenticated) {

      // Consultamos a Keycloak si el usuario tiene el rol 'municipio'
      // Nota: Si 'municipio' es un rol de cliente (y no de reino),
      // debes pasar el nombre de tu cliente como segundo parámetro:
      // this.keycloakService.isUserInRole('municipio', 'front-app2')

      this.hasMunicipioRole = this.keycloakService.hasRealmRole('municipio');

      console.log('Permiso de Municipio en UI:', this.hasMunicipioRole);
    }
  }

  async logout() {
    this.keycloakService.logout({
      redirectUri: window.location.origin + '/'
    });
  }
}
