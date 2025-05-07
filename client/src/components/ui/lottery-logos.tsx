import { SVGProps } from 'react';

export function NationalLotteryLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="relative w-full h-full">
      <img 
        src="/assets/national lottery.webp" 
        alt="National Lottery Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="relative w-full h-full">
      <img 
        src="/assets/app logo.png" 
        alt="32X Scanner Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
}