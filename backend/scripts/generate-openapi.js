import { swaggerSpec } from '../src/docs/swagger.js';
import fs from 'fs';

fs.writeFileSync('openapi.json', JSON.stringify(swaggerSpec, null, 2));

console.log('openapi.json generated');