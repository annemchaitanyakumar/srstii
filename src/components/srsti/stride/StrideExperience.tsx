import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

import { useCart } from "@/components/srsti/cart";
import { PRODUCTS } from "@/lib/srsti/products";
import "./stride.css";

// Height ratio for 500ml heritage oil bottle (width 1 : height ~2.18)
const BH = 2.18;
const CR = 0.055;

interface HarvestFlavour {
  id: number;
  slug: string;
  name: string;
  cardLines: [string, string];
  color: string;
  darkColor: string;
  price: number;
  volume: string;
  tag: string;
  ingredients: string;
  oilColor: string;
  labelBg: string;
  smokePoint: string;
  image: string;
}

const HARVEST_FLAVOURS: HarvestFlavour[] = [
  {
    id: 0,
    slug: "wood-pressed-groundnut-oil",
    name: "Groundnut Oil",
    cardLines: ["WOOD-PRESSED", "GROUNDNUT"],
    color: "#D49B3E",
    darkColor: "#5A3810",
    price: 420,
    volume: "500 ml",
    tag: "Saurashtra Heirloom",
    ingredients: "100% Saurashtra HPS native groundnuts. Cold-pressed in neem wood below 35°C.",
    oilColor: "#E8B248",
    labelBg: "#FAF4E8",
    smokePoint: "160°C",
    image: "/assets/bottles/srsti-groundnut.svg",
  },
  {
    id: 1,
    slug: "virgin-cold-pressed-coconut-oil",
    name: "Virgin Coconut",
    cardLines: ["VIRGIN COLD-PRESSED", "COCONUT"],
    color: "#4A6B5D",
    darkColor: "#1E3027",
    price: 460,
    volume: "500 ml",
    tag: "Pollachi Sun-Dried",
    ingredients: "Fresh Pollachi farm copra. Centrifuged raw, 62% medium-chain MCTs.",
    oilColor: "#F4EFE6",
    labelBg: "#F7F5EE",
    smokePoint: "177°C",
    image: "/assets/bottles/srsti-coconut.svg",
  },
  {
    id: 2,
    slug: "raw-yellow-mustard-oil",
    name: "Yellow Mustard",
    cardLines: ["PUNGENT YELLOW", "MUSTARD"],
    color: "#C88218",
    darkColor: "#4E2F0A",
    price: 390,
    volume: "500 ml",
    tag: "Rajasthan Native",
    ingredients: "Alwar native yellow mustard seeds. Cold-turned below 35°C with natural allyl kick.",
    oilColor: "#DDA022",
    labelBg: "#F9F3E4",
    smokePoint: "250°C",
    image: "/assets/bottles/srsti-yellow-mustard.svg",
  },
  {
    id: 3,
    slug: "wood-pressed-black-sesame-oil",
    name: "Black Sesame",
    cardLines: ["TRADITIONAL BLACK", "SESAME"],
    color: "#382A20",
    darkColor: "#1C140E",
    price: 480,
    volume: "500 ml",
    tag: "Guntur Native Gingelly",
    ingredients: "Whole unhulled heirloom black sesame seeds. Rich in sesamol lignans.",
    oilColor: "#32231A",
    labelBg: "#EFEBE5",
    smokePoint: "177°C",
    image: "/assets/bottles/srsti-black-sesame.svg",
  },
  {
    id: 4,
    slug: "a2-gir-cow-cultured-ghee",
    name: "Gir Cow Ghee",
    cardLines: ["CULTURED BILONA", "GIR COW GHEE"],
    color: "#E2A632",
    darkColor: "#62400A",
    price: 1450,
    volume: "500 ml",
    tag: "Gir Somnath A2 Bilona",
    ingredients: "Whole A2 Gir cow milk curd, earthen-pot hand-churned makhan, slow firewood simmer.",
    oilColor: "#F2B83D",
    labelBg: "#FBF5E6",
    smokePoint: "252°C",
    image: "/assets/bottles/srsti-ghee-gir.svg",
  },
];

const STEP_DATA = [
  {
    num: "01",
    head: "HEIRLOOM SEEDS,<br>FIRST",
    cap: "NATIVE SINGLE-ORIGIN HARVEST.<br>100% NON-GMO SEEDS.",
    angle: 0,
  },
  {
    num: "02",
    head: "NEEM-WOOD GHANI,<br>SLOW TURN",
    cap: "TURNED BELOW 35°C AT 12 RPM.<br>PRESERVING LIVING NUTRIENTS.",
    angle: 180,
  },
  {
    num: "03",
    head: "SUN SETTLED,<br>ZERO SOLVENTS",
    cap: "NATURALLY CLARIFIED BY GRAVITY.<br>NEVER BLEACHED OR STEAMED.",
    angle: 360,
  },
  {
    num: "04",
    head: "",
    cap: "100% PURE VIRGIN EXTRACT.<br>FRESH FROM THE HARVEST.",
    angle: 720,
  },
];

// Arc slots for orbital 3D carousel
const ARC_SLOTS = [
  { k: 0, dx: 0, dy: 0, h: 430, rz: 0, ry: 0 },
  { k: 1, dx: 245, dy: 24, h: 330, rz: 4, ry: 16 },
  { k: 2, dx: 452, dy: 44, h: 312, rz: 8, ry: 26 },
  { k: 3, dx: 660, dy: 80, h: 296, rz: 12, ry: 34 },
  { k: 4, dx: 860, dy: 118, h: 280, rz: 15, ry: 40 },
];

function makeCubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  function sampleX(t: number) {
    return ((ax * t + bx) * t + cx) * t;
  }
  function sampleY(t: number) {
    return ((ay * t + by) * t + cy) * t;
  }
  function sampleDerivX(t: number) {
    return (3 * ax * t + 2 * bx) * t + cx;
  }
  return function solve(x: number) {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const dx = sampleX(t) - x;
      if (Math.abs(dx) < 1e-5) return sampleY(t);
      const d = sampleDerivX(t);
      if (Math.abs(d) < 1e-5) break;
      t -= dx / d;
    }
    let t0 = 0,
      t1 = 1;
    t = x;
    while (t0 < t1) {
      const dx = sampleX(t);
      if (Math.abs(dx - x) < 1e-5) return sampleY(t);
      if (x > dx) t0 = t;
      else t1 = t;
      t = (t1 + t0) / 2;
    }
    return sampleY(t);
  };
}

const glideEase = makeCubicBezier(0.25, 0.75, 0.2, 1);
const entranceEase = makeCubicBezier(0.16, 1, 0.3, 1);

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOutHermite(t: number) {
  return t * t * (3 - 2 * t);
}

// Generates procedural front label & liquid bottle texture for SRSTI pressings
function generateBottleTexture(fl: HarvestFlavour, isBack: boolean = false): THREE.CanvasTexture {
  const can = document.createElement("canvas");
  can.width = 512;
  can.height = Math.round(512 * BH);
  const ctx = can.getContext("2d")!;
  const w = can.width;
  const h = can.height;

  // Clear
  ctx.clearRect(0, 0, w, h);

  // 1. Amber Glass Bottle Body with rounded shoulder & neck
  const bodyTop = h * 0.22;
  const bodyBottom = h * 0.94;
  const bodyH = bodyBottom - bodyTop;
  const neckW = w * 0.24;
  const neckTop = h * 0.08;
  const corkTop = h * 0.02;

  // Glass Silhouette
  ctx.save();
  ctx.beginPath();
  // Lip & neck
  ctx.moveTo(w * 0.5 - neckW * 0.55, neckTop);
  ctx.lineTo(w * 0.5 + neckW * 0.55, neckTop);
  ctx.lineTo(w * 0.5 + neckW * 0.5, bodyTop * 0.85);
  // Shoulder curve
  ctx.bezierCurveTo(
    w * 0.5 + neckW * 0.6,
    bodyTop * 0.95,
    w * 0.92,
    bodyTop * 0.95,
    w * 0.92,
    bodyTop + 40,
  );
  // Right side
  ctx.lineTo(w * 0.92, bodyBottom - 30);
  // Bottom curve
  ctx.bezierCurveTo(w * 0.92, bodyBottom, w * 0.88, bodyBottom, w * 0.85, bodyBottom);
  ctx.lineTo(w * 0.15, bodyBottom);
  ctx.bezierCurveTo(w * 0.12, bodyBottom, w * 0.08, bodyBottom, w * 0.08, bodyBottom - 30);
  // Left side
  ctx.lineTo(w * 0.08, bodyTop + 40);
  // Left shoulder
  ctx.bezierCurveTo(
    w * 0.08,
    bodyTop * 0.95,
    w * 0.5 - neckW * 0.6,
    bodyTop * 0.95,
    w * 0.5 - neckW * 0.5,
    bodyTop * 0.85,
  );
  ctx.closePath();

  // Glass clipping
  ctx.clip();

  // Amber oil liquid fill with gradient
  const oilGrad = ctx.createLinearGradient(0, neckTop, w, bodyBottom);
  oilGrad.addColorStop(0, fl.oilColor);
  oilGrad.addColorStop(0.5, fl.color);
  oilGrad.addColorStop(1, fl.darkColor);
  ctx.fillStyle = oilGrad;
  ctx.fillRect(0, 0, w, h);

  // Liquid reflections and vertical glass sheen
  const sheenGrad = ctx.createLinearGradient(w * 0.12, 0, w * 0.45, 0);
  sheenGrad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
  sheenGrad.addColorStop(0.3, "rgba(255, 255, 255, 0.15)");
  sheenGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = sheenGrad;
  ctx.fillRect(0, 0, w, h);

  // Right edge refraction
  const rRefract = ctx.createLinearGradient(w * 0.82, 0, w * 0.92, 0);
  rRefract.addColorStop(0, "rgba(0, 0, 0, 0)");
  rRefract.addColorStop(1, "rgba(0, 0, 0, 0.4)");
  ctx.fillStyle = rRefract;
  ctx.fillRect(0, 0, w, h);

  // Thick glass base reflection
  const baseGrad = ctx.createLinearGradient(0, bodyBottom - 50, 0, bodyBottom);
  baseGrad.addColorStop(0, "rgba(255, 255, 255, 0.05)");
  baseGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.35)");
  baseGrad.addColorStop(1, "rgba(0, 0, 0, 0.5)");
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, bodyBottom - 50, w, 50);

  // 2. Linen Label in the center
  const lblX = w * 0.16;
  const lblY = bodyTop + bodyH * 0.22;
  const lblW = w * 0.68;
  const lblH = bodyH * 0.56;

  // Label paper texture
  ctx.fillStyle = fl.labelBg;
  ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 4;
  ctx.fillRect(lblX, lblY, lblW, lblH);
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // Label Gold Double Border
  ctx.strokeStyle = "#C88A2C";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(lblX + 8, lblY + 8, lblW - 16, lblH - 16);
  ctx.lineWidth = 0.5;
  ctx.strokeRect(lblX + 12, lblY + 12, lblW - 24, lblH - 24);

  if (!isBack) {
    // FRONT LABEL CONTENT
    // SRSTI Header
    ctx.textAlign = "center";
    ctx.fillStyle = "#1C1612";
    ctx.font = '700 28px "EB Garamond", Garamond, serif';
    ctx.letterSpacing = "6px";
    ctx.fillText("SRSTI", w * 0.5, lblY + 54);

    // Divider line with gold diamond
    ctx.strokeStyle = "#C88A2C";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w * 0.5 - 45, lblY + 70);
    ctx.lineTo(w * 0.5 + 45, lblY + 70);
    ctx.stroke();

    ctx.fillStyle = "#C88A2C";
    ctx.fillRect(w * 0.5 - 3, lblY + 67, 6, 6);

    // Tagline / Heritage label
    ctx.fillStyle = "#5C3810";
    ctx.font = '600 11px "EB Garamond", Garamond, Georgia, serif';
    ctx.fillText("COLD PRESSED • SINGLE ORIGIN", w * 0.5, lblY + 98);

    // Product Title (2 lines)
    ctx.fillStyle = "#1C1612";
    ctx.font = '700 24px "EB Garamond", Garamond, serif';
    ctx.letterSpacing = "1px";
    const line1 = fl.cardLines[0] || "";
    const line2 = fl.cardLines[1] || "";
    ctx.fillText(line1, w * 0.5, lblY + 145);
    ctx.font = 'italics 700 26px "EB Garamond", Garamond, serif';
    ctx.fillStyle = "#8A5618";
    ctx.fillText(line2, w * 0.5, lblY + 178);

    // Native Harvest Origin Badge
    ctx.fillStyle = "#5C3810";
    ctx.font = '500 12px "EB Garamond", Garamond, Georgia, serif';
    ctx.fillText(fl.tag.toUpperCase(), w * 0.5, lblY + 225);

    // Extraction temp
    ctx.font = '600 11px "EB Garamond", Garamond, Georgia, serif';
    ctx.fillStyle = "#C88A2C";
    ctx.fillText("[ NEEM GHANI < 35°C ]", w * 0.5, lblY + 252);

    // Volume at bottom
    ctx.fillStyle = "#1C1612";
    ctx.font = '700 14px "EB Garamond", Garamond, Georgia, serif';
    ctx.fillText("500 ML", w * 0.5, lblY + lblH - 26);
  } else {
    // BACK LABEL CONTENT (NABL Lab certified purity & batch specs)
    ctx.textAlign = "center";
    ctx.fillStyle = "#1C1612";
    ctx.font = '700 16px "EB Garamond", Garamond, serif';
    ctx.letterSpacing = "2px";
    ctx.fillText("CERTIFIED EXTRACTION", w * 0.5, lblY + 38);

    ctx.fillStyle = "#5C3810";
    ctx.font = '500 10px "EB Garamond", Garamond, Georgia, serif';
    ctx.fillText("NABL ACCREDITED REPORT", w * 0.5, lblY + 56);

    ctx.textAlign = "left";
    const specs = [
      ["TEMPERATURE", "< 35°C RAW"],
      ["SOLVENTS / BLEACH", "0.0% NONE"],
      ["SMOKE POINT", fl.smokePoint],
      ["FATTY ACIDS", "NATURAL UNREFINED"],
      ["HARVEST BATCH", "SR-2026-H1"],
    ];

    let rowY = lblY + 84;
    specs.forEach((item) => {
      const label = item[0] || "";
      const val = item[1] || "";
      ctx.fillStyle = "#5C3810";
      ctx.font = '500 10px "EB Garamond", Garamond, Georgia, serif';
      ctx.fillText(label, lblX + 22, rowY);
      ctx.textAlign = "right";
      ctx.fillStyle = "#1C1612";
      ctx.font = '700 10px "EB Garamond", Garamond, Georgia, serif';
      ctx.fillText(val, lblX + lblW - 22, rowY);
      ctx.textAlign = "left";
      rowY += 26;
    });

    ctx.textAlign = "center";
    ctx.fillStyle = "#C88A2C";
    ctx.font = '600 10px "EB Garamond", Garamond, Georgia, serif';
    ctx.fillText("[ 100% FARM TRACEABLE ]", w * 0.5, lblY + lblH - 24);
  }

  ctx.restore();

  // 3. Cork Stopper at Top
  ctx.save();
  ctx.beginPath();
  const corkW = neckW * 0.9;
  ctx.rect(w * 0.5 - corkW * 0.5, corkTop, corkW, neckTop - corkTop + 10);
  ctx.fillStyle = "#A8733A";
  ctx.fill();

  // Cork pores & grain
  ctx.fillStyle = "#825524";
  for (let i = 0; i < 28; i++) {
    const px = w * 0.5 - corkW * 0.45 + Math.random() * corkW * 0.9;
    const py = corkTop + 2 + Math.random() * (neckTop - corkTop);
    ctx.fillRect(px, py, 1.5, 3);
  }
  ctx.restore();

  const tex = new THREE.CanvasTexture(can);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function StrideExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { add, openCart, count } = useCart();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Reduced motion check
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = motionQuery.matches;

    // State variables
    let activeFlavour = 0; // Default Groundnut Oil
    let target = 0;
    let pos = 0;
    let isAutoplayOn = !prefersReducedMotion;
    let lastInteractionTime = performance.now();
    let currentActiveNavTarget = "flavors";
    let isDragging = false;
    let dragStartX = 0;
    let dragStartPos = 0;

    // Three.js Setup
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, window.innerWidth < 820 ? 1.75 : 2),
    );
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();

    // Studio Lighting
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    scene.environment = pmrem.fromScene(roomEnv, 0.04).texture;

    const ambientLight = new THREE.AmbientLight(0xfff8ee, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeedd, 1.3);
    keyLight.position.set(-0.6, 0.9, 1.4);
    scene.add(keyLight);

    function computeCameraD(vw: number, vh: number) {
      return Math.min(2200, Math.max(1000, 1500 * Math.min(vw / 1440, vh / 900)));
    }

    let cameraD = computeCameraD(window.innerWidth, window.innerHeight);
    let cameraFov = 2 * Math.atan(window.innerHeight / 2 / cameraD) * (180 / Math.PI);
    const camera = new THREE.PerspectiveCamera(
      cameraFov,
      window.innerWidth / window.innerHeight,
      10,
      4 * cameraD,
    );
    camera.position.set(0, 0, cameraD);
    camera.lookAt(0, 0, 0);

    // Contact shadow texture
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext("2d")!;
    const sGrad = sCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
    sGrad.addColorStop(0, "rgba(50, 30, 10, 0.6)");
    sGrad.addColorStop(0.35, "rgba(50, 30, 10, 0.35)");
    sGrad.addColorStop(0.7, "rgba(50, 30, 10, 0.1)");
    sGrad.addColorStop(1, "rgba(50, 30, 10, 0)");
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 256, 256);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    shadowTexture.colorSpace = THREE.SRGBColorSpace;

    const shadowGeom = new THREE.PlaneGeometry(1.25, 1.04 * BH);

    // Front & Back geometries with curved bottle depth
    function createGeometries() {
      const frontGeom = new THREE.PlaneGeometry(1, BH, 32, 64);
      const posAttr = frontGeom.attributes["position"] as THREE.BufferAttribute;
      const uvAttr = frontGeom.attributes["uv"] as THREE.BufferAttribute;

      for (let i = 0; i < posAttr.count; i++) {
        const u = uvAttr.getX(i);
        const v = uvAttr.getY(i);
        const ex = Math.abs(2 * u - 1);
        const ev = Math.min(v, 1 - v);

        let z: number;
        if (ev < CR) {
          z = 0.008 + 0.008 * Math.abs(Math.sin(u * Math.PI * 34));
        } else {
          const across = Math.pow(Math.max(0, 1 - Math.pow(ex, 2.6)), 0.62);
          const along = Math.pow(Math.min(Math.max((ev - CR) / 0.11, 0), 1), 0.7);
          z = 0.015 + 0.13 * across * along + 0.004 * Math.sin(23 * u + 31 * v) * across;
        }
        posAttr.setZ(i, z);
      }
      frontGeom.computeVertexNormals();

      const backGeom = new THREE.PlaneGeometry(1, BH, 32, 64);
      const bPosAttr = backGeom.attributes["position"] as THREE.BufferAttribute;
      const bUvAttr = backGeom.attributes["uv"] as THREE.BufferAttribute;

      for (let i = 0; i < bPosAttr.count; i++) {
        const u = bUvAttr.getX(i);
        const v = bUvAttr.getY(i);
        const ex = Math.abs(2 * u - 1);
        const ev = Math.min(v, 1 - v);

        let z: number;
        if (ev < CR) {
          z = 0.008 + 0.008 * Math.abs(Math.sin(u * Math.PI * 34));
        } else {
          const across = Math.pow(Math.max(0, 1 - Math.pow(ex, 2.6)), 0.62);
          const along = Math.pow(Math.min(Math.max((ev - CR) / 0.11, 0), 1), 0.7);
          z = 0.015 + 0.13 * across * along + 0.004 * Math.sin(23 * u + 31 * v) * across;
        }
        bPosAttr.setZ(i, -z);
        bUvAttr.setX(i, 1 - u);
      }

      const index = backGeom.index!;
      for (let i = 0; i < index.count; i += 3) {
        const b = index.getX(i + 1);
        const c = index.getX(i + 2);
        index.setX(i + 1, c);
        index.setX(i + 2, b);
      }
      index.needsUpdate = true;
      backGeom.computeVertexNormals();

      return { frontGeom, backGeom };
    }

    const { frontGeom, backGeom } = createGeometries();

    // Generate textures for 5 SRSTI pressings
    const frontTextures = HARVEST_FLAVOURS.map((fl) => generateBottleTexture(fl, false));
    const backTextures = HARVEST_FLAVOURS.map((fl) => generateBottleTexture(fl, true));

    function createBar() {
      const frontMat = new THREE.MeshPhysicalMaterial({
        transparent: true,
        roughness: 0.22,
        metalness: 0.05,
        clearcoat: 0.85,
        clearcoatRoughness: 0.15,
        envMapIntensity: 0.85,
      });

      const backMat = new THREE.MeshPhysicalMaterial({
        transparent: true,
        roughness: 0.22,
        metalness: 0.05,
        clearcoat: 0.85,
        clearcoatRoughness: 0.15,
        envMapIntensity: 0.85,
      });

      const frontMesh = new THREE.Mesh(frontGeom, frontMat);
      const backMesh = new THREE.Mesh(backGeom, backMat);

      const group = new THREE.Group();
      group.add(frontMesh);
      group.add(backMesh);
      scene.add(group);

      const shadowMat = new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        depthWrite: false,
        opacity: 0,
      });
      const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
      shadowMesh.renderOrder = -1;
      scene.add(shadowMesh);

      return {
        group,
        frontMesh,
        backMesh,
        shadowMesh,
        frontMat,
        backMat,
        shadowMat,
        flavourIndex: -1,
      };
    }

    function setBarFlavour(bar: ReturnType<typeof createBar>, flavIdx: number) {
      if (bar.flavourIndex === flavIdx) return;
      bar.flavourIndex = flavIdx;
      if (frontTextures[flavIdx]) {
        bar.frontMat.map = frontTextures[flavIdx];
        bar.frontMat.needsUpdate = true;
      }
      if (backTextures[flavIdx]) {
        bar.backMat.map = backTextures[flavIdx];
        bar.backMat.needsUpdate = true;
      }
    }

    // Build Traveller Bottle & Pool of 11 bottles
    const travellerBar = createBar();
    const poolBars: ReturnType<typeof createBar>[] = [];
    for (let i = 0; i < 11; i++) {
      poolBars.push(createBar());
    }

    function applyBarState(bar: ReturnType<typeof createBar>, S: any) {
      if (S.op <= 0.01) {
        bar.group.visible = false;
        bar.shadowMesh.visible = false;
        return;
      }
      bar.group.visible = true;
      bar.shadowMesh.visible = true;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const bx = S.x - vw / 2;
      const by = vh / 2 - S.y;
      const bz = S.z || 0;
      bar.group.position.set(bx, by, bz);

      const sx = (S.h / BH) * (S.sx !== undefined ? S.sx : 1);
      const sy = (S.h / BH) * (S.sy !== undefined ? S.sy : 1);
      const sz = S.h / BH;
      bar.group.scale.set(sx, sy, sz);

      bar.group.rotation.order = "ZYX";
      const rxRad = ((S.rx || 0) * Math.PI) / 180;
      const ryRad = ((S.ry || 0) * Math.PI) / 180;
      const rzRad = -((S.rz || 0) * Math.PI) / 180;
      bar.group.rotation.set(rxRad, ryRad, rzRad);

      bar.frontMat.opacity = S.op;
      bar.backMat.opacity = S.op;

      // Shadow placement
      bar.shadowMesh.position.set(bx, by - 0.05 * S.h, bz - 0.32 * S.h);
      bar.shadowMesh.rotation.set(0, 0, rzRad);
      const shadowW = 1.25 * (S.h / BH) * Math.max(0.3, Math.abs(Math.cos(ryRad)));
      const shadowH = 1.04 * S.h;
      bar.shadowMesh.scale.set(shadowW / 1.25, shadowH / (1.04 * BH), 1);
      const shadowFac = S.shadow !== undefined ? S.shadow : 1;
      bar.shadowMat.opacity = 0.5 * S.op * shadowFac;
    }

    function getArcSlotState(
      k: number,
      u: number,
      xSpread: number,
      cx: number,
      cy: number,
      j: number,
      now: number,
      reduced: boolean,
    ) {
      const ak = Math.min(Math.abs(k), 4);
      const sign = k >= 0 ? 1 : -1;

      const i0 = Math.floor(ak);
      const i1 = Math.min(i0 + 1, 4);
      const frac = ak - i0;

      const s0 = ARC_SLOTS[i0]!;
      const s1 = ARC_SLOTS[i1]!;

      const dxVal = (s0.dx + (s1.dx - s0.dx) * frac) * sign * xSpread * u;
      const dyVal = (s0.dy + (s1.dy - s0.dy) * frac) * u;
      const hVal = (s0.h + (s1.h - s0.h) * frac) * u;
      const rzVal = (s0.rz + (s1.rz - s0.rz) * frac) * sign;
      const ryVal = (s0.ry + (s1.ry - s0.ry) * frac) * sign;
      const zVal = -ak * 34 * u;

      let op = 1;
      if (ak > 3.3) {
        op = ak >= 3.9 ? 0 : (3.9 - ak) / (3.9 - 3.3);
      }

      let idleY = 0;
      let idleRz = 0;
      if (!reduced) {
        const b = Math.sin((now / 4600) * 2 * Math.PI + 1.37 * j);
        idleY = -(0.5 * b + 0.5) * 9 * u;
        idleRz = 0.4 * b;
      }

      return {
        x: cx + dxVal,
        y: cy + dyVal + idleY,
        h: hVal,
        rz: rzVal + idleRz,
        ry: ryVal,
        rx: 0,
        z: zVal,
        op,
        sx: 1,
        sy: 1,
        shadow: 1,
      };
    }

    function lerpState(A: any, B: any, t: number) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        h: lerp(A.h, B.h, t),
        rz: lerp(A.rz, B.rz, t),
        ry: lerp(A.ry, B.ry, t),
        rx: lerp(A.rx || 0, B.rx || 0, t),
        z: lerp(A.z || 0, B.z || 0, t),
        op: lerp(A.op, B.op, t),
        sx: lerp(A.sx !== undefined ? A.sx : 1, B.sx !== undefined ? B.sx : 1, t),
        sy: lerp(A.sy !== undefined ? A.sy : 1, B.sy !== undefined ? B.sy : 1, t),
        shadow: lerp(A.shadow !== undefined ? A.shadow : 1, B.shadow !== undefined ? B.shadow : 1, t),
      };
    }

    // DOM Elements
    const titleEl = document.getElementById("title");
    const countEl = document.getElementById("count");
    const revealEl = document.getElementById("reveal");
    const autoBtn = document.getElementById("auto");
    const playBtn = document.getElementById("play");
    const arcHit = document.getElementById("arcHit");
    const inNum = document.getElementById("inNum");
    const inHead = document.getElementById("inHead");
    const inCap = document.getElementById("inCap");
    const inFront = document.getElementById("inFront");
    const inDark = document.getElementById("inDark");
    const inBar = document.getElementById("inBar");
    const pillHighlight = document.getElementById("pillHighlight");
    const rangeGlow = document.getElementById("rangeGlow");
    const buyBtn = document.getElementById("buy") as HTMLButtonElement | null;

    function renderTitleDOM(name: string) {
      if (!titleEl) return;
      const words = name.split(" ");
      titleEl.innerHTML = words
        .map(
          (w) =>
            `<span class="word">${w
              .split("")
              .map((c) => `<span class="char">${c}</span>`)
              .join("")}</span>`,
        )
        .join('<span class="word-sep"> </span>');
    }

    function animateTitleLetters(name: string, isForward: boolean = true) {
      if (!titleEl) return;
      const chars = titleEl.querySelectorAll(".char");
      chars.forEach((ch, idx) => {
        const el = ch as HTMLElement;
        el.style.transition = "none";
        el.style.transform = isForward ? "translateY(0)" : "translateY(0)";
        el.style.opacity = "1";
        setTimeout(() => {
          el.style.transition = "transform 0.42s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease";
          el.style.transform = isForward ? "translateY(-120%)" : "translateY(120%)";
          el.style.opacity = "0";
        }, idx * 18);
      });

      setTimeout(
        () => {
          renderTitleDOM(name);
          const newChars = titleEl.querySelectorAll(".char");
          newChars.forEach((ch, idx) => {
            const el = ch as HTMLElement;
            el.style.transition = "none";
            el.style.transform = isForward ? "translateY(120%)" : "translateY(-120%)";
            el.style.opacity = "0";
            setTimeout(() => {
              el.style.transition =
                "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease";
              el.style.transform = "translateY(0)";
              el.style.opacity = "1";
            }, idx * 22);
          });
        },
        chars.length * 18 + 180,
      );
    }

    function animateCounter(text: string) {
      if (!countEl) return;
      countEl.style.transition = "transform 0.25s ease, opacity 0.25s ease";
      countEl.style.transform = "translateY(-40%)";
      countEl.style.opacity = "0";
      setTimeout(() => {
        countEl.textContent = text;
        countEl.style.transform = "translateY(40%)";
        setTimeout(() => {
          countEl.style.transition = "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease";
          countEl.style.transform = "translateY(0)";
          countEl.style.opacity = "1";
        }, 20);
      }, 250);
    }

    renderTitleDOM(HARVEST_FLAVOURS[0]!.name);

    // Section 2 Step & Flip logic
    let currentStep = 0;
    let currentFlipAngle = 0;
    let flipStartAngle = 0;
    let flipTargetAngle = 0;
    let flipStartTime = 0;
    let flipDuration = 720;
    let isFlipping = false;

    function updateStepDOM(stepIdx: number) {
      const data = STEP_DATA[stepIdx]!;
      if (inNum) inNum.textContent = data.num;

      if (inHead) {
        if (stepIdx === 3) {
          const flName = HARVEST_FLAVOURS[activeFlavour]!.name.toUpperCase();
          const words = flName.split(" ");
          inHead.innerHTML = words.join("<br>");
        } else {
          inHead.innerHTML = data.head;
        }
      }

      if (inCap) inCap.innerHTML = data.cap;

      document.querySelectorAll(".in-icon-btn").forEach((btn, idx) => {
        if (idx === stepIdx) btn.classList.add("active");
        else btn.classList.remove("active");
      });
    }

    function triggerStepChange(newStep: number) {
      if (newStep === currentStep && !isFlipping) return;
      currentStep = newStep;
      flipStartAngle = currentFlipAngle;
      flipTargetAngle = STEP_DATA[newStep]!.angle;
      const halfTurns = Math.abs(flipTargetAngle - flipStartAngle) / 180;
      const clampedTurns = Math.max(0.4, Math.min(2.0, halfTurns));
      flipDuration = clampedTurns * 560;
      flipStartTime = performance.now();
      isFlipping = true;
      updateStepDOM(newStep);
    }

    // Step buttons click
    document.querySelectorAll(".in-icon-btn").forEach((btn, idx) => {
      btn.addEventListener("click", () => triggerStepChange(idx));
    });

    // Flavour Switcher
    let targetStartTime = performance.now();
    let prevActiveFlavour = 0;

    function goToFlavour(idx: number, isForward: boolean = true) {
      const newFlavIdx = ((idx % 5) + 5) % 5;
      if (newFlavIdx === activeFlavour) return;

      prevActiveFlavour = activeFlavour;
      activeFlavour = newFlavIdx;
      target = idx;
      targetStartTime = performance.now();
      lastInteractionTime = performance.now();

      if (revealEl) {
        revealEl.style.setProperty("--rv", HARVEST_FLAVOURS[newFlavIdx]!.color);
        revealEl.classList.remove("reveal-active");
        void revealEl.offsetWidth;
        revealEl.classList.add("reveal-active");
      }

      animateTitleLetters(HARVEST_FLAVOURS[newFlavIdx]!.name, isForward);
      animateCounter(`0${newFlavIdx + 1}`);

      // Sync active state in shop grid
      document.querySelectorAll(".shop-grid .card").forEach((card, cIdx) => {
        if (cIdx === newFlavIdx) card.classList.add("live");
        else card.classList.remove("live");
      });

      // Update section 2 text if at step 3
      if (currentStep === 3) updateStepDOM(3);
    }

    if (playBtn) {
      playBtn.addEventListener("click", () => goToFlavour(activeFlavour + 1, true));
    }

    if (autoBtn) {
      autoBtn.addEventListener("click", () => {
        isAutoplayOn = !isAutoplayOn;
        autoBtn.setAttribute("aria-pressed", String(isAutoplayOn));
        const pauseSvg = autoBtn.querySelector(".glyph-pause") as HTMLElement;
        const playSvg = autoBtn.querySelector(".glyph-play") as HTMLElement;
        if (pauseSvg && playSvg) {
          pauseSvg.style.display = isAutoplayOn ? "block" : "none";
          playSvg.style.display = isAutoplayOn ? "none" : "block";
        }
      });
    }

    // Arc drag & pointer interaction
    if (arcHit) {
      arcHit.addEventListener("pointerdown", (e) => {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartPos = pos;
        arcHit.setPointerCapture(e.pointerId);
      });

      arcHit.addEventListener("pointermove", (e) => {
        if (!isDragging) return;
        const dx = e.clientX - dragStartX;
        pos = dragStartPos - dx / (window.innerWidth * 0.4);
        target = Math.round(pos);
      });

      arcHit.addEventListener("pointerup", (e) => {
        if (!isDragging) return;
        isDragging = false;
        arcHit.releasePointerCapture(e.pointerId);
        goToFlavour(Math.round(pos));
      });
    }

    // Flying Add-to-Cart particle
    function launchFlyingDroplet(srcRect: DOMRect, color: string) {
      const basket = document.getElementById("basketChip");
      if (!basket) return;
      const destRect = basket.getBoundingClientRect();

      const drop = document.createElement("div");
      drop.style.position = "fixed";
      drop.style.left = `${srcRect.left + srcRect.width / 2}px`;
      drop.style.top = `${srcRect.top + srcRect.height / 2}px`;
      drop.style.width = "22px";
      drop.style.height = "22px";
      drop.style.borderRadius = "50%";
      drop.style.background = color;
      drop.style.boxShadow = `0 0 16px ${color}`;
      drop.style.zIndex = "999";
      drop.style.pointerEvents = "none";
      document.body.appendChild(drop);

      const startX = srcRect.left + srcRect.width / 2;
      const startY = srcRect.top + srcRect.height / 2;
      const endX = destRect.left + destRect.width / 2;
      const endY = destRect.top + destRect.height / 2;
      const ctrlX = (startX + endX) / 2;
      const ctrlY = Math.min(startY, endY) - 120;

      const duration = 650;
      const startTime = performance.now();

      function step(now: number) {
        const p = Math.min(1, (now - startTime) / duration);
        const inv = 1 - p;
        const cx = inv * inv * startX + 2 * inv * p * ctrlX + p * p * endX;
        const cy = inv * inv * startY + 2 * inv * p * ctrlY + p * p * endY;
        drop.style.left = `${cx - 11}px`;
        drop.style.top = `${cy - 11}px`;
        drop.style.transform = `scale(${1 - p * 0.4})`;

        if (p < 1) {
          requestAnimationFrame(step);
        } else {
          drop.remove();
          basket?.animate(
            [{ transform: "scale(1)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }],
            { duration: 320, easing: "ease-out" },
          );
        }
      }
      requestAnimationFrame(step);
    }

    // Section 3: Shop Grid setup & card clicks
    const shopGrid = document.getElementById("shopGrid");
    if (shopGrid) {
      shopGrid.innerHTML = "";
      HARVEST_FLAVOURS.forEach((fl, idx) => {
        const card = document.createElement("div");
        card.className = `card spr-wrap ${idx === 0 ? "live" : ""}`;
        card.dataset["index"] = String(idx);
        card.style.setProperty("--card-color", fl.color);

        const w1 = fl.cardLines[0] || "";
        const w2 = fl.cardLines[1] || "";
        card.innerHTML = `
          <div class="card-bg"></div>
          <div class="card-name disp" style="font-family: var(--font-display); letter-spacing: 0.05em;">${w1}<br>${w2}</div>
          <div style="position: absolute; top: 18%; left: 0; right: 0; bottom: 22%; display: flex; align-items: center; justify-content: center;">
            <img src="${fl.image}" alt="${fl.name}" style="max-height: 85%; width: auto; object-fit: contain; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.3));" />
          </div>
          <div style="position: absolute; bottom: 24px; left: 24px; font-family: var(--font-display); font-size: 13px; font-weight: 700; color: #FAF4E8;">
            ₹${fl.price} <span style="font-size: 10px; font-weight: 400; opacity: 0.7;">/ ${fl.volume}</span>
          </div>
          <button class="card-add" aria-label="Add ${fl.name} to cart" style="position: absolute; bottom: 18px; right: 18px; width: 44px; height: 44px; border-radius: 50%; background: #FAF4E8; color: #1C1612; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; transition: transform 0.2s ease;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width: 20px; height: 20px;">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        `;

        card.addEventListener("click", (e) => {
          const targetEl = e.target as HTMLElement;
          const isAddBtn = targetEl.closest(".card-add");
          if (isAddBtn) {
            e.stopPropagation();
            const btnRect = isAddBtn.getBoundingClientRect();
            launchFlyingDroplet(btnRect, fl.color);
            const product = PRODUCTS.find((p) => p.slug === fl.slug);
            if (product) {
              add(product);
            }
          } else {
            goToFlavour(idx);
          }
        });

        shopGrid.appendChild(card);
      });
    }

    // Section 4: 3-Bottle Heritage Crate Builder
    let crateSlots: (number | null)[] = [0, 1, null];

    function updateBuilderUI() {
      const slotEls = document.querySelectorAll(".slot-item");
      let filledCount = 0;
      let totalPrice = 0;

      slotEls.forEach((el, sIdx) => {
        const flavId = crateSlots[sIdx];
        const barSprite = el.querySelector(".slot-bar-sprite") as HTMLElement;
        if (flavId !== null && flavId !== undefined) {
          filledCount++;
          totalPrice += HARVEST_FLAVOURS[flavId]!.price;
          el.classList.add("filled");
          if (barSprite) {
            barSprite.innerHTML = `<img src="${HARVEST_FLAVOURS[flavId]!.image}" alt="${HARVEST_FLAVOURS[flavId]!.name}" style="max-height: 80%; width: auto; object-fit: contain; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.35));" />`;
          }
        } else {
          el.classList.remove("filled");
          if (barSprite) barSprite.innerHTML = "";
        }
      });

      // Update Thumbs Row
      const thumbsContainer = document.getElementById("rangeThumbs");
      if (thumbsContainer) {
        thumbsContainer.innerHTML = "";
        HARVEST_FLAVOURS.forEach((fl, idx) => {
          const countForFl = crateSlots.filter((id) => id === idx).length;
          const thumbBtn = document.createElement("button");
          thumbBtn.className = "thumb-btn";
          thumbBtn.style.setProperty("--card-color", fl.color);
          thumbBtn.innerHTML = `
            <img src="${fl.image}" alt="${fl.name}" style="height: 48px; width: auto; object-fit: contain;" />
            <span style="font-family: var(--font-display); font-size: 11px; font-weight: 600; margin-top: 4px;">${fl.name}</span>
            ${countForFl > 0 ? `<span class="thumb-badge">${countForFl}</span>` : ""}
          `;
          thumbBtn.addEventListener("click", () => {
            const emptyIdx = crateSlots.findIndex((s) => s === null);
            if (emptyIdx !== -1) {
              crateSlots[emptyIdx] = idx;
              if (rangeGlow) {
                rangeGlow.classList.remove("pulse");
                void rangeGlow.offsetWidth;
                rangeGlow.classList.add("pulse");
              }
              updateBuilderUI();
            }
          });
          thumbsContainer.appendChild(thumbBtn);
        });
      }

      // Slot remove buttons
      document.querySelectorAll(".slot-item").forEach((el, sIdx) => {
        const rmBtn = el.querySelector(".slot-remove-btn") as HTMLElement | null;
        if (rmBtn) {
          rmBtn.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            crateSlots[sIdx] = null;
            updateBuilderUI();
          };
        }
      });

      // Buy button
      if (buyBtn) {
        if (filledCount === 3) {
          buyBtn.removeAttribute("disabled");
          const discountedPrice = Math.max(0, totalPrice - 150);
          buyBtn.innerHTML = `
            <span class="buy-text">Add 3-Bottle Crate to Basket</span>
            <span class="buy-price">₹${discountedPrice} <span style="text-decoration: line-through; opacity: 0.6; font-size: 13px;">₹${totalPrice}</span></span>
          `;
        } else {
          buyBtn.setAttribute("disabled", "true");
          const remaining = 3 - filledCount;
          buyBtn.innerHTML = `
            <span class="buy-text">Pick ${remaining} more bottle${remaining > 1 ? "s" : ""}</span>
            <span class="buy-price">Save ₹150</span>
          `;
        }
      }
    }

    if (buyBtn) {
      buyBtn.addEventListener("click", () => {
        if (crateSlots.every((s) => s !== null)) {
          crateSlots.forEach((flavId) => {
            if (flavId !== null) {
              const fl = HARVEST_FLAVOURS[flavId]!;
              const product = PRODUCTS.find((p) => p.slug === fl.slug);
              if (product) {
                add(product);
              }
            }
          });
          window.location.assign("/cart");
        }
      });
    }

    updateBuilderUI();

    // Section Nav Pill Highlight Tracking
    function updateNavHighlight(targetId: string) {
      currentActiveNavTarget = targetId;
      document.querySelectorAll(".nav-link").forEach((link) => {
        const dataTarget = link.getAttribute("data-target");
        if (dataTarget === targetId) {
          link.classList.add("active");
          if (pillHighlight && link instanceof HTMLElement) {
            pillHighlight.style.left = `${link.offsetLeft}px`;
            pillHighlight.style.width = `${link.offsetWidth}px`;
          }
        } else {
          link.classList.remove("active");
        }
      });
    }

    // Nav smooth scroll links
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("data-target");
        if (targetId) {
          const sec = document.getElementById(targetId);
          if (sec) {
            sec.scrollIntoView({ behavior: "smooth" });
            updateNavHighlight(targetId);
          }
        }
      });
    });

    // Main Animation Loop
    let lastFrameTime = performance.now();
    let animId: number;

    function animate(now: number) {
      animId = requestAnimationFrame(animate);

      const dt = Math.min(now - lastFrameTime, 100);
      lastFrameTime = now;

      // Autoplay forward every 4.8s
      if (isAutoplayOn && !isDragging && now - lastInteractionTime > 4800) {
        goToFlavour(activeFlavour + 1, true);
      }

      // Smooth pos interpolation toward target
      const posDist = target - pos;
      if (Math.abs(posDist) > 0.001) {
        pos += posDist * 0.085;
      } else {
        pos = target;
      }

      // Section 2 scroll metrics
      const inSec = document.getElementById("inside");
      const inSecR = inSec ? inSec.getBoundingClientRect() : { top: 9999, bottom: 9999, height: 1 };
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const u = Math.min(vw / 1440, vh / 900);
      const cx = vw * 0.5;
      const cy = vh * 0.52;
      const xSpread = 1.0;

      // Flip animation in Section 2
      if (isFlipping) {
        const flipElapsed = now - flipStartTime;
        const flipT = Math.min(1, flipElapsed / flipDuration);
        currentFlipAngle = lerp(flipStartAngle, flipTargetAngle, easeInOutHermite(flipT));
        if (flipT >= 1) {
          isFlipping = false;
          currentFlipAngle = flipTargetAngle;
        }
      }

      // State A: Active hero bottle in slot 0
      const jT = Math.round(pos);
      const kT = jT - pos;
      const stateA = getArcSlotState(kT, u, xSpread, cx, cy, jT, now, prefersReducedMotion);

      // State B: Docked inside Section 2 frame
      const frameEl = document.getElementById("inBar");
      let bx = cx;
      let by = cy;
      if (frameEl) {
        const fr = frameEl.getBoundingClientRect();
        bx = fr.left + fr.width / 2;
        by = fr.top + fr.height / 2;
      }

      const stateB = {
        x: bx,
        y: by,
        h: 360 * u,
        rz: 0,
        ry: currentFlipAngle,
        rx: 0,
        z: 30 * u,
        op: 1,
        sx: 1,
        sy: 1,
        shadow: 0.8,
      };

      // State C: Exiting Section 2 into Shop
      const stateC = {
        x: cx,
        y: -vh * 0.4,
        h: 240 * u,
        rz: -12,
        ry: currentFlipAngle + 180,
        rx: 0,
        z: -100 * u,
        op: 0,
        sx: 0.8,
        sy: 0.8,
        shadow: 0,
      };

      // Scroll progress
      const p1 = inSec ? Math.max(0, Math.min(1, 1 - inSecR.top / vh)) : 0;
      const p3 = inSec ? Math.max(0, Math.min(1, -inSecR.bottom / (0.7 * vh))) : 0;

      let travellerState = { ...stateA };
      if (p1 > 0) {
        travellerState = lerpState(travellerState, stateB, easeInOutHermite(p1));
      }
      if (p3 > 0) {
        travellerState = lerpState(travellerState, stateC, easeInOutHermite(p3));
      }

      setBarFlavour(travellerBar, ((jT % 5) + 5) % 5);
      applyBarState(travellerBar, travellerState);

      // Render other pool bottles along the arc
      const jStart = Math.floor(pos) - 5;
      let poolIdx = 0;
      for (let j = jStart; j <= jStart + 10; j++) {
        const poolBar = poolBars[poolIdx++];
        if (!poolBar) continue;
        if (j === jT) {
          poolBar.group.visible = false;
          poolBar.shadowMesh.visible = false;
        } else {
          const k = j - pos;
          const sSlot = getArcSlotState(k, u, xSpread, cx, cy, j, now, prefersReducedMotion);
          sSlot.op *= Math.max(0, 1 - Math.min(1.6 * p1, 1));
          setBarFlavour(poolBar, ((j % 5) + 5) % 5);
          applyBarState(poolBar, sSlot);
        }
      }

      // Update Section 2 fixed layer visibility
      if (inFront) {
        if (inSecR.bottom <= 0 || inSecR.top >= vh) {
          inFront.style.display = "none";
        } else {
          inFront.style.display = "block";
        }
      }

      // Active nav indicator update based on scroll
      const shopSec = document.getElementById("shop");
      const rangeSec = document.getElementById("range");
      if (rangeSec && rangeSec.getBoundingClientRect().top < vh * 0.5) {
        if (currentActiveNavTarget !== "range") updateNavHighlight("range");
      } else if (shopSec && shopSec.getBoundingClientRect().top < vh * 0.5) {
        if (currentActiveNavTarget !== "shop") updateNavHighlight("shop");
      } else if (inSec && inSec.getBoundingClientRect().top < vh * 0.5) {
        if (currentActiveNavTarget !== "inside") updateNavHighlight("inside");
      } else {
        if (currentActiveNavTarget !== "flavors") updateNavHighlight("flavors");
      }

      renderer.render(scene, camera);
    }

    // Resize handling
    function onResize() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, vw < 820 ? 1.75 : 2));
      renderer.setSize(vw, vh);

      cameraD = computeCameraD(vw, vh);
      cameraFov = 2 * Math.atan(vh / 2 / cameraD) * (180 / Math.PI);
      camera.fov = cameraFov;
      camera.aspect = vw / vh;
      camera.position.set(0, 0, cameraD);
      camera.updateProjectionMatrix();

      updateNavHighlight(currentActiveNavTarget);
    }

    window.addEventListener("resize", onResize);
    onResize();

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, [add, openCart]);

  return (
    <div className="stride-page-wrapper bg-[#FAF7F2] text-[#1C1612]">
      {/* 1. Fixed WebGL Canvas */}
      <canvas id="gl" ref={canvasRef} />

      {/* Floating Stride Nav Pill */}
      <nav id="nav" className="entered">
        <div className="nav-left">
          <Link
            to="/"
            className="flex items-center gap-2 text-foreground font-display text-xl font-bold tracking-widest"
            title="Return to SRSTI Classic Home"
          >
            <ArrowLeft className="size-4 text-gold-ink" />
            <span>SRSTI</span>
          </Link>
        </div>

        <div className="nav-centre">
          <div className="nav-pill" id="navPill">
            <div className="pill-highlight" id="pillHighlight"></div>
            <a href="#flavors" className="nav-link active" data-target="flavors">
              Harvest
            </a>
            <a href="#inside" className="nav-link" data-target="inside">
              Inside Ghani
            </a>
            <a href="#shop" className="nav-link" data-target="shop">
              Shop Pressings
            </a>
            <a href="#range" className="nav-link" data-target="range">
              Custom Crate
            </a>
          </div>
        </div>

        <div className="nav-right">
          <div className="nav-chip off-chip">₹150 OFF</div>
          <button
            className="nav-chip basket-chip"
            id="basketChip"
            aria-label="View Cart"
            onClick={() => window.location.assign("/cart")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span className={`cart-badge ${count > 0 ? "show" : ""}`} id="cartBadge">
              {count}
            </span>
          </button>
          <Link to="/" className="dibs-btn font-display text-xs">
            Classic View
          </Link>
        </div>
      </nav>

      {/* SECTION 1: HERO (#flavors) */}
      <section id="flavors" className="hero-sec">
        <div className="reveal" id="reveal"></div>
        <div className="rings" id="rings" aria-hidden="true"></div>

        {/* Floating Botanical Bits with drift animation */}
        <div className="bits" id="heroBits" aria-hidden="true">
          <div
            className="hero-bit"
            style={{
              position: "absolute",
              top: "22%",
              left: "14%",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #F4D086, #C88A2C 65%, #6A4010)",
              boxShadow: "0 8px 24px rgba(200, 138, 44, 0.4)",
              animation: "floatSlow 8s ease-in-out infinite",
            }}
          />
          <div
            className="hero-bit"
            style={{
              position: "absolute",
              top: "35%",
              right: "12%",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "radial-gradient(circle at 30% 30%, #FFFFFF, #E6DEC8 70%, #9C8E75)",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
              animation: "floatSlow 10s ease-in-out 1s infinite reverse",
            }}
          />
          <div
            className="hero-bit"
            style={{
              position: "absolute",
              bottom: "26%",
              left: "18%",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #FDE498, #C88218 70%, #5E3508)",
              boxShadow: "0 6px 18px rgba(200, 130, 24, 0.35)",
              animation: "floatSlow 9s ease-in-out 2s infinite",
            }}
          />
        </div>

        {/* Arc Click Hit Area */}
        <div className="arc" id="arcHit"></div>

        {/* Next Flavour Button */}
        <button id="play" className="hero-next" aria-label="Next bottle pressing">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <polyline points="14 6 20 12 14 18"></polyline>
          </svg>
        </button>

        {/* Hero Title */}
        <h1
          id="title"
          className="hero-title disp"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
          aria-live="polite"
        ></h1>

        <div id="count" className="hero-count disp font-display">
          01
        </div>

        {/* Autoplay Toggle */}
        <button id="auto" className="hero-auto" aria-pressed="true" aria-label="Toggle autoplay">
          <span className="auto-ring">
            <svg
              className="glyph-pause"
              viewBox="0 0 24 24"
              width="12"
              height="12"
              fill="currentColor"
            >
              <rect x="6" y="5" width="4" height="14" rx="2"></rect>
              <rect x="14" y="5" width="4" height="14" rx="2"></rect>
            </svg>
            <svg
              className="glyph-play"
              viewBox="0 0 24 24"
              width="12"
              height="12"
              fill="currentColor"
              style={{ display: "none" }}
            >
              <polygon points="7,5 19,12 7,19"></polygon>
            </svg>
          </span>
          <span className="auto-label font-display">AUTOPLAY</span>
        </button>
      </section>

      {/* SECTION 2: INSIDE (#inside) */}
      <section id="inside" className="inside-sec">
        <div className="pin" id="inPin">
          <div className="in-dark" id="inDark"></div>
          <div className="in-frame in-back-frame">
            <div className="in-num disp font-display" id="inNum">
              01
            </div>
            <div id="inBar" className="in-bar-placeholder"></div>
          </div>
        </div>
      </section>

      {/* Section 2 Front Layer (#inFront) */}
      <div id="inFront" className="in-front-fixed">
        <div className="in-frame in-front-frame" id="inFrontFrame">
          <div
            className="in-head disp"
            id="inHead"
            style={{ fontFamily: "var(--font-display)" }}
          >
            HEIRLOOM SEEDS,<br />FIRST
          </div>

          <div className="in-icons" id="inIcons">
            <button
              className="in-icon-btn active"
              data-step="0"
              aria-label="Step 1: Heirloom Seeds"
            >
              <svg
                viewBox="0 0 24 24"
                width="26"
                height="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
              </svg>
            </button>
            <button
              className="in-icon-btn"
              data-step="1"
              aria-label="Step 2: Neem-Wood Ghani"
            >
              <svg
                viewBox="0 0 24 24"
                width="26"
                height="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                <path d="M17 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                <path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                <path d="M12 21v-4"></path>
              </svg>
            </button>
            <button
              className="in-icon-btn"
              data-step="2"
              aria-label="Step 3: Sun Settling"
            >
              <svg
                viewBox="0 0 24 24"
                width="26"
                height="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            </button>
            <button
              className="in-icon-btn"
              data-step="3"
              aria-label="Step 4: Amber Glass Bottling"
            >
              <svg
                viewBox="0 0 24 24"
                width="26"
                height="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </button>
          </div>

          <div
            className="in-cap font-display"
            id="inCap"
            style={{ letterSpacing: "0.15em" }}
          >
            NATIVE SINGLE-ORIGIN HARVEST.<br />100% NON-GMO SEEDS.
          </div>
        </div>
      </div>

      {/* SECTION 3: SHOP (#shop) */}
      <section id="shop" className="shop-sec">
        <div className="shop-wrap">
          <h2
            className="shop-head disp"
            id="shopHead"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="line-mask">
              <span className="line-inner">THE SIGNATURE</span>
            </span>
            <br />
            <span className="line-mask">
              <span className="line-inner">PRESSINGS</span>
            </span>
          </h2>
          <div className="shop-grid" id="shopGrid">
            {/* Populated dynamically */}
          </div>
        </div>
      </section>

      {/* SECTION 4: BUILDER (#range) */}
      <section id="range" className="range-sec">
        <div className="range-wrap">
          <h2
            className="range-head disp"
            id="rangeHead"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="line-mask">
              <span className="line-inner">BUILD YOUR</span>
            </span>
            <br />
            <span className="line-mask">
              <span className="line-inner">
                <span className="num-box">3</span>BOTTLE CRATE &amp;
              </span>
            </span>
            <br />
            <span className="line-mask">
              <span className="line-inner text-gold-gradient">SAVE ₹150</span>
            </span>
          </h2>

          <div className="glow-box" id="rangeGlowBox">
            <div className="glow-disc" id="rangeGlow"></div>
            <div className="slots-layer" id="rangeSlots">
              <div className="slot-item" data-slot="0">
                <button className="slot-remove-btn" aria-label="Remove bottle 1">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="18" x2="18" y2="18"></line>
                  </svg>
                </button>
                <div className="slot-bar-sprite"></div>
              </div>

              <div className="slot-item" data-slot="1">
                <button className="slot-remove-btn" aria-label="Remove bottle 2">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="18" x2="18" y2="18"></line>
                  </svg>
                </button>
                <div className="slot-bar-sprite"></div>
              </div>

              <div className="slot-item" data-slot="2">
                <button className="slot-remove-btn" aria-label="Remove bottle 3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="18" x2="18" y2="18"></line>
                  </svg>
                </button>
                <div className="slot-bar-sprite"></div>
              </div>
            </div>
          </div>

          <div className="thumbs-row" id="rangeThumbs"></div>

          <div className="buy-row">
            <button id="buy" className="buy-btn" disabled>
              <span className="buy-text font-display text-lg">Pick 1 more bottle</span>
              <span className="buy-price font-display font-bold">Save ₹150</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
