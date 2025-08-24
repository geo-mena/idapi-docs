import { buildRegistry } from '@/scripts/build-registry';
import * as OpenAPI from 'fumadocs-openapi';
import { rimraf } from 'rimraf';
import { openapi, geocodingapi, servicesapi } from '@/lib/openapi';

export async function generateDocs() {
  await rimraf('./content/docs/openapi/(generated)');
  await rimraf('./content/docs/geocoding/(generated)');
  await rimraf('./content/docs/services/(generated)');

  await Promise.all([
    OpenAPI.generateFiles({
      input: openapi,
      output: './content/docs/openapi/(generated)',
      per: 'operation',
      includeDescription: true,
    }),
    OpenAPI.generateFiles({
      input: geocodingapi,
      output: './content/docs/geocoding/(generated)',
      per: 'operation',
      includeDescription: true,
    }),
    OpenAPI.generateFiles({
      input: servicesapi,
      output: './content/docs/services/(generated)',
      per: 'operation',
      includeDescription: true,
    }),
  ]);
}

async function main() {
  await Promise.all([generateDocs(), buildRegistry()]);
}

await main().catch((e) => {
  console.error('Failed to run pre build script', e);
});
