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

  // Variables para controlar la visibilidad en el HTML
  hasMunicipioRole = false;
  hasDepartamentoRole = false;
  hasDistritoRole = false;

  async ngOnInit() {

    if (this.keycloakService.authenticated) {

      this.hasMunicipioRole = this.keycloakService.hasRealmRole('municipio');
      this.hasDepartamentoRole = this.keycloakService.hasRealmRole('departamento');
      this.hasDistritoRole = this.keycloakService.hasRealmRole('distrito');
    }
  }

  async logout() {
    this.keycloakService.logout({
      redirectUri: window.location.origin + '/'
    });
  }
}
