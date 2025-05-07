import { SVGProps } from "react";

export function ShoppingBag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
      {...props}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
      />
    </svg>
  );
}

export function NationalLotteryLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      {...props}
    >
      <circle cx="50" cy="50" r="50" fill="#F7DC18" />
      <path d="M36.5 60.5L50 35.5L64 60.5" stroke="black" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 64.5L73 64.5" stroke="#FF0000" strokeWidth="8" strokeLinecap="round" />
      <path d="M50 70L50 93" stroke="#27AE60" strokeWidth="8" strokeLinecap="round" />
      <path d="M50 35.5L50 10" stroke="#2B87E1" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}
