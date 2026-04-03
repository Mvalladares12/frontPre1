import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {

  const { authenticated, keycloak, grantedRoles } = authData;

  console.log('🛡️ ¿Está autenticado?:', authenticated);

  if (!authenticated) {
    console.log('🔄 Sesión no detectada. Redirigiendo a Keycloak...');
    await keycloak.login({
      redirectUri: window.location.origin + state.url
    });
    return false;
  }

  console.log('✅ Token válido. Permisos del usuario:', grantedRoles);
  return true;
};

export const authGuard = createAuthGuard<CanActivateFn>(isAccessAllowed);


