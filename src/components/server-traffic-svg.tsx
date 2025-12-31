'use client';

const ServerTraffic = () => {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* Base server icon */}
      <rect x="60" y="80" width="80" height="40" rx="5" ry="5" fill="hsl(var(--secondary))" stroke="hsl(var(--primary))" strokeWidth="2" />
      <rect x="65" y="85" width="70" height="30" rx="3" ry="3" fill="hsl(var(--background))" />
      
      {/* Server lights */}
      <circle cx="75" cy="95" r="3" fill="hsl(var(--primary))">
        <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />
      </circle>
      <circle cx="75" cy="105" r="3" fill="hsl(var(--primary) / 0.7)">
         <animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" repeatCount="indefinite" />
      </circle>

      {/* Animated data packets */}
      <defs>
        <g id="packet">
          <rect x="-2" y="-1" width="4" height="2" fill="hsl(var(--primary))" />
        </g>
      </defs>

      {/* Path 1 */}
      <path id="p1" d="M 20,20 C 40,80 80,80 100,90" stroke="transparent" fill="none" />
      <use href="#packet">
        <animateMotion dur="2s" repeatCount="indefinite" rotate="auto">
          <mpath href="#p1" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" />
      </use>

      {/* Path 2 */}
      <path id="p2" d="M 180,30 C 150,60 120,75 100,95" stroke="transparent" fill="none" />
      <use href="#packet">
        <animateMotion dur="2.5s" begin="0.5s" repeatCount="indefinite" rotate="auto">
          <mpath href="#p2" />
        </animateMotion>
         <animate attributeName="opacity" values="0;1;1;0" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
      </use>
      
      {/* Path 3 */}
      <path id="p3" d="M 30,170 C 50,130 80,115 100,105" stroke="transparent" fill="none" />
      <use href="#packet">
        <animateMotion dur="2.2s" begin="0.2s" repeatCount="indefinite" rotate="auto">
          <mpath href="#p3" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" dur="2.2s" begin="0.2s" repeatCount="indefinite" />
      </use>

      {/* Path 4 */}
       <path id="p4" d="M 170,180 C 140,140 115,120 100,110" stroke="transparent" fill="none" />
       <use href="#packet">
        <animateMotion dur="2.8s" begin="1s" repeatCount="indefinite" rotate="auto">
          <mpath href="#p4" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" dur="2.8s" begin="1s" repeatCount="indefinite" />
      </use>
      
       {/* Path 5 */}
       <path id="p5" d="M 100,10 C 100,50 100,70 100,80" stroke="transparent" fill="none" />
       <use href="#packet">
        <animateMotion dur="1.5s" begin="0.7s" repeatCount="indefinite" rotate="auto">
          <mpath href="#p5" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" begin="0.7s" repeatCount="indefinite" />
      </use>

    </svg>
  );
};

export default ServerTraffic;
