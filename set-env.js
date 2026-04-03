const fs = require('fs');

const targetPath = './src/environments/environment.ts';

// Usamos el estándar MAYÚSCULAS para leer del servidor
// Y le ponemos valores por defecto lógicos para tu entorno local
const apiUrl = process.env.API_URL || 'http://localhost:8084';
const keycloakUrl = process.env.KEYCLOAK_URL || 'http://localhost:8180';
const keycloakRealm = process.env.KEYCLOAK_REALM || 'seguridad-app';
const keycloakClient = process.env.KEYCLOAK_CLIENT || 'front-app2';

const envConfigFile = `
export const environment = {
  production: true,
  apiUrl: '${apiUrl}',
  keycloakUrl: '${keycloakUrl}',
  keycloakRealm: '${keycloakRealm}',
  keycloakClient: '${keycloakClient}'
};
`;

fs.writeFileSync(targetPath, envConfigFile);
