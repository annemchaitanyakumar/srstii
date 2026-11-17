const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../src/assets/bottles');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Botanical SVG icons
const ICONS = {
  peanut: `
    <g stroke="#7A4B0C" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M-8,-6 C-12,-12 -4,-16 2,-12 C7,-9 7,-5 3,-2 C1,0 1,2 3,4 C7,7 7,12 2,14 C-4,17 -12,12 -8,6 C-7,4 -7,2 -8,-1 C-9,-3 -9,-5 -8,-6 Z"/>
      <path d="M-4,-10 C-2,-7 0,-4 -2,0 C-4,4 -2,8 0,11" stroke-dasharray="1,2"/>
      <path d="M3,-1 C7,-4 14,-3 16,1 C18,5 17,9 13,11 C10,12 8,10 7,7" />
    </g>
  `,
  mustard: `
    <g stroke="#7A4B0C" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="0" cy="-6" r="3"/>
      <circle cx="-7" cy="-2" r="3"/>
      <circle cx="7" cy="-2" r="3"/>
      <circle cx="0" cy="4" r="3"/>
      <circle cx="0" cy="-1" r="1.5" fill="#C88A2C"/>
      <path d="M0,6 L0,15 M-3,10 L0,12 M3,10 L0,12"/>
    </g>
  `,
  coconut: `
    <g stroke="#7A4B0C" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0,14 C1,8 0,2 -2,-4"/>
      <path d="M-2,-4 C-8,-6 -13,-4 -15,0 M-2,-4 C-6,-10 -11,-12 -14,-9 M-2,-4 C-1,-11 4,-14 8,-12 M-2,-4 C3,-9 9,-11 12,-7 M-2,-4 C7,-5 12,-2 14,3"/>
      <circle cx="-3" cy="-2" r="1.5" fill="#7A4B0C"/>
      <circle cx="0" cy="-1" r="1.5" fill="#7A4B0C"/>
    </g>
  `,
  sesame: `
    <g stroke="#7A4B0C" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0,15 L0,-10"/>
      <path d="M0,-8 C-5,-10 -7,-6 -5,-3 C-3,0 0,-2 0,-2"/>
      <path d="M0,-3 C5,-5 7,-1 5,2 C3,5 0,3 0,3"/>
      <path d="M0,3 C-5,1 -7,5 -5,8 C-3,11 0,9 0,9"/>
      <path d="M0,7 C5,5 7,9 5,12 C3,15 0,13 0,13"/>
      <circle cx="0" cy="-11" r="1.8" fill="#7A4B0C"/>
    </g>
  `,
  safflower: `
    <g stroke="#7A4B0C" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0,14 L0,2"/>
      <path d="M-7,2 C-7,-4 7,-4 7,2 C7,6 -7,6 -7,2 Z"/>
      <path d="M-5,-4 C-7,-10 -4,-14 0,-15 C4,-14 7,-10 5,-4"/>
      <path d="M-2,-4 C-3,-9 0,-12 2,-9 L0,-4"/>
      <path d="M-6,7 C-10,8 -11,11 -9,13"/>
      <path d="M6,7 C10,8 11,11 9,13"/>
    </g>
  `,
  flaxseed: `
    <g stroke="#7A4B0C" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0,14 L0,-2"/>
      <circle cx="0" cy="-7" r="2.5" fill="#C88A2C"/>
      <path d="M0,-9.5 C-4,-14 -7,-12 -5,-8 C-3,-5 0,-7 0,-7"/>
      <path d="M0,-9.5 C4,-14 7,-12 5,-8 C3,-5 0,-7 0,-7"/>
      <path d="M-2.5,-7 C-7,-8 -7,-4 -4,-3 C-2,-2 -2,-6 -2.5,-7"/>
      <path d="M2.5,-7 C7,-8 7,-4 4,-3 C2,-2 2,-6 2.5,-7"/>
      <path d="M-1.5,-4.5 C-4,-2 -3,2 0,1"/>
      <path d="M1.5,-4.5 C4,-2 3,2 0,1"/>
    </g>
  `,
  castor: `
    <g stroke="#7A4B0C" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0,14 L0,2"/>
      <path d="M0,2 L-11,-2 L-6,-8 L0,-12 L6,-8 L11,-2 Z"/>
      <path d="M0,2 L-8,-5 M0,2 L-4,-9 M0,2 L0,-11 M0,2 L4,-9 M0,2 L8,-5"/>
    </g>
  `,
  walnut: `
    <g stroke="#7A4B0C" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0,-12 C-9,-12 -12,-4 -11,3 C-10,10 -5,14 0,14 C5,14 10,10 11,3 C12,-4 9,-12 0,-12 Z"/>
      <path d="M0,-12 L0,14"/>
      <path d="M-1,-5 C-6,-7 -7,-2 -4,0 C-2,1 -5,4 -4,8"/>
      <path d="M1,-5 C6,-7 7,-2 4,0 C2,1 5,4 4,8"/>
    </g>
  `,
  almond: `
    <g stroke="#7A4B0C" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0,-14 C-7,-7 -9,4 -5,11 C-2,15 2,15 5,11 C9,4 7,-7 0,-14 Z"/>
      <path d="M0,-11 C-3,-5 -4,2 -1,8" stroke-dasharray="1,2"/>
      <path d="M1,-11 C4,-5 4,2 2,8" stroke-dasharray="1,2"/>
    </g>
  `,
  apricot: `
    <g stroke="#7A4B0C" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="0" cy="1" r="11"/>
      <path d="M0,-10 C-1,-5 -1,7 0,12"/>
      <path d="M-1,-10 C-2,-14 -6,-15 -9,-13 M-1,-10 C1,-14 6,-14 8,-12"/>
    </g>
  `,
  herb: `
    <g stroke="#7A4B0C" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0,15 L0,-12"/>
      <path d="M0,-6 C-6,-10 -9,-5 -5,-2 C-2,0 0,-4 0,-4"/>
      <path d="M0,-1 C6,-5 9,0 5,3 C2,5 0,1 0,1"/>
      <path d="M0,4 C-6,0 -9,5 -5,8 C-2,10 0,6 0,6"/>
      <path d="M0,9 C6,5 9,10 5,13 C2,15 0,11 0,11"/>
    </g>
  `,
  cow: `
    <g stroke="#7A4B0C" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M-8,-8 C-12,-12 -10,-15 -7,-14 C-4,-13 -4,-9 -4,-7"/>
      <path d="M8,-8 C12,-12 10,-15 7,-14 C4,-13 4,-9 4,-7"/>
      <path d="M-6,-6 C-8,-2 -7,5 -4,9 C-2,12 2,12 4,9 C7,5 8,-2 6,-6 C4,-8 -4,-8 -6,-6 Z"/>
      <circle cx="-3" cy="0" r="1.2" fill="#7A4B0C"/>
      <circle cx="3" cy="0" r="1.2" fill="#7A4B0C"/>
      <path d="M-2,6 C-1,7 1,7 2,6"/>
    </g>
  `,
  honey: `
    <g stroke="#7A4B0C" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0,-12 L6,-8 L6,-1 L0,3 L-6,-1 L-6,-8 Z"/>
      <path d="M-6,-1 L0,3 L0,10 L-6,6 L-12,2 L-12,-5 L-6,-1 Z"/>
      <path d="M6,-1 L12,3 L12,10 L6,14 L0,10 L0,3 L6,-1 Z"/>
      <circle cx="0" cy="-4" r="1.5" fill="#C88A2C"/>
    </g>
  `,
};

function generateTallBottle(name, oilColor, iconKey, subtitle, volume = "500 ML") {
  const iconSvg = ICONS[iconKey] || ICONS.mustard;
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 640" width="360" height="640">
  <defs>
    <!-- Background glow shadow -->
    <radialGradient id="base-shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1C1612" stop-opacity="0.25"/>
      <stop offset="60%" stop-color="#1C1612" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#1C1612" stop-opacity="0"/>
    </radialGradient>

    <!-- Liquid body gradient -->
    <linearGradient id="oil-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${oilColor}" stop-opacity="0.95"/>
      <stop offset="25%" stop-color="${oilColor}"/>
      <stop offset="50%" stop-color="#FFE8A3" stop-opacity="0.85"/>
      <stop offset="75%" stop-color="${oilColor}"/>
      <stop offset="100%" stop-color="${oilColor}" stop-opacity="0.95"/>
    </linearGradient>

    <!-- Cork gradient -->
    <linearGradient id="cork-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8A5A30"/>
      <stop offset="35%" stop-color="#C49364"/>
      <stop offset="70%" stop-color="#DFB387"/>
      <stop offset="100%" stop-color="#7B4D25"/>
    </linearGradient>

    <!-- Glass gloss highlight -->
    <linearGradient id="glass-spec" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.45"/>
      <stop offset="15%" stop-color="#FFFFFF" stop-opacity="0.75"/>
      <stop offset="30%" stop-color="#FFFFFF" stop-opacity="0.1"/>
      <stop offset="70%" stop-color="#FFFFFF" stop-opacity="0.05"/>
      <stop offset="85%" stop-color="#FFFFFF" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.1"/>
    </linearGradient>

    <!-- Paper label texture / gradient -->
    <linearGradient id="paper-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF6EE"/>
      <stop offset="50%" stop-color="#F4ECE0"/>
      <stop offset="100%" stop-color="#EFE6D4"/>
    </linearGradient>
  </defs>

  <!-- Shadow under bottle -->
  <ellipse cx="180" cy="605" rx="72" ry="14" fill="url(#base-shadow)"/>

  <!-- Bottle Group -->
  <g id="bottle">
    <!-- Liquid inside glass -->
    <path d="M 124 235
             C 124 195 160 175 162 125
             L 198 125
             C 200 175 236 195 236 235
             L 236 580
             C 236 592 225 597 180 597
             C 135 597 124 592 124 580 Z"
          fill="url(#oil-grad)"/>

    <!-- Bottom glass thickness ring -->
    <path d="M 124 570 C 124 585 145 596 180 596 C 215 596 236 585 236 570 L 236 584 C 236 595 220 600 180 600 C 140 600 124 595 124 584 Z"
          fill="#1C1612" fill-opacity="0.12"/>

    <!-- Outer Glass Shell -->
    <path d="M 120 235
             C 120 190 158 170 160 115
             L 160 85
             C 156 85 155 80 155 78
             L 155 72
             C 155 69 158 68 162 68
             L 198 68
             C 202 68 205 69 205 72
             L 205 78
             C 205 80 204 85 200 85
             L 200 115
             C 202 170 240 190 240 235
             L 240 584
             C 240 598 226 603 180 603
             C 134 603 120 598 120 584 Z"
          fill="none" stroke="#FFFFFF" stroke-opacity="0.65" stroke-width="2.5"/>

    <!-- Natural Cork Stopper -->
    <path d="M 163 68 L 165 42 C 165 38 168 36 172 36 L 188 36 C 192 36 195 38 195 42 L 197 68 Z"
          fill="url(#cork-grad)" stroke="#683F1C" stroke-width="1"/>
    <!-- Cork texture lines -->
    <line x1="168" y1="48" x2="173" y2="48" stroke="#523115" stroke-width="1" stroke-opacity="0.6"/>
    <line x1="184" y1="54" x2="191" y2="54" stroke="#523115" stroke-width="1.2" stroke-opacity="0.6"/>
    <line x1="172" y1="60" x2="178" y2="60" stroke="#523115" stroke-width="0.8" stroke-opacity="0.6"/>

    <!-- Linen Paper Label -->
    <g id="label" transform="translate(125, 252)">
      <!-- Label Base with drop shadow -->
      <rect x="0" y="0" width="110" height="240" rx="3" fill="url(#paper-grad)"/>
      <rect x="0" y="0" width="110" height="240" rx="3" fill="none" stroke="#D8C7B0" stroke-width="0.8"/>

      <!-- Inner gold border -->
      <rect x="4" y="4" width="102" height="232" rx="2" fill="none" stroke="#C88A2C" stroke-width="0.8" stroke-opacity="0.65"/>

      <!-- Brand Logo Header -->
      <text x="55" y="32" font-family="'EB Garamond', Georgia, serif" font-size="13" font-weight="600" letter-spacing="3.5" fill="#1C1612" text-anchor="middle">
        SRSTI
      </text>
      <line x1="45" y1="38" x2="65" y2="38" stroke="#7A4B0C" stroke-width="0.8"/>

      <!-- Subtitle -->
      <text x="55" y="52" font-family="'DM Mono', monospace" font-size="5.5" font-weight="500" letter-spacing="1.2" fill="#7A4B0C" text-anchor="middle">
        WOOD-PRESSED
      </text>

      <!-- Product Name in 2 lines -->
      <text x="55" y="72" font-family="'EB Garamond', Georgia, serif" font-size="9" font-weight="700" letter-spacing="0.8" fill="#1C1612" text-anchor="middle">
        ${name.split(' ')[0] || ''}
      </text>
      <text x="55" y="83" font-family="'EB Garamond', Georgia, serif" font-size="8.5" font-weight="700" letter-spacing="0.8" fill="#1C1612" text-anchor="middle">
        ${name.split(' ').slice(1).join(' ') || ''}
      </text>

      <!-- Botanical Icon -->
      <g transform="translate(55, 126) scale(1.15)">
        ${iconSvg}
      </g>

      <!-- Provenance note -->
      <text x="55" y="168" font-family="'EB Garamond', Georgia, serif" font-style="italic" font-size="6.5" fill="#6E5D4F" text-anchor="middle">
        ${subtitle}
      </text>

      <!-- Baseline attributes -->
      <line x1="20" y1="184" x2="90" y2="184" stroke="#D8C7B0" stroke-width="0.6"/>
      <text x="55" y="196" font-family="'DM Mono', monospace" font-size="5.2" letter-spacing="1.2" fill="#7A4B0C" text-anchor="middle">
        PURE BY NATURE
      </text>
      <text x="55" y="214" font-family="'DM Mono', monospace" font-size="7" font-weight="600" letter-spacing="1.5" fill="#1C1612" text-anchor="middle">
        ${volume}
      </text>
    </g>

    <!-- Glass Specular Highlight Overlay -->
    <path d="M 126 235
             C 126 195 162 175 164 125
             L 174 125
             C 172 175 138 195 136 235
             L 136 580
             L 126 580 Z"
          fill="url(#glass-spec)" opacity="0.85"/>
  </g>
</svg>`;
}

function generateStoutBottle(name, oilColor, iconKey, subtitle, volume = "250 ML") {
  const iconSvg = ICONS[iconKey] || ICONS.coconut;
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 640" width="360" height="640">
  <defs>
    <radialGradient id="stout-shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1C1612" stop-opacity="0.25"/>
      <stop offset="60%" stop-color="#1C1612" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#1C1612" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="stout-oil" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${oilColor}" stop-opacity="0.95"/>
      <stop offset="25%" stop-color="${oilColor}"/>
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.9"/>
      <stop offset="75%" stop-color="${oilColor}"/>
      <stop offset="100%" stop-color="${oilColor}" stop-opacity="0.95"/>
    </linearGradient>

    <linearGradient id="wood-cap" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#805632"/>
      <stop offset="40%" stop-color="#BA885C"/>
      <stop offset="70%" stop-color="#D7A97E"/>
      <stop offset="100%" stop-color="#724824"/>
    </linearGradient>

    <linearGradient id="stout-glass-spec" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.6"/>
      <stop offset="20%" stop-color="#FFFFFF" stop-opacity="0.85"/>
      <stop offset="35%" stop-color="#FFFFFF" stop-opacity="0.1"/>
      <stop offset="80%" stop-color="#FFFFFF" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.2"/>
    </linearGradient>

    <linearGradient id="paper-grad-stout" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF6EE"/>
      <stop offset="50%" stop-color="#F4ECE0"/>
      <stop offset="100%" stop-color="#EFE6D4"/>
    </linearGradient>
  </defs>

  <ellipse cx="180" cy="580" rx="90" ry="16" fill="url(#stout-shadow)"/>

  <g id="stout-bottle">
    <!-- Liquid -->
    <path d="M 104 260
             C 104 200 148 185 154 150
             L 206 150
             C 212 185 256 200 256 260
             L 256 550
             C 256 565 240 572 180 572
             C 120 572 104 565 104 550 Z"
          fill="url(#stout-oil)"/>

    <!-- Bottom rim -->
    <path d="M 104 540 C 104 560 135 572 180 572 C 225 572 256 560 256 540 L 256 554 C 256 569 238 576 180 576 C 122 576 104 569 104 554 Z"
          fill="#1C1612" fill-opacity="0.12"/>

    <!-- Glass Bottle Body -->
    <path d="M 100 260
             C 100 195 146 180 150 140
             L 150 115
             C 146 115 144 110 144 107
             L 144 102
             C 144 98 148 97 152 97
             L 208 97
             C 212 97 216 98 216 102
             L 216 107
             C 216 110 214 115 210 115
             L 210 140
             C 214 180 260 195 260 260
             L 260 554
             C 260 572 242 578 180 578
             C 118 578 100 572 100 554 Z"
          fill="none" stroke="#FFFFFF" stroke-opacity="0.7" stroke-width="3"/>

    <!-- Wooden Cap -->
    <rect x="142" y="60" width="76" height="38" rx="7" fill="url(#wood-cap)" stroke="#5B381A" stroke-width="1"/>
    <!-- Wood grain -->
    <line x1="148" y1="70" x2="212" y2="70" stroke="#523115" stroke-width="0.8" stroke-opacity="0.5"/>
    <line x1="152" y1="80" x2="204" y2="80" stroke="#523115" stroke-width="1" stroke-opacity="0.6"/>

    <!-- Label -->
    <g id="stout-label" transform="translate(108, 260)">
      <rect x="0" y="0" width="144" height="230" rx="3" fill="url(#paper-grad-stout)"/>
      <rect x="0" y="0" width="144" height="230" rx="3" fill="none" stroke="#D8C7B0" stroke-width="0.8"/>
      <rect x="5" y="5" width="134" height="220" rx="2" fill="none" stroke="#C88A2C" stroke-width="0.8" stroke-opacity="0.65"/>

      <text x="72" y="32" font-family="'EB Garamond', Georgia, serif" font-size="14" font-weight="600" letter-spacing="4" fill="#1C1612" text-anchor="middle">
        SRSTI
      </text>
      <line x1="58" y1="38" x2="86" y2="38" stroke="#7A4B0C" stroke-width="0.8"/>

      <text x="72" y="52" font-family="'DM Mono', monospace" font-size="6" font-weight="500" letter-spacing="1.2" fill="#7A4B0C" text-anchor="middle">
        WOOD-PRESSED · VIRGIN
      </text>

      <text x="72" y="74" font-family="'EB Garamond', Georgia, serif" font-size="11" font-weight="700" letter-spacing="0.8" fill="#1C1612" text-anchor="middle">
        ${name.split(' ')[0] || ''}
      </text>
      <text x="72" y="87" font-family="'EB Garamond', Georgia, serif" font-size="10" font-weight="700" letter-spacing="0.8" fill="#1C1612" text-anchor="middle">
        ${name.split(' ').slice(1).join(' ') || ''}
      </text>

      <g transform="translate(72, 126) scale(1.2)">
        ${iconSvg}
      </g>

      <text x="72" y="166" font-family="'EB Garamond', Georgia, serif" font-style="italic" font-size="7" fill="#6E5D4F" text-anchor="middle">
        ${subtitle}
      </text>

      <line x1="28" y1="180" x2="116" y2="180" stroke="#D8C7B0" stroke-width="0.6"/>
      <text x="72" y="192" font-family="'DM Mono', monospace" font-size="5.5" letter-spacing="1.2" fill="#7A4B0C" text-anchor="middle">
        COLD PRESSED PURE &amp; NATURAL
      </text>
      <text x="72" y="209" font-family="'DM Mono', monospace" font-size="7.5" font-weight="600" letter-spacing="1.5" fill="#1C1612" text-anchor="middle">
        ${volume}
      </text>
    </g>

    <!-- Glass Specular Highlight -->
    <path d="M 106 260
             C 106 205 150 190 154 150
             L 168 150
             C 162 190 122 205 120 260
             L 120 550
             L 106 550 Z"
          fill="url(#stout-glass-spec)" opacity="0.85"/>
  </g>
</svg>`;
}

function generateGheeJar(name, gheeColor, iconKey, subtitle, volume = "500 ML") {
  const iconSvg = ICONS[iconKey] || ICONS.cow;
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 640" width="360" height="640">
  <defs>
    <radialGradient id="jar-shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1C1612" stop-opacity="0.25"/>
      <stop offset="60%" stop-color="#1C1612" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#1C1612" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="ghee-fill" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${gheeColor}" stop-opacity="0.95"/>
      <stop offset="35%" stop-color="${gheeColor}"/>
      <stop offset="55%" stop-color="#FFF2CE"/>
      <stop offset="80%" stop-color="${gheeColor}"/>
      <stop offset="100%" stop-color="${gheeColor}" stop-opacity="0.95"/>
    </linearGradient>

    <linearGradient id="lid-wood" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6F4822"/>
      <stop offset="35%" stop-color="#B28052"/>
      <stop offset="70%" stop-color="#CFA174"/>
      <stop offset="100%" stop-color="#653D19"/>
    </linearGradient>

    <linearGradient id="paper-grad-jar" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF6EE"/>
      <stop offset="50%" stop-color="#F4ECE0"/>
      <stop offset="100%" stop-color="#EFE6D4"/>
    </linearGradient>
  </defs>

  <ellipse cx="180" cy="565" rx="98" ry="18" fill="url(#jar-shadow)"/>

  <g id="ghee-jar">
    <!-- Ghee Fill -->
    <path d="M 94 285
             C 94 240 120 220 134 200
             L 226 200
             C 240 220 266 240 266 285
             L 266 530
             C 266 550 244 558 180 558
             C 116 558 94 550 94 530 Z"
          fill="url(#ghee-fill)"/>

    <!-- Bottom glass edge -->
    <path d="M 94 520 C 94 542 125 556 180 556 C 235 556 266 542 266 520 L 266 536 C 266 555 240 562 180 562 C 120 562 94 555 94 536 Z"
          fill="#1C1612" fill-opacity="0.12"/>

    <!-- Outer Jar Glass Contour -->
    <path d="M 90 285
             C 90 235 118 215 130 195
             L 130 172
             L 230 172
             L 230 195
             C 242 215 270 235 270 285
             L 270 534
             C 270 556 246 564 180 564
             C 114 564 90 556 90 534 Z"
          fill="none" stroke="#FFFFFF" stroke-opacity="0.75" stroke-width="3"/>

    <!-- Wooden Lid -->
    <rect x="120" y="140" width="120" height="34" rx="6" fill="url(#lid-wood)" stroke="#523115" stroke-width="1"/>
    <!-- Brass clasp ring -->
    <rect x="126" y="168" width="108" height="6" fill="#C8963E" stroke="#7A4B0C" stroke-width="0.5"/>

    <!-- Label -->
    <g id="jar-label" transform="translate(100, 275)">
      <rect x="0" y="0" width="160" height="210" rx="3" fill="url(#paper-grad-jar)"/>
      <rect x="0" y="0" width="160" height="210" rx="3" fill="none" stroke="#D8C7B0" stroke-width="0.8"/>
      <rect x="5" y="5" width="150" height="200" rx="2" fill="none" stroke="#C88A2C" stroke-width="0.8" stroke-opacity="0.65"/>

      <text x="80" y="30" font-family="'EB Garamond', Georgia, serif" font-size="14" font-weight="600" letter-spacing="4" fill="#1C1612" text-anchor="middle">
        SRSTI
      </text>
      <line x1="64" y1="36" x2="96" y2="36" stroke="#7A4B0C" stroke-width="0.8"/>

      <text x="80" y="50" font-family="'DM Mono', monospace" font-size="6" font-weight="500" letter-spacing="1.2" fill="#7A4B0C" text-anchor="middle">
        VEDIC BILONA · HAND-CHURNED
      </text>

      <text x="80" y="70" font-family="'EB Garamond', Georgia, serif" font-size="11" font-weight="700" letter-spacing="0.8" fill="#1C1612" text-anchor="middle">
        ${name.split(' ')[0] || ''}
      </text>
      <text x="80" y="83" font-family="'EB Garamond', Georgia, serif" font-size="10" font-weight="700" letter-spacing="0.8" fill="#1C1612" text-anchor="middle">
        ${name.split(' ').slice(1).join(' ') || ''}
      </text>

      <g transform="translate(80, 118) scale(1.2)">
        ${iconSvg}
      </g>

      <text x="80" y="152" font-family="'EB Garamond', Georgia, serif" font-style="italic" font-size="7" fill="#6E5D4F" text-anchor="middle">
        ${subtitle}
      </text>

      <line x1="30" y1="166" x2="130" y2="166" stroke="#D8C7B0" stroke-width="0.6"/>
      <text x="80" y="178" font-family="'DM Mono', monospace" font-size="5.5" letter-spacing="1.2" fill="#7A4B0C" text-anchor="middle">
        PURE CULTURED CURD CHURNED
      </text>
      <text x="80" y="194" font-family="'DM Mono', monospace" font-size="7.5" font-weight="600" letter-spacing="1.5" fill="#1C1612" text-anchor="middle">
        ${volume}
      </text>
    </g>

    <!-- Glass Specular Highlight -->
    <path d="M 96 285
             C 96 240 120 220 134 200
             L 148 200
             C 134 220 114 240 112 285
             L 112 530
             L 96 530 Z"
          fill="#FFFFFF" opacity="0.6"/>
  </g>
</svg>`;
}

// 20 Products Specification
const PRODUCTS_DATA = [
  // 1. Groundnut (Tall)
  { file: 'srsti-groundnut.svg', type: 'tall', name: 'Cold-Pressed Groundnut Oil', color: '#D49B3E', icon: 'peanut', sub: 'Kadiri Heirloom Peanuts · Anantapur', vol: '1 LITRE' },
  // 2. Yellow Mustard (Tall)
  { file: 'srsti-yellow-mustard.svg', type: 'tall', name: 'Yellow Mustard Oil', color: '#E8B928', icon: 'mustard', sub: 'Pili Sarson · Bharatpur, Rajasthan', vol: '500 ML' },
  // 3. Black Mustard (Tall)
  { file: 'srsti-black-mustard.svg', type: 'tall', name: 'Black Mustard Oil', color: '#A85E12', icon: 'mustard', sub: 'Kachi Ghani Sarson · Alwar, Rajasthan', vol: '1 LITRE' },
  // 4. Black Sesame (Tall)
  { file: 'srsti-black-sesame.svg', type: 'tall', name: 'Black Sesame Oil', color: '#5C3818', icon: 'sesame', sub: 'Karuvelam Nalla Ennai · Thanjavur', vol: '500 ML' },
  // 5. White Sesame (Tall)
  { file: 'srsti-white-sesame.svg', type: 'tall', name: 'White Sesame Oil', color: '#E5BF72', icon: 'sesame', sub: 'Safed Til · Bundelkhand', vol: '500 ML' },
  // 6. Safflower (Tall)
  { file: 'srsti-safflower.svg', type: 'tall', name: 'Safflower Oil (Kusum)', color: '#F0A31E', icon: 'safflower', sub: 'Single-Origin Kusum · Marathwada', vol: '1 LITRE' },
  // 7. Niger Seed (Tall)
  { file: 'srsti-niger-seed.svg', type: 'tall', name: 'Niger Seed Oil (Ramtil)', color: '#884E18', icon: 'sesame', sub: 'Tribal Heirloom Ramtil · Dindori', vol: '500 ML' },
  // 8. Flaxseed (Tall)
  { file: 'srsti-flaxseed.svg', type: 'tall', name: 'Golden Flaxseed Oil', color: '#B87820', icon: 'flaxseed', sub: '55% Plant Omega-3 · Malwa Plateau', vol: '500 ML' },
  // 9. Walnut (Tall)
  { file: 'srsti-walnut.svg', type: 'tall', name: 'Wood-Pressed Walnut Oil', color: '#C88D34', icon: 'walnut', sub: 'Single-Grove Akhrot · Shopian, Kashmir', vol: '250 ML' },
  // 10. Bhringraj Hair Oil (Tall)
  { file: 'srsti-bhringraj-hair.svg', type: 'tall', name: 'Keshya Bhringraj Oil', color: '#3A2E1A', icon: 'herb', sub: '21 Ayurvedic Herbs · Sesame Infusion', vol: '200 ML' },

  // 11. Virgin Coconut (Stout)
  { file: 'srsti-coconut.svg', type: 'stout', name: 'Virgin Coconut Oil', color: '#F8F6F0', icon: 'coconut', sub: 'Kera Thailam · Kasaragod, Kerala', vol: '500 ML' },
  // 12. Castor Oil (Stout)
  { file: 'srsti-castor.svg', type: 'stout', name: 'Virgin Castor Oil', color: '#F0DFA0', icon: 'castor', sub: 'Cold-Drawn Arandi · Kutch, Gujarat', vol: '250 ML' },
  // 13. Sweet Almond (Stout)
  { file: 'srsti-almond.svg', type: 'stout', name: 'Sweet Almond Oil', color: '#E8C56A', icon: 'almond', sub: 'Mamra Badam Rogan · Pulwama, Kashmir', vol: '100 ML' },
  // 14. Apricot Kernel (Stout)
  { file: 'srsti-apricot.svg', type: 'stout', name: 'Himalayan Apricot Oil', color: '#E89838', icon: 'apricot', sub: 'Wild Chuli Oil · Kinnaur, Himachal', vol: '100 ML' },
  // 15. Kalonji Black Seed (Stout)
  { file: 'srsti-kalonji.svg', type: 'stout', name: 'Kalonji Black Seed Oil', color: '#2B1C12', icon: 'sesame', sub: 'Nigella Sativa · Jabalpur', vol: '100 ML' },

  // 16. Gir Cow Ghee (Jar)
  { file: 'srsti-ghee-gir.svg', type: 'jar', name: 'A2 Gir Cow Bilona Ghee', color: '#E8A51C', icon: 'cow', sub: 'Grass-Fed Gir Cow Curd · Junagadh', vol: '500 ML' },
  // 17. Sahiwal Cow Ghee (Jar)
  { file: 'srsti-ghee-sahiwal.svg', type: 'jar', name: 'A2 Sahiwal Bilona Ghee', color: '#D89218', icon: 'cow', sub: 'Indigenous Sahiwal Cow · Punjab', vol: '500 ML' },
  // 18. Badri Cow Himalayan Ghee (Jar)
  { file: 'srsti-ghee-badri.svg', type: 'jar', name: 'A2 Badri Himalayan Ghee', color: '#ECAE1D', icon: 'cow', sub: 'High-Altitude Alpine Grazing · Uttarakhand', vol: '350 ML' },
  // 19. Buffalo Bilona Ghee (Jar)
  { file: 'srsti-ghee-buffalo.svg', type: 'jar', name: 'A2 Murrah Buffalo Ghee', color: '#FAF2E2', icon: 'cow', sub: 'Cultured Cream Murrah · Rohtak', vol: '500 ML' },
  // 20. Raw Forest Honey (Jar)
  { file: 'srsti-forest-honey.svg', type: 'jar', name: 'Wild Multi-Flora Honey', color: '#964E10', icon: 'honey', sub: 'Unprocessed Raw Honey · Corbett Forest', vol: '500 G' },
];

PRODUCTS_DATA.forEach(p => {
  let svgContent = '';
  if (p.type === 'tall') {
    svgContent = generateTallBottle(p.name, p.color, p.icon, p.sub, p.vol);
  } else if (p.type === 'stout') {
    svgContent = generateStoutBottle(p.name, p.color, p.icon, p.sub, p.vol);
  } else {
    svgContent = generateGheeJar(p.name, p.color, p.icon, p.sub, p.vol);
  }
  const filePath = path.join(outDir, p.file);
  fs.writeFileSync(filePath, svgContent.trim());
  console.log('Generated:', p.file);
});

console.log('All 20 bottle SVG assets generated successfully!');
