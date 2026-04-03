const fs = require('fs');

// Ruta donde se creará tu archivo de entorno de producción
const targetPath = './src/environments/environment.ts';

const apirUrl = process.env.apirUrl || 'http://localhost:8084';
const keycloakUrl = process.env.keycloakUrl || 'http://localhost:8084';
const keycloakRealm = process.env.keycloakRealm || 'http://localhost:8084';
const keycloakClient = process.env.keycloakClient || 'http://localhost:8084';

// Construimos el contenido del archivo exactamente como lo usaría Angular
const envConfigFile = `
export const environment = {
  production: true,
  apirUrl: '${apirUrl}',
  keycloakUrl: '${keycloakUrl}',
  keycloakRealm : '${keycloakRealm}',
  keycloakClient: '${keycloakClient}',
};
`;

fs.writeFileSync(targetPath, envConfigFile);
