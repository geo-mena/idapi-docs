import type { CodeSample } from '@/render/operation';
import * as CURL from '@/requests/curl';
import * as JS from '@/requests/javascript';
import * as Go from '@/requests/go';
import * as Python from '@/requests/python';
import * as Java from '@/requests/java';
import * as CSharp from '@/requests/csharp';
// import * as PHP from '@/requests/php';
// import * as Dart from '@/requests/dart';

export const defaultSamples: CodeSample[] = [
  {
    label: 'cURL',
    source: CURL.generator,
    lang: 'bash',
  },
  {
    label: 'JavaScript',
    source: JS.generator,
    lang: 'js',
  },
  {
    label: 'Go',
    source: Go.generator,
    lang: 'go',
  },
  {
    label: 'Python',
    source: Python.generator,
    lang: 'python',
  },
  {
    label: 'Java',
    source: Java.generator,
    lang: 'java',
  },
  {
    label: 'C#',
    source: CSharp.generator,
    lang: 'csharp',
  },
  // {
  //   label: 'PHP',
  //   source: PHP.generator,
  //   lang: 'php',
  // },
  // {
  //   label: 'Dart',
  //   source: Dart.generator,
  //   lang: 'dart',
  // },
];
