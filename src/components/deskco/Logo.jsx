import React from 'react';
import { Image } from '@/components/ui/image';

export const LOGO_URL =
  'https://media.base44.com/images/public/6a69b073911fb2aa3df02219/96f0c51c4_image.png';

// Wordmark logo. className controls the box; the mark scales inside it.
export default function Logo({ className = 'h-6 w-[132px]' }) {
  return (
    <Image
      src={LOGO_URL}
      alt="DESCKO"
      fittingType="fit"
      className={className}
    />
  );
}