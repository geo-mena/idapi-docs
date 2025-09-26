import { buildRegistry } from '@/scripts/build-registry';
import * as OpenAPI from 'fumadocs-openapi';
import { rimraf } from 'rimraf';
import {
  openapi,
  geocodingapi,
  onboardingapi,
  authenticationapi,
  ocrapi,
  morphologyapi,
  morphologyv2api,
  padapi,
  iadapi,
  trackingapi,
  previredapi,
  detokenizeapi,
  civilvalidationargapi,
  civilvalidationperapi,
  civilvalidationgtmapi,
} from '@/lib/openapi';

export async function generateDocs() {
  await rimraf('./content/docs/openapi/(generated)');
  await rimraf('./content/docs/geocoding/(generated)');
  await rimraf('./content/docs/services/(generated)');
  await rimraf('./content/docs/services/onboarding/(generated)');
  await rimraf('./content/docs/services/authentication/(generated)');
  await rimraf('./content/docs/services/ocr/(generated)');
  await rimraf('./content/docs/services/morphology/(generated)');
  await rimraf('./content/docs/services/morphology-v2/(generated)');
  await rimraf('./content/docs/services/pad/(generated)');
  await rimraf('./content/docs/services/security/(generated)');
  await rimraf('./content/docs/services/tracking/(generated)');
  await rimraf('./content/docs/services/previred/(generated)');
  await rimraf('./content/docs/services/detokenize/(generated)');
  await rimraf(
    './content/docs/services/civil-validation/argentina/(generated)',
  );
  await rimraf('./content/docs/services/civil-validation/peru/(generated)');
  await rimraf('./content/docs/services/civil-validation/guatemala/(generated)');

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
      input: onboardingapi,
      output: './content/docs/services/onboarding/(generated)',
      per: 'operation',
      includeDescription: true,
    }),
    OpenAPI.generateFiles({
      input: authenticationapi,
      output: './content/docs/services/authentication/(generated)',
      per: 'operation',
      includeDescription: true,
    }),
    OpenAPI.generateFiles({
      input: ocrapi,
      output: './content/docs/services/ocr/(generated)',
      per: 'operation',
      includeDescription: true,
    }),
    OpenAPI.generateFiles({
      input: morphologyapi,
      output: './content/docs/services/morphology/(generated)',
      per: 'operation',
      includeDescription: true,
    }),
    OpenAPI.generateFiles({
      input: morphologyv2api,
      output: './content/docs/services/morphology-v2/(generated)',
      per: 'operation',
      includeDescription: true,
    }),
    OpenAPI.generateFiles({
      input: padapi,
      output: './content/docs/services/pad/(generated)',
      per: 'operation',
      includeDescription: true,
    }),
    OpenAPI.generateFiles({
      input: iadapi,
      output: './content/docs/services/security/(generated)',
      per: 'operation',
      includeDescription: true,
    }),
    OpenAPI.generateFiles({
      input: trackingapi,
      output: './content/docs/services/tracking/(generated)',
      per: 'operation',
      includeDescription: true,
    }),
    OpenAPI.generateFiles({
      input: previredapi,
      output: './content/docs/services/previred/(generated)',
      per: 'operation',
      includeDescription: true,
    }),
    OpenAPI.generateFiles({
      input: detokenizeapi,
      output: './content/docs/services/detokenize/(generated)',
      per: 'operation',
      includeDescription: true,
    }),
    OpenAPI.generateFiles({
      input: civilvalidationargapi,
      output: './content/docs/services/civil-validation/argentina/(generated)',
      per: 'operation',
      includeDescription: true,
    }),
    OpenAPI.generateFiles({
      input: civilvalidationperapi,
      output: './content/docs/services/civil-validation/peru/(generated)',
      per: 'operation',
      includeDescription: true,
    }),
    OpenAPI.generateFiles({
      input: civilvalidationgtmapi,
      output: './content/docs/services/civil-validation/guatemala/(generated)',
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
