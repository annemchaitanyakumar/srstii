const fs = require('fs');
const path = require('path');

const tallBase64 = fs.readFileSync(path.join(__dirname, '../src/assets/srsti-groundnut-tall-cutout.png')).toString('base64');
const stoutBase64 = fs.readFileSync(path.join(__dirname, '../src/assets/srsti-coconut-stout-cutout.png')).toString('base64');
const gheeBase64 = fs.readFileSync(path.join(__dirname, '../src/assets/product-ghee.webp')).toString('base64');
const sesameBase64 = fs.readFileSync(path.join(__dirname, '../src/assets/product-sesame.webp')).toString('base64');

const outDir = path.join(__dirname, '../src/assets/bottles');

// Botanical fine-line vector icons
const BOTANICALS = {
  peanut: `
    <g stroke="#4A3C2F" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M-8,-6 C-12,-12 -4,-16 2,-12 C7,-9 7,-5 3,-2 C1,0 1,2 3,4 C7,7 7,12 2,14 C-4,17 -12,12 -8,6 C-7,4 -7,2 -8,-1 C-9,-3 -9,-5 -8,-6 Z"/>
      <path d="M-4,-10 C-2,-7 0,-4 -2,0 C-4,4 -2,8 0,11" stroke-dasharray="1,2"/>
      <path d="M3,-1 C7,-4 14,-3 16,1 C18,5 17,9 13,11 C10,12 8,10 7,7" />
    </g>
  `,
  mustard: `
    <g stroke="#4A3C2F" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="0" cy="-6" r="3.2"/>
      <circle cx="-7.5" cy="-2" r="3.2"/>
      <circle cx="7.5" cy="-2" r="3.2"/>
      <circle cx="0" cy="4.5" r="3.2"/>
      <circle cx="0" cy="-0.5" r="1.6" fill="#7A4B0C"/>
      <path d="M0,7.5 L0,18 M-3.5,12 L0,14.5 M3.5,12 L0,14.5"/>
    </g>
  `,
  coconut: `
    <g stroke="#4A3C2F" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0,16 C1,10 0,3 -2,-4"/>
      <path d="M-2,-4 C-8,-6 -14,-4 -16,1 M-2,-4 C-6,-11 -12,-13 -15,-10 M-2,-4 C-1,-12 5,-15 9,-13 M-2,-4 C4,-10 10,-12 13,-8 M-2,-4 C8,-5 14,-2 16,4"/>
      <circle cx="-3" cy="-2" r="1.8" fill="#4A3C2F"/>
      <circle cx="0" cy="-1" r="1.8" fill="#4A3C2F"/>
    </g>
  `,
  sesame: `
    <g stroke="#4A3C2F" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0,18 L0,-12"/>
      <path d="M0,-10 C-6,-12 -8,-7 -6,-4 C-4,0 0,-2 0,-2"/>
      <path d="M0,-4 C6,-6 8,-1 6,2 C4,5 0,3 0,3"/>
      <path d="M0,3 C-6,1 -8,6 -6,9 C-4,12 0,10 0,10"/>
      <path d="M0,8 C6,6 8,10 6,13 C4,16 0,14 0,14"/>
      <circle cx="0" cy="-13" r="2" fill="#4A3C2F"/>
    </g>
  `,
  safflower: `
    <g stroke="#4A3C2F" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0,18 L0,3"/>
      <path d="M-8,3 C-8,-4 8,-4 8,3 C8,8 -8,8 -8,3 Z"/>
      <path d="M-6,-4 C-8,-11 -5,-16 0,-17 C5,-16 8,-11 6,-4"/>
      <path d="M-2.5,-4 C-3.5,-10 0,-14 2.5,-10 L0,-4"/>
      <path d="M-7,9 C-11,10 -12,13 -10,15"/>
      <path d="M7,9 C11,10 12,13 10,15"/>
    </g>
  `,
  flaxseed: `
    <g stroke="#4A3C2F" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0,18 L0,-2"/>
      <circle cx="0" cy="-8" r="3" fill="#C88A2C"/>
      <path d="M0,-11 C-5,-16 -8,-14 -6,-9 C-3,-6 0,-8 0,-8"/>
      <path d="M0,-11 C5,-16 8,-14 6,-9 C3,-6 0,-8 0,-8"/>
      <path d="M-3,-8 C-8,-9 -8,-4 -5,-3 C-2,-2 -2,-7 -3,-8"/>
      <path d="M3,-8 C8,-9 8,-4 5,-3 C2,-2 2,-7 3,-8"/>
    </g>
  `,
  castor: `
    <g stroke="#4A3C2F" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0,18 L0,3"/>
      <path d="M0,3 L-13,-2 L-7,-9 L0,-14 L7,-9 L13,-2 Z"/>
      <path d="M0,3 L-9,-6 M0,3 L-5,-10 M0,3 L0,-13 M0,3 L5,-10 M0,3 L9,-6"/>
    </g>
  `,
  walnut: `
    <g stroke="#4A3C2F" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0,-14 C-10,-14 -14,-5 -12,4 C-11,12 -6,16 0,16 C6,16 11,12 12,4 C14,-5 10,-14 0,-14 Z"/>
      <path d="M0,-14 L0,16"/>
      <path d="M-1,-6 C-7,-8 -8,-2 -5,0 C-2,1 -6,5 -5,9"/>
      <path d="M1,-6 C7,-8 8,-2 5,0 C2,1 6,5 5,9"/>
    </g>
  `,
  almond: `
    <g stroke="#4A3C2F" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0,-16 C-8,-8 -10,5 -6,13 C-2,17 2,17 6,13 C10,5 8,-8 0,-16 Z"/>
      <path d="M0,-12 C-4,-6 -5,2 -1,9" stroke-dasharray="1,2"/>
      <path d="M1,-12 C5,-6 5,2 2,9" stroke-dasharray="1,2"/>
    </g>
  `,
  apricot: `
    <g stroke="#4A3C2F" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="0" cy="1" r="13"/>
      <path d="M0,-12 C-1,-6 -1,8 0,14"/>
      <path d="M-1,-12 C-2,-16 -7,-17 -10,-15 M-1,-12 C1,-16 7,-16 9,-14"/>
    </g>
  `,
  herb: `
    <g stroke="#4A3C2F" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0,18 L0,-14"/>
      <path d="M0,-7 C-7,-11 -10,-6 -6,-3 C-2,-1 0,-5 0,-5"/>
      <path d="M0,-1 C7,-6 10,0 6,4 C2,6 0,1 0,1"/>
      <path d="M0,5 C-7,1 -10,6 -6,10 C-2,12 0,7 0,7"/>
      <path d="M0,11 C7,7 10,12 6,15 C2,17 0,13 0,13"/>
    </g>
  `,
  cow: `
    <g stroke="#4A3C2F" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M-9,-9 C-13,-13 -11,-16 -8,-15 C-5,-14 -5,-10 -5,-8"/>
      <path d="M9,-9 C13,-13 11,-16 8,-15 C5,-14 5,-10 5,-8"/>
      <path d="M-7,-7 C-9,-2 -8,6 -5,10 C-2,13 2,13 5,10 C8,6 9,-2 7,-7 C5,-9 -5,-9 -7,-7 Z"/>
      <circle cx="-3.5" cy="0" r="1.3" fill="#4A3C2F"/>
      <circle cx="3.5" cy="0" r="1.3" fill="#4A3C2F"/>
      <path d="M-2.5,7 C-1,8 1,8 2.5,7"/>
    </g>
  `,
  honey: `
    <g stroke="#4A3C2F" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0,-14 L7,-9 L7,-1 L0,4 L-7,-1 L-7,-9 Z"/>
      <path d="M-7,-1 L0,4 L0,12 L-7,7 L-14,2 L-14,-6 L-7,-1 Z"/>
      <path d="M7,-1 L14,4 L14,12 L7,16 L0,12 L0,4 L7,-1 Z"/>
      <circle cx="0" cy="-5" r="1.8" fill="#C88A2C"/>
    </g>
  `,
};

function generateTall(t1, t2, oilTint, botanicalKey) {
  const icon = BOTANICALS[botanicalKey] || BOTANICALS.mustard;
  const isGroundnut = t1 === 'COLD PRESSED' && t2 === 'GROUNDNUT OIL';

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 858" width="212" height="858">
  <defs>
    <radialGradient id="label-patch-grad" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#E2D4BB"/>
      <stop offset="60%" stop-color="#D7C7AC"/>
      <stop offset="100%" stop-color="#CBB99C"/>
    </radialGradient>
  </defs>

  <!-- Real Master Studio Photograph -->
  <image href="data:image/png;base64,${tallBase64}" width="212" height="858" />

  ${oilTint ? `
  <!-- Liquid Color Tint Overlay -->
  <path d="M 33 210 C 33 175 66 150 82 135 L 130 135 C 146 150 179 175 179 210 L 179 308 L 33 308 Z"
        fill="${oilTint}" style="mix-blend-mode: color; opacity: 0.75;" />
  <path d="M 33 210 C 33 175 66 150 82 135 L 130 135 C 146 150 179 175 179 210 L 179 308 L 33 308 Z"
        fill="${oilTint}" style="mix-blend-mode: soft-light; opacity: 0.65;" />

  <path d="M 33 622 L 179 622 L 179 815 C 179 832 150 844 106 844 C 62 844 33 832 33 815 Z"
        fill="${oilTint}" style="mix-blend-mode: color; opacity: 0.75;" />
  <path d="M 33 622 L 179 622 L 179 815 C 179 832 150 844 106 844 C 62 844 33 832 33 815 Z"
        fill="${oilTint}" style="mix-blend-mode: soft-light; opacity: 0.65;" />
  ` : ''}

  ${!isGroundnut ? `
  <!-- Seamless Label Update for Product Name & Botanical Art -->
  <rect x="36" y="482" width="140" height="175" rx="3" fill="url(#label-patch-grad)" />

  <g transform="translate(106, 592) scale(1.15)">
    ${icon}
  </g>

  <text x="106" y="504" font-family="'EB Garamond', Georgia, serif" font-size="9" font-weight="600" letter-spacing="2.2" fill="#4A3C2F" text-anchor="middle">
    ${t1}
  </text>
  <text x="106" y="519" font-family="'EB Garamond', Georgia, serif" font-size="9" font-weight="600" letter-spacing="2.2" fill="#4A3C2F" text-anchor="middle">
    ${t2}
  </text>
  ` : ''}
</svg>`;
}

function generateStout(t1, t2, oilTint, botanicalKey, vol = '250 ml') {
  const icon = BOTANICALS[botanicalKey] || BOTANICALS.coconut;
  const isCoconut = t1 === 'VIRGIN' && t2 === 'COCONUT OIL';

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268 393" width="268" height="393">
  <defs>
    <radialGradient id="stout-patch-grad" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#EBE3D3"/>
      <stop offset="60%" stop-color="#DFD5C2"/>
      <stop offset="100%" stop-color="#D4C8B2"/>
    </radialGradient>
  </defs>

  <!-- Real Studio Master Photograph -->
  <image href="data:image/png;base64,${stoutBase64}" width="268" height="393" />

  ${oilTint ? `
  <path d="M 62 135 C 62 105 100 95 110 80 L 158 80 C 168 95 206 105 206 135 L 206 170 L 62 170 Z"
        fill="${oilTint}" style="mix-blend-mode: color; opacity: 0.70;" />
  <path d="M 62 305 L 206 305 L 206 365 C 206 375 180 380 134 380 C 88 380 62 375 62 365 Z"
        fill="${oilTint}" style="mix-blend-mode: color; opacity: 0.70;" />
  ` : ''}

  ${!isCoconut ? `
  <rect x="68" y="235" width="132" height="70" rx="2" fill="url(#stout-patch-grad)" />

  <g transform="translate(134, 215) scale(0.95)">
    ${icon}
  </g>

  <text x="134" y="247" font-family="'EB Garamond', Georgia, serif" font-size="7.5" font-weight="600" letter-spacing="1.5" fill="#4A3C2F" text-anchor="middle">
    ${t1}
  </text>
  <text x="134" y="259" font-family="'EB Garamond', Georgia, serif" font-size="8" font-weight="600" letter-spacing="1.5" fill="#4A3C2F" text-anchor="middle">
    ${t2}
  </text>
  ` : ''}
</svg>`;
}

function generateGheeJar(t1, t2, gheeTint, iconKey) {
  const icon = BOTANICALS[iconKey] || BOTANICALS.cow;
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 926" width="720" height="926">
  <!-- Real Studio Master Photograph of Vedic Ghee Jar -->
  <image href="data:image/webp;base64,${gheeBase64}" width="720" height="926" />

  ${gheeTint ? `
  <circle cx="360" cy="520" r="280" fill="${gheeTint}" style="mix-blend-mode: color; opacity: 0.65;" />
  <circle cx="360" cy="520" r="280" fill="${gheeTint}" style="mix-blend-mode: soft-light; opacity: 0.50;" />
  ` : ''}
</svg>`;
}

// 1. TALL BOTTLES (Exact Studio Photograph base)
const TALL = [
  { file: 'srsti-groundnut.svg', t1: 'COLD PRESSED', t2: 'GROUNDNUT OIL', tint: null, icon: 'peanut' },
  { file: 'srsti-yellow-mustard.svg', t1: 'COLD PRESSED', t2: 'YELLOW MUSTARD OIL', tint: '#FFC800', icon: 'mustard' },
  { file: 'srsti-black-mustard.svg', t1: 'WOOD PRESSED', t2: 'BLACK MUSTARD OIL', tint: '#B34700', icon: 'mustard' },
  { file: 'srsti-black-sesame.svg', t1: 'COLD PRESSED', t2: 'BLACK SESAME OIL', tint: '#4A2A14', icon: 'sesame' },
  { file: 'srsti-white-sesame.svg', t1: 'COLD PRESSED', t2: 'WHITE SESAME OIL', tint: '#E5BF72', icon: 'sesame' },
  { file: 'srsti-safflower.svg', t1: 'COLD PRESSED', t2: 'SAFFLOWER OIL', tint: '#FFAA00', icon: 'safflower' },
  { file: 'srsti-niger-seed.svg', t1: 'COLD PRESSED', t2: 'NIGER SEED OIL', tint: '#8A4500', icon: 'sesame' },
  { file: 'srsti-flaxseed.svg', t1: 'COLD PRESSED', t2: 'FLAXSEED OIL', tint: '#C97700', icon: 'flaxseed' },
  { file: 'srsti-walnut.svg', t1: 'WOOD PRESSED', t2: 'WALNUT OIL', tint: '#C98624', icon: 'walnut' },
  { file: 'srsti-bhringraj-hair.svg', t1: 'AYURVEDIC', t2: 'BHRINGRAJ OIL', tint: '#261C10', icon: 'herb' },
];

TALL.forEach(p => {
  const content = generateTall(p.t1, p.t2, p.tint, p.icon);
  fs.writeFileSync(path.join(outDir, p.file), content.trim());
  console.log('Built studio tall bottle:', p.file);
});

// 2. STOUT JARS (Exact Studio Photograph base)
const STOUT = [
  { file: 'srsti-coconut.svg', t1: 'VIRGIN', t2: 'COCONUT OIL', tint: null, icon: 'coconut' },
  { file: 'srsti-castor.svg', t1: 'COLD PRESSED', t2: 'VIRGIN CASTOR OIL', tint: '#F0DFA0', icon: 'castor' },
  { file: 'srsti-almond.svg', t1: 'KASHMIRI MAMRA', t2: 'SWEET ALMOND OIL', tint: '#E8C56A', icon: 'almond' },
  { file: 'srsti-apricot.svg', t1: 'HIMALAYAN WILD', t2: 'APRICOT KERNEL OIL', tint: '#E89838', icon: 'apricot' },
  { file: 'srsti-kalonji.svg', t1: 'COLD PRESSED', t2: 'KALONJI SEED OIL', tint: '#2B1C12', icon: 'sesame' },
];

STOUT.forEach(p => {
  const content = generateStout(p.t1, p.t2, p.tint, p.icon);
  fs.writeFileSync(path.join(outDir, p.file), content.trim());
  console.log('Built studio stout bottle:', p.file);
});

// 3. GHEE & HONEY JARS (Exact Studio Photograph base)
const GHEE_JARS = [
  { file: 'srsti-ghee-gir.svg', t1: 'A2 GIR COW', t2: 'BILONA GHEE', tint: null, icon: 'cow' },
  { file: 'srsti-ghee-sahiwal.svg', t1: 'A2 SAHIWAL', t2: 'BILONA GHEE', tint: '#E89818', icon: 'cow' },
  { file: 'srsti-ghee-badri.svg', t1: 'A2 BADRI', t2: 'HIMALAYAN GHEE', tint: '#FFB81C', icon: 'cow' },
  { file: 'srsti-ghee-buffalo.svg', t1: 'A2 MURRAH', t2: 'BUFFALO GHEE', tint: '#FFF8EB', icon: 'cow' },
  { file: 'srsti-forest-honey.svg', t1: 'WILD MULTI-FLORA', t2: 'FOREST HONEY', tint: '#964E10', icon: 'honey' },
];

GHEE_JARS.forEach(p => {
  const content = generateGheeJar(p.t1, p.t2, p.tint, p.icon);
  fs.writeFileSync(path.join(outDir, p.file), content.trim());
  console.log('Built studio ghee/honey jar:', p.file);
});

console.log('All 20 bottles built with 100% studio photographic clarity!');
