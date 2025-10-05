import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, linkItems, logo } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { AISearchTrigger } from '@/components/ai/search-v2';
import 'katex/dist/katex.min.css';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const base = baseOptions();

  return (
    <div className="floating-sidebar-layout">
      <DocsLayout
        {...base}
        tree={source.pageTree}
        // just icon items
        links={linkItems.filter((item) => item.type === 'icon')}
      nav={{
        ...base.nav,
        title: (
          <>
            {logo}
            <span className="font-medium [.uwu_&]:hidden max-md:hidden">
              IDAPI Docs
              <span className="ml-2 px-2 py-0.5 text-xs bg-emerald-100/80 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-full font-medium border border-emerald-200/50 dark:border-emerald-700/50">
                intern
              </span>
            </span>
          </>
        ),
      }}
      sidebar={{
        collapsible: true,
        tabs: {
          transform(option) {
            return {
              ...option,
              icon: null,
            };
          },
        },
      }}
      >
        {children}

        <AISearchTrigger />
      </DocsLayout>
    </div>
  );
}
