'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { SearchIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Presence } from '@radix-ui/react-presence';

const SearchAI = dynamic(() => import('../search'), { ssr: false });

export function AISearchTriggerV3() {
  const [open, setOpen] = useState(false);

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) {
      setOpen(false);
      e.preventDefault();
    }

    if (e.key === '/' && (e.metaKey || e.ctrlKey) && !open) {
      setOpen(true);
      e.preventDefault();
    }
  };

  const onKeyPressRef = useRef(onKeyPress);
  onKeyPressRef.current = onKeyPress;
  useEffect(() => {
    const listener = (e: KeyboardEvent) => onKeyPressRef.current(e);
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, []);

  return (
    <>
      {open !== undefined ? (
        <SearchAI open={open} onOpenChange={setOpen} />
      ) : null}

      <div
        className={cn(
          'fixed bottom-2 transition-[width,height] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] -translate-x-1/2 rounded-2xl border shadow-xl z-50 overflow-hidden',
          'w-40 h-10 bg-fd-secondary text-fd-secondary-foreground shadow-fd-background',
        )}
        style={{
          left: 'calc(50% - var(--removed-body-scroll-bar-size,0px)/2)',
        }}
      >
        <Presence present={!open}>
          <button
            className={cn(
              'absolute inset-0 text-center p-2 text-fd-muted-foreground text-sm transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground',
              !open
                ? 'animate-fd-fade-in'
                : 'animate-fd-fade-out bg-fd-accent',
            )}
            onClick={() => setOpen(true)}
          >
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4.5" />
            Ask AI
          </button>
        </Presence>
      </div>
    </>
  );
}
