import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions, linkItems } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
      {...baseOptions()}
      style={
        {
          '--spacing-fd-container': '1120px',
        } as object
      }
      links={[
        ...linkItems,
      ]}
      className="dark:bg-neutral-950 dark:[--color-fd-background:var(--color-neutral-950)]"
    >
      {children}
      <Footer />
    </HomeLayout>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t bg-fd-background py-4 text-fd-foreground">
      <div className="relative max-w-[1100px] mx-auto px-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-semibold">IDAPI Docs</p>
          <p className="text-xs">
            Built with ❤️ by{' '}
            <a
              href="https://idapi.vercel.app"
              rel="noreferrer noopener"
              target="_blank"
              className="font-medium"
            >
              Support Backend
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
