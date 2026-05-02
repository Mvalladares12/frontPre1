import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import Keycloak from 'keycloak-js';

@Directive({
  selector: '[appTieneRol]',
  standalone: true // Si usas Angular 14+
})
export class TieneRolDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private keycloak: Keycloak
  ) {}

  @Input() set appTieneRol(parametros: [string, string]) {
    const [rol, recurso] = parametros;
    const tieneAcceso = this.keycloak.hasResourceRole(rol, recurso);

    if (tieneAcceso) {
      // Si tiene el rol, renderiza el elemento HTML
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // Si no tiene el rol, elimina el elemento del DOM
      this.viewContainer.clear();
    }
  }
}
