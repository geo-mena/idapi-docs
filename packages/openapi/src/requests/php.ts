'use client';

import { type SampleGenerator } from '@/requests/_shared';

function convertJsonToPhpArray(obj: any, indent: number = 0): string {
  const spaces = ' '.repeat(indent);

  if (typeof obj === 'string') {
    return `"${obj}"`;
  }

  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return String(obj);
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    const items = obj.map(item => convertJsonToPhpArray(item, indent + 2));
    return `[\n${spaces}  ${items.join(`,\n${spaces}  `)}\n${spaces}]`;
  }

  if (typeof obj === 'object' && obj !== null) {
    const entries = Object.entries(obj);
    if (entries.length === 0) return '[]';

    const items = entries.map(([key, value]) =>
      `"${key}" => ${convertJsonToPhpArray(value, indent + 2)}`
    );

    return `[\n${spaces}  ${items.join(`,\n${spaces}  `)}\n${spaces}]`;
  }

  return 'null';
}

export const generator: SampleGenerator = (url, data, { mediaAdapters }) => {
  const headers: Record<string, string> = {};
  const curlOptions: string[] = [];
  let body: string | undefined;

  // Essential curl options only
  curlOptions.push(`CURLOPT_URL => "${url}"`);
  curlOptions.push(`CURLOPT_RETURNTRANSFER => true`);
  curlOptions.push(`CURLOPT_CUSTOMREQUEST => "${data.method}"`);

  // Handle body
  if (data.body && data.bodyMediaType && data.bodyMediaType in mediaAdapters) {
    headers['Content-Type'] = data.bodyMediaType;

    body = mediaAdapters[data.bodyMediaType].generateExample(
      data as { body: unknown },
      {
        lang: 'php',
      },
    );

    // Fallback if no body was generated but we have data.body
    if (!body && data.body) {
      if (data.bodyMediaType === 'application/json') {
        // Convert JSON to PHP array syntax
        const phpArray = convertJsonToPhpArray(data.body, 2);
        body = `json_encode(${phpArray})`;
      } else {
        body = JSON.stringify(data.body);
      }
    }

    if (body) {
      curlOptions.push('CURLOPT_POSTFIELDS => $body');
    }
  }

  // Handle headers
  for (const [k, v] of Object.entries(data.header)) {
    headers[k] = v.value as string;
  }

  // Handle cookies
  const cookies = Object.entries(data.cookie);
  if (cookies.length > 0) {
    const cookieString = cookies
      .map(([key, param]) => `${key}=${param.value}`)
      .join('; ');
    headers['Cookie'] = cookieString;
  }

  // Add headers to curl options
  if (Object.keys(headers).length > 0) {
    const headerArray = Object.entries(headers)
      .map(([key, value]) => `  "${key}: ${value}"`)
      .join(',\n');

    curlOptions.push(`CURLOPT_HTTPHEADER => [\n${headerArray}\n]`);
  }

  const curlOptionsStr = curlOptions
    .map(option => `  ${option}`)
    .join(',\n');

  return `<?php
${body ? `$body = ${body};\n\n` : ''}$curl = curl_init();

curl_setopt_array($curl, [
${curlOptionsStr}
]);

$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

echo "Status code: " . $httpCode . "\\n";
echo "Response body: " . $response;`;
};