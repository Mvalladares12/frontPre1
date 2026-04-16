import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';
import { inject } from '@angular/core';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {

  const { authenticated, keycloak } = authData;
  const router = inject(Router);

  if (!authenticated) {
    console.log('🔄 Sesión no detectada. Redirigiendo a Keycloak...');
    await keycloak.login({
      redirectUri: window.location.origin + state.url
    });
    return false;
  }

  const hasDistritoRole = keycloak.hasRealmRole('distrito');

  if (!hasDistritoRole) {
    console.warn('⛔ Acceso denegado: se requiere el rol "distrito".');
    return router.createUrlTree(['/']);
  }

  console.log('✅ Acceso permitido con rol "distrito".');
  return true;
};

export const distritoGuard = createAuthGuard<CanActivateFn>(isAccessAllowed);
