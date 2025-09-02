import { sync, type OramaDocument } from 'fumadocs-core/search/orama-cloud';
import { CloudManager } from '@oramacloud/client';
import { source } from '@/lib/source';

export async function updateSearchIndexes(): Promise<void> {
  const apiKey = process.env.ORAMA_PRIVATE_API_KEY;

  if (!apiKey) {
    console.log('no api key for Orama found, skipping');
    return;
  }

  // Use source directly - focus on services content
  const pages = source.getPages();
  const records = await Promise.all(
    pages
      .filter((page) => page.slugs[0] === 'services')
      .map(async (page) => {
        const { structuredData } = await page.data.load();
        return {
          id: page.url,
          structured: structuredData,
          tag: page.slugs[0],
          url: page.url,
          title: page.data.title,
          description: page.data.description,
        } satisfies OramaDocument;
      })
  );

  const manager = new CloudManager({ api_key: apiKey });

  await sync(manager, {
    index: 'wl160dwhxe5i0n2qlooi08o1',
    documents: records,
  });

  console.log(`search updated: ${records.length} records`);
}
