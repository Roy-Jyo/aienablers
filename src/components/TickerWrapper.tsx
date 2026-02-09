'use client';

import { usePathname } from 'next/navigation';
import Ticker from '@/components/Ticker';

export default function TickerWrapper() {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  return <Ticker />;
}
