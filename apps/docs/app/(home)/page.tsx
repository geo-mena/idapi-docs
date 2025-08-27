import Link from 'next/link';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/ui/button';


export default function Page() {
  return (
    <>
      <main className="container relative max-w-[1100px] px-2 py-4 z-2 lg:py-8">
        <div>
          <div className="relative">
            <Hero />
          </div>
        </div>
      </main>
    </>
  );
}

function Hero() {
  return (
    <div className="relative z-2 flex flex-col items-center justify-center text-center border-x border-t bg-fd-background/80 px-4 pt-12 md:px-12 md:pt-16 [.uwu_&]:hidden overflow-hidden h-[calc(100vh-200px)]">
      <div
        className="absolute inset-0 z-[-1] opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          color: '#3b82f6',
          maskImage: 'radial-gradient(600px circle at center, white, transparent)',
          WebkitMaskImage: 'radial-gradient(600px circle at center, white, transparent)',
        }}
      />
      <h1 className="mb-8 text-4xl font-medium md:hidden">Identity Platform Documentation</h1>
      <h1 className="mb-8 max-w-[600px] text-4xl font-medium max-md:hidden">
        Identity Platform Documentation
      </h1>
      <p className="mb-8 text-fd-muted-foreground md:max-w-[80%] md:text-xl">
        Explore our detailed guides featuring best practices and integration examples for the Facephi Identity Platform.
      </p>
      <div className="inline-flex items-center gap-3">
        <Link
          href="/docs/services"
          className={cn(
            buttonVariants({ size: 'lg', className: 'rounded-full' }),
          )}
        >
          Getting Started
        </Link>
      </div>
    </div>
  );
}
