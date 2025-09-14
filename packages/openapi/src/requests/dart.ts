'use client';

import { type SampleGenerator } from '@/requests/_shared';

function convertJsonToDartMap(obj: any, indent: number = 0): string {
  const spaces = ' '.repeat(indent);

  if (typeof obj === 'string') {
    return `'${obj.replace(/'/g, "\\'")}'`;
  }

  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return String(obj);
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    const items = obj.map(item => convertJsonToDartMap(item, indent + 2));
    return `[\n${spaces}  ${items.join(`,\n${spaces}  `)}\n${spaces}]`;
  }

  if (typeof obj === 'object' && obj !== null) {
    const entries = Object.entries(obj);
    if (entries.length === 0) return '{}';

    const items = entries.map(([key, value]) =>
      `'${key}': ${convertJsonToDartMap(value, indent + 2)}`
    );

    return `{\n${spaces}  ${items.join(`,\n${spaces}  `)}\n${spaces}}`;
  }

  return 'null';
}

export const generator: SampleGenerator = (url, data, { mediaAdapters }) => {
  const headers: Record<string, string> = {};
  let body: string | undefined;

  if (data.body && data.bodyMediaType && data.bodyMediaType in mediaAdapters) {
    headers['Content-Type'] = data.bodyMediaType;

    body = mediaAdapters[data.bodyMediaType].generateExample(
      data as { body: unknown },
      {
        lang: 'dart',
      },
    );

    if (!body && data.body) {
      if (data.bodyMediaType === 'application/json') {
        const dartMap = convertJsonToDartMap(data.body, 2);
        body = `jsonEncode(${dartMap})`;
      } else {
        body = JSON.stringify(data.body);
      }
    }
  }

  for (const [k, v] of Object.entries(data.header)) {
    headers[k] = v.value as string;
  }

  const cookies = Object.entries(data.cookie);
  if (cookies.length > 0) {
    const cookieString = cookies
      .map(([key, param]) => `${key}=${param.value}`)
      .join('; ');
    headers['Cookie'] = cookieString;
  }

  const headersEntries = Object.entries(headers)
    .map(([key, value]) => `    '${key}': '${value}'`)
    .join(',\n');

  const headersMap = headersEntries ? `{\n${headersEntries}\n  }` : '{}';

  return `import 'dart:convert';
import 'dart:io';

void main() async {
${body ? `  var body = ${body};\n\n` : ''}  var url = Uri.parse('${url}');

  var request = await HttpClient().${data.method.toLowerCase()}Uri(url);

  var headers = ${headersMap};
  headers.forEach((key, value) {
    request.headers.set(key, value);
  });
${body ? '\n  request.write(body);\n' : ''}
  var response = await request.close();

  var statusCode = response.statusCode;
  var responseBody = await response.transform(utf8.decoder).join();

  print('Status code: \$statusCode');
  print('Response body: \$responseBody');
}`;
};