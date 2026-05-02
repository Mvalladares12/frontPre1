import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';
import { inject } from '@angular/core';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {

  const { authenticated, keycloak, grantedRoles } = authData;
  const router = inject(Router);

  if (!authenticated) {
    await keycloak.login({
      redirectUri: window.location.origin + state.url
    });
    return false;
  }

  const hasDepartamentoRole = keycloak.hasRealmRole('departamento');

  if (!hasDepartamentoRole) {
    return router.createUrlTree(['/']);
  }

  return true;
};

export const departamentoGuard = createAuthGuard<CanActivateFn>(isAccessAllowed);
