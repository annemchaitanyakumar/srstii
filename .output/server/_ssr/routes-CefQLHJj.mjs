import { n as __toESM } from "../_runtime.mjs";
import { a as useSpring, c as useMotionValueEvent, d as performance_default, i as useTransform, l as motion, n as animate, o as useMotionValue, r as useReducedMotion, s as useScroll, t as useInView, u as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as ClientOnly } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Plus, c as Check, i as ScanLine, l as ArrowRight, n as Sun, o as Moon, r as ShoppingBag, s as Flame, t as X, u as ArrowDown } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as gsapWithCSS, t as ScrollTrigger } from "../_libs/gsap.mjs";
import { t as stringType } from "../_libs/zod.mjs";
import { t as Lenis } from "../_libs/lenis.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CefQLHJj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Ctx = (0, import_react.createContext)({
	count: 0,
	add: () => void 0
});
function CartProvider({ children }) {
	const [count, setCount] = (0, import_react.useState)(0);
	const add = (0, import_react.useCallback)((p) => {
		setCount((c) => c + 1);
		toast.success(`${p.name} added to your basket`, { description: `${p.volume} · Batch ${p.trace.batch}` });
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		count,
		add
	}), [count, add]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value,
		children
	});
}
var useCart = () => (0, import_react.useContext)(Ctx);
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var product_ghee_default = "/assets/product-ghee-CnLIfdBI.webp";
var product_groundnut_default = "/assets/product-groundnut-H4LWVJOT.webp";
var PRODUCTS = [
	{
		id: "ghee",
		name: "A2 Gir Cow Cultured Ghee",
		short: "Bilona Ghee",
		image: product_ghee_default,
		price: 1890,
		volume: "500 ml",
		smokePoint: "250°C",
		notes: [
			"Cultured curd",
			"Toasted brioche",
			"Wild honey"
		],
		description: "Hand-churned by the bilona method from cultured curd of free-grazing Gir cows. Granular, aromatic and slow-simmered over wood fire.",
		trace: {
			farm: "Gaushala Shyam Vatika",
			region: "Junagadh, Gujarat",
			harvested: "Winter milk, Oct 2026",
			pressed: "Churned 28 Oct 2026",
			batch: "SRS-GH-2610-07",
			method: "Bilona, wood-fire clarified"
		},
		lab: [
			{
				label: "Moisture",
				value: "0.12%"
			},
			{
				label: "Free fatty acids",
				value: "0.8%"
			},
			{
				label: "Vegetable fat (BR test)",
				value: "Not detected"
			},
			{
				label: "A2 beta-casein",
				value: "Confirmed"
			}
		]
	},
	{
		id: "groundnut",
		name: "Cold-Pressed Groundnut Oil",
		short: "Groundnut",
		image: product_groundnut_default,
		price: 690,
		volume: "1 L",
		smokePoint: "225°C",
		notes: [
			"Roasted peanut",
			"Sweet earth",
			"Buttery finish"
		],
		description: "Bold, nutty and deeply golden — pressed from sun-dried Kadiri heirloom groundnuts in a neem-wood ghani turning at 12 rpm.",
		trace: {
			farm: "Reddy Family Farms",
			region: "Anantapur, Andhra Pradesh",
			harvested: "Kharif harvest, Sep 2026",
			pressed: "Wood-pressed 04 Nov 2026",
			batch: "SRS-GN-2611-02",
			method: "Kachi ghani, neem wood"
		},
		lab: [
			{
				label: "Extraction temp.",
				value: "31°C"
			},
			{
				label: "Hexane residue",
				value: "Not detected"
			},
			{
				label: "Peroxide value",
				value: "1.4 meq/kg"
			},
			{
				label: "Argemone oil",
				value: "Not detected"
			}
		]
	},
	{
		id: "coconut",
		name: "Virgin Wood-Pressed Coconut Oil",
		short: "Coconut",
		image: "/assets/product-coconut-wf10JjM0.webp",
		price: 840,
		volume: "500 ml",
		smokePoint: "177°C",
		notes: [
			"Fresh coconut milk",
			"Vanilla",
			"Clean"
		],
		description: "Crystal-clear and gently fragrant. Pressed from sun-dried copra of tall West Coast palms within 48 hours of harvest.",
		trace: {
			farm: "Thekkumkara Grove",
			region: "Kasaragod, Kerala",
			harvested: "Monsoon copra, Aug 2026",
			pressed: "Wood-pressed 21 Oct 2026",
			batch: "SRS-CO-2610-11",
			method: "Kachi ghani, acacia wood"
		},
		lab: [
			{
				label: "Lauric acid",
				value: "49.2%"
			},
			{
				label: "Moisture",
				value: "0.08%"
			},
			{
				label: "Paraffin / mineral oil",
				value: "Not detected"
			},
			{
				label: "Free fatty acids",
				value: "0.2%"
			}
		]
	},
	{
		id: "sesame",
		name: "Black Sesame Oil",
		short: "Black Sesame",
		image: "/assets/product-sesame-NK76n0Pu.webp",
		price: 760,
		volume: "500 ml",
		smokePoint: "210°C",
		notes: [
			"Toasted seed",
			"Jaggery",
			"Gentle bitterness"
		],
		description: "Pressed with a sliver of palm jaggery, the old Tamil way. Rich in sesamin — cherished for abhyanga and slow-cooked kuzhambu.",
		trace: {
			farm: "Kaveri Delta Collective",
			region: "Thanjavur, Tamil Nadu",
			harvested: "Rabi harvest, Mar 2026",
			pressed: "Wood-pressed 30 Oct 2026",
			batch: "SRS-SE-2610-04",
			method: "Kachi ghani with jaggery"
		},
		lab: [
			{
				label: "Extraction temp.",
				value: "33°C"
			},
			{
				label: "Sesamin",
				value: "0.62%"
			},
			{
				label: "Hexane residue",
				value: "Not detected"
			},
			{
				label: "Peroxide value",
				value: "1.1 meq/kg"
			}
		]
	}
];
function formatINR(value) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0
	}).format(value);
}
var VARIANTS = {
	solid: "bg-primary text-primary-foreground hover:text-accent-foreground",
	outline: "border border-foreground/25 text-foreground hover:text-accent-foreground hover:border-transparent",
	ghost: "text-foreground hover:text-accent-foreground"
};
/** CTA with magnetic cursor pull and an internal liquid-gold fill on hover. */
var MagneticButton = (0, import_react.forwardRef)(function MagneticButton({ children, variant = "solid", className, onClick, type = "button", ariaLabel, strength = .35 }, _ref) {
	const ref = (0, import_react.useRef)(null);
	const reduce = useReducedMotion();
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const sx = useSpring(x, {
		stiffness: 220,
		damping: 18,
		mass: .4
	});
	const sy = useSpring(y, {
		stiffness: 220,
		damping: 18,
		mass: .4
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
		ref,
		type,
		...ariaLabel ? { "aria-label": ariaLabel } : {},
		...onClick ? { onClick } : {},
		style: {
			x: sx,
			y: sy
		},
		whileTap: { scale: .96 },
		...reduce ? {} : { whileHover: { scale: 1.03 } },
		onPointerMove: (e) => {
			if (reduce || e.pointerType !== "mouse") return;
			const r = ref.current?.getBoundingClientRect();
			if (!r) return;
			x.set((e.clientX - (r.left + r.width / 2)) * strength);
			y.set((e.clientY - (r.top + r.height / 2)) * strength);
		},
		onPointerLeave: () => {
			x.set(0);
			y.set(0);
		},
		className: cn("liquid-btn inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 text-sm font-medium tracking-wide transition-colors duration-500", VARIANTS[variant], className),
		children
	});
});
var EASE$1 = [
	.22,
	1,
	.36,
	1
];
/** Staggered word-by-word editorial headline reveal. */
function SplitReveal({ text, className, delay = 0, as: Tag = "span" }) {
	const reduce = useReducedMotion();
	const words = text.split(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		className,
		"aria-label": text,
		children: words.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "inline-block overflow-hidden pb-[0.12em] align-bottom",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
				className: "inline-block",
				initial: reduce ? { opacity: 0 } : {
					y: "110%",
					rotate: 4
				},
				whileInView: reduce ? { opacity: 1 } : {
					y: "0%",
					rotate: 0
				},
				viewport: {
					once: true,
					margin: "-10% 0px"
				},
				transition: {
					duration: 1.1,
					ease: EASE$1,
					delay: delay + i * .08
				},
				children: [w, i < words.length - 1 ? "\xA0" : ""]
			})
		}, `${w}-${i}`))
	});
}
function FadeUp({ children, className, delay = 0 }) {
	const reduce = useReducedMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className,
		initial: {
			opacity: 0,
			y: reduce ? 0 : 28
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-8% 0px"
		},
		transition: {
			duration: 1,
			ease: EASE$1,
			delay
		},
		children
	});
}
/** Number that counts up once it scrolls into view. */
function Counter({ to, prefix = "", suffix = "", className }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		margin: "-10% 0px"
	});
	const reduce = useReducedMotion();
	const [val, setVal] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!inView) return;
		if (reduce) {
			setVal(to);
			return;
		}
		const c = animate(0, to, {
			duration: 2.2,
			ease: EASE$1,
			onUpdate: (v) => setVal(Math.round(v))
		});
		return () => c.stop();
	}, [
		inView,
		to,
		reduce
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		ref,
		className: cn("tabular-nums", className),
		children: [
			prefix,
			val,
			suffix
		]
	});
}
var LAYOUT = {
	ghee: "lg:col-span-2 lg:row-span-2",
	groundnut: "lg:col-span-2",
	coconut: "",
	sesame: ""
};
function ProductCard({ product, onQuickView, index }) {
	const ref = (0, import_react.useRef)(null);
	const reduce = useReducedMotion();
	const { add } = useCart();
	const mx = useMotionValue(.5);
	const my = useMotionValue(.5);
	const rx = useSpring(useTransform(my, [0, 1], [8, -8]), {
		stiffness: 160,
		damping: 18
	});
	const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), {
		stiffness: 160,
		damping: 18
	});
	const glareX = useTransform(mx, (v) => `${v * 100}%`);
	const glareY = useTransform(my, (v) => `${v * 100}%`);
	const glare = useTransform([glareX, glareY], ([x, y]) => `radial-gradient(circle at ${x} ${y}, var(--gold-glow), transparent 45%)`);
	const [ripples, setRipples] = (0, import_react.useState)([]);
	const hero = product.id === "ghee";
	const spawnRipple = (x, y) => {
		const id = Date.now() + Math.random();
		setRipples((r) => [...r.slice(-2), {
			id,
			x,
			y
		}]);
		window.setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 1200);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: reduce ? 0 : 40
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-8% 0px"
		},
		transition: {
			duration: 1,
			ease: [
				.22,
				1,
				.36,
				1
			],
			delay: index * .08
		},
		className: cn("[perspective:1200px]", LAYOUT[product.id]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			ref,
			style: reduce ? {} : {
				rotateX: rx,
				rotateY: ry,
				transformStyle: "preserve-3d"
			},
			onPointerMove: (e) => {
				if (e.pointerType !== "mouse") return;
				const r = ref.current?.getBoundingClientRect();
				if (!r) return;
				mx.set((e.clientX - r.left) / r.width);
				my.set((e.clientY - r.top) / r.height);
			},
			onPointerEnter: (e) => {
				const r = ref.current?.getBoundingClientRect();
				if (!r || reduce) return;
				spawnRipple(e.clientX - r.left, e.clientY - r.top);
			},
			onPointerLeave: () => {
				mx.set(.5);
				my.set(.5);
			},
			className: cn("glass-panel group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-6 md:p-8", hero ? "min-h-[560px] lg:min-h-[720px]" : "min-h-[440px]"),
			children: [
				ripples.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "gold-ripple",
					style: {
						left: r.x,
						top: r.y
					},
					"aria-hidden": true
				}, r.id)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
					"aria-hidden": true,
					className: "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
					style: {
						background: glare,
						mixBlendMode: "soft-light"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex items-start justify-between gap-4",
					style: { transform: "translateZ(30px)" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: product.volume
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: cn("mt-2 font-display font-medium leading-[1.02]", hero ? "text-4xl md:text-5xl" : "text-3xl"),
						children: product.name
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-glass-border px-3 py-1.5 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
								className: "size-3.5 text-gold-ink",
								"aria-hidden": true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Smoke point"
							}),
							product.smokePoint
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("relative z-10 my-4 flex flex-1 items-center justify-center", product.id === "groundnut" && "lg:absolute lg:inset-y-0 lg:right-6 lg:my-0 lg:w-1/2"),
					style: { transform: "translateZ(60px)" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: product.image,
						alt: `${product.name} bottle`,
						loading: "lazy",
						width: 720,
						height: 926,
						className: cn("w-auto object-contain drop-shadow-2xl transition-transform duration-700 ease-silk group-hover:-translate-y-2 group-hover:scale-[1.03]", hero ? "max-h-[420px] lg:max-h-[520px]" : "max-h-[240px]", product.id === "groundnut" && "lg:max-h-[300px]")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("relative z-10 mt-auto", product.id === "groundnut" && "lg:max-w-[50%]"),
					style: { transform: "translateZ(40px)" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-wrap gap-1.5",
						"aria-label": "Tasting notes",
						children: product.notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-full bg-foreground/5 px-2.5 py-1 text-xs text-muted-foreground",
							children: n
						}, n))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl",
							children: formatINR(product.price)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: onQuickView,
								className: "inline-flex min-h-12 items-center gap-2 whitespace-nowrap rounded-full border border-foreground/20 px-4 text-sm transition-colors hover:border-gold hover:text-gold-ink",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, {
									className: "size-4",
									"aria-hidden": true
								}), " Quick view"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => add(product),
								"aria-label": `Add ${product.name} to basket`,
								className: "liquid-btn grid size-12 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:text-accent-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" })
							})]
						})]
					})]
				})
			]
		})
	});
}
function QuickView({ product, onClose }) {
	const { add } = useCart();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: !!product,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "max-h-[92svh] max-w-5xl overflow-y-auto rounded-[2rem] border-glass-border bg-background p-0 sm:rounded-[2rem]",
			children: product && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-[0.9fr_1.1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grain flex items-center justify-center bg-linen p-8 md:rounded-l-[2rem]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: product.image,
						alt: `${product.name} bottle`,
						width: 720,
						height: 926,
						className: "max-h-[380px] w-auto object-contain drop-shadow-2xl md:max-h-[520px]"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 md:p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "eyebrow",
							children: ["Trace your bottle · ", product.trace.batch]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "mt-3 font-display text-4xl font-medium leading-none md:text-5xl",
							children: product.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "mt-4 text-base leading-relaxed text-muted-foreground",
							children: product.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground",
							children: "Batch traceability"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "relative mt-4 space-y-4 border-l border-gold/40 pl-6",
							children: [
								["Farm origin", `${product.trace.farm}, ${product.trace.region}`],
								["Harvest", product.trace.harvested],
								["Press date", product.trace.pressed],
								["Method", product.trace.method]
							].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -left-[29px] top-1.5 size-2.5 rounded-full bg-gold-gradient",
										"aria-hidden": true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
										children: k
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-xl",
										children: v
									})
								]
							}, k))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground",
							children: "Lab purity report"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "mt-3 w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("caption", {
								className: "sr-only",
								children: ["Independent lab results for batch ", product.trace.batch]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: product.lab.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "row",
									className: "py-2.5 text-left font-normal text-muted-foreground",
									children: r.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 text-right font-medium",
									children: r.value
								})]
							}, r.label)) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-3xl",
								children: [
									formatINR(product.price),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-base text-muted-foreground",
										children: ["/ ", product.volume]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
								onClick: () => {
									add(product);
									onClose();
								},
								children: ["Add to basket ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })]
							})]
						})
					]
				})]
			})
		})
	});
}
function Collection() {
	const [active, setActive] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "collection",
		"aria-labelledby": "collection-title",
		className: "relative bg-veil px-5 py-28 md:px-10 md:py-40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-14 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-5",
						children: "The Collection"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitReveal, {
						as: "h2",
						text: "The Signature Pressings",
						className: "font-display text-[clamp(2.6rem,5.5vw,5.5rem)] font-medium leading-[0.95] tracking-tight"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						id: "collection-title",
						className: "sr-only",
						children: "Collection"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeUp, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-md text-lg leading-relaxed text-muted-foreground",
					children: "Four pressings, each from a single farm and a single harvest. Open any bottle to see where — and when — it was made."
				}) })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2",
				children: PRODUCTS.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
					product: p,
					index: i,
					onQuickView: () => setActive(p)
				}, p.id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickView, {
			product: active,
			onClose: () => setActive(null)
		})]
	});
}
var craft_seeds_default = "/assets/craft-seeds-CaW9cluN.webp";
var craft_press_default = "/assets/craft-press-N2Hbkd1c.webp";
var craft_pour_default = "/assets/craft-pour-DA4MGEuU.webp";
var STEPS = [
	{
		no: "I",
		title: "The Seed",
		kicker: "Heirloom, single-origin",
		body: "Kadiri groundnuts, black til, West Coast copra — native varieties grown without synthetic inputs and sun-dried on the farms that raise them.",
		image: craft_seeds_default,
		alt: "Heirloom groundnuts, black sesame and coconut on raw linen",
		metrics: [["14", "Partner farms"], ["0", "Hybrid seeds"]]
	},
	{
		no: "II",
		title: "The Kachi Ghani",
		kicker: "Slow-turn wooden press",
		body: "A pestle of seasoned neem turns inside a wooden mortar, crushing seed against seed. The wood absorbs heat; the oil keeps its aroma, colour and nutrients.",
		image: craft_press_default,
		alt: "Traditional wooden kachi ghani oil press crushing seeds",
		metrics: [["12", "Revolutions / min"], ["6 h", "Per 20 kg batch"]],
		wheel: true
	},
	{
		no: "III",
		title: "Zero Heat",
		kicker: "Below body temperature",
		body: "Where refineries heat oil past 200°C, our press never crosses 35°C. No hexane, no bleaching, no deodorising — just the first, honest pressing.",
		image: craft_pour_default,
		alt: "Golden cold-pressed oil pouring into a brass bowl",
		metrics: [["< 35°C", "Extraction"], ["0%", "Solvents"]],
		thermo: true
	},
	{
		no: "IV",
		title: "Rest & Bottle",
		kicker: "Sun-settled, unfiltered",
		body: "The oil rests seven days in steel so sediment settles naturally, then is hand-filled into UV-shielding glass and stamped with its batch.",
		image: product_groundnut_default,
		alt: "SRSTI cold-pressed groundnut oil in a glass bottle",
		metrics: [["7 days", "Natural settling"], ["100%", "Batch traced"]],
		product: true
	}
];
function PressWheel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		"data-wheel": true,
		viewBox: "0 0 200 200",
		className: "size-full text-gold",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "100",
				cy: "100",
				r: "92",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "0.8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "100",
				cy: "100",
				r: "70",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "0.5",
				strokeDasharray: "2 6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "100",
				cy: "100",
				r: "14",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1"
			}),
			Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "100",
				y1: "100",
				x2: 100 + 92 * Math.cos(i * Math.PI / 6),
				y2: 100 + 92 * Math.sin(i * Math.PI / 6),
				stroke: "currentColor",
				strokeWidth: i % 3 === 0 ? 1 : .4
			}, i))
		]
	});
}
function Craft() {
	const section = (0, import_react.useRef)(null);
	const track = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		gsapWithCSS.registerPlugin(ScrollTrigger);
		const mm = gsapWithCSS.matchMedia();
		mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
			const el = track.current;
			const sec = section.current;
			if (!el || !sec) return;
			const distance = () => el.scrollWidth - window.innerWidth;
			const tween = gsapWithCSS.to(el, {
				x: () => -distance(),
				ease: "none",
				scrollTrigger: {
					trigger: sec,
					pin: true,
					scrub: 1,
					start: "top top",
					end: () => `+=${distance()}`,
					invalidateOnRefresh: true,
					anticipatePin: 1
				}
			});
			el.querySelectorAll("[data-parallax]").forEach((img) => {
				gsapWithCSS.fromTo(img, { xPercent: -10 }, {
					xPercent: 10,
					ease: "none",
					scrollTrigger: {
						trigger: img.parentElement,
						containerAnimation: tween,
						start: "left right",
						end: "right left",
						scrub: true
					}
				});
			});
			el.querySelectorAll("[data-float]").forEach((n, i) => {
				gsapWithCSS.fromTo(n, { y: 60 + i * 10 }, {
					y: -60,
					ease: "none",
					scrollTrigger: {
						trigger: n,
						containerAnimation: tween,
						start: "left right",
						end: "right left",
						scrub: true
					}
				});
			});
			el.querySelectorAll("[data-wheel]").forEach((w) => {
				gsapWithCSS.to(w, {
					rotate: 300,
					transformOrigin: "50% 50%",
					ease: "none",
					scrollTrigger: {
						trigger: w,
						containerAnimation: tween,
						start: "left right",
						end: "right left",
						scrub: true
					}
				});
			});
			el.querySelectorAll("[data-thermo]").forEach((t) => {
				gsapWithCSS.fromTo(t, { scaleY: 0 }, {
					scaleY: 1,
					ease: "none",
					scrollTrigger: {
						trigger: t,
						containerAnimation: tween,
						start: "left 80%",
						end: "left 30%",
						scrub: true
					}
				});
			});
		});
		return () => mm.revert();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref: section,
		id: "craft",
		"aria-labelledby": "craft-title",
		className: "relative overflow-hidden bg-veil lg:h-screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: track,
			className: "flex flex-col lg:h-full lg:w-max lg:flex-row lg:items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 flex-col justify-center px-5 py-24 md:px-10 lg:h-full lg:w-[52vw] lg:py-0 lg:pl-[8vw]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow mb-6",
							children: "The Wood-Pressed Journey"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitReveal, {
							as: "h2",
							text: "Slow is the secret ingredient.",
							className: "font-display text-[clamp(2.8rem,6vw,6rem)] font-medium leading-[0.95] tracking-tight"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeUp, {
							delay: .2,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-8 max-w-md text-lg leading-relaxed text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										id: "craft-title",
										className: "sr-only",
										children: "The Craft"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
										className: "font-display text-2xl not-italic text-foreground",
										children: "Kachi ghani"
									}),
									" — literally “raw press” — is how India made oil for three thousand years. We never stopped."
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-12 hidden items-center gap-4 text-xs uppercase tracking-[0.3em] text-muted-foreground lg:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-16 bg-gold" }), " Keep scrolling"]
						})
					]
				}),
				STEPS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "grid shrink-0 items-center gap-8 px-5 pb-20 md:px-10 lg:h-full lg:w-[78vw] lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-[4vw] lg:pb-0",
					"aria-labelledby": `step-${s.no}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative h-[62vh] min-h-[380px] overflow-hidden rounded-[2rem] shadow-glass lg:h-[72vh]",
						children: [
							s.product ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grain absolute inset-0 flex items-end justify-center bg-linen",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									"data-parallax": true,
									src: s.image,
									alt: s.alt,
									loading: "lazy",
									width: 720,
									height: 926,
									className: "h-[92%] w-auto object-contain drop-shadow-2xl"
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								"data-parallax": true,
								src: s.image,
								alt: s.alt,
								loading: "lazy",
								width: 1100,
								height: 1375,
								className: "absolute inset-0 h-full w-[125%] max-w-none -translate-x-[10%] object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute left-6 top-5 font-display text-7xl italic text-primary-foreground/90 mix-blend-difference",
								children: s.no
							}),
							s.wheel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute -bottom-10 -right-10 size-48 opacity-80 lg:size-64",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PressWheel, {})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-float": true,
						className: "max-w-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: s.kicker
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								id: `step-${s.no}`,
								className: "mt-4 font-display text-5xl font-medium leading-none md:text-6xl",
								children: s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-base leading-relaxed text-muted-foreground md:text-lg",
								children: s.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
								className: "mt-10 grid grid-cols-2 gap-6 border-t border-foreground/10 pt-6",
								children: s.metrics.map(([v, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-display text-4xl text-gold-gradient",
									children: v
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground",
									children: l
								})] }, l))
							}),
							s.thermo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex items-end gap-4",
								"aria-hidden": true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative h-28 w-2 overflow-hidden rounded-full bg-foreground/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-thermo": true,
										className: "absolute inset-x-0 bottom-0 h-[32%] origin-bottom rounded-full bg-gold-gradient"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-6 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Refined oils · 200°C+" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-foreground",
										children: "SRSTI · under 35°C"
									})]
								})]
							})
						]
					})]
				}, s.no)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden shrink-0 lg:block lg:w-[10vw]",
					"aria-hidden": true
				})
			]
		})
	});
}
/** The single Lenis instance (null when reduced motion or before mount). */
var scrollRef = { lenis: null };
function scrollToTarget(target) {
	if (scrollRef.lenis) {
		scrollRef.lenis.scrollTo(target, { duration: 1.6 });
		return;
	}
	if (typeof target === "number") window.scrollTo({ top: target });
	else document.querySelector(target)?.scrollIntoView();
}
var emailSchema = stringType().trim().email().max(255);
var LINKS$1 = [{
	title: "Explore",
	items: [
		["The Craft", "#craft"],
		["Collection", "#collection"],
		["Purity", "#purity"],
		["Rituals", "#rituals"]
	]
}, {
	title: "Care",
	items: [
		["Trace Your Bottle", "#collection"],
		["Shipping", "#top"],
		["Returns", "#top"],
		["Contact", "#top"]
	]
}];
var CERTS = [
	"FSSAI Licensed",
	"NPOP Organic",
	"NABL Lab Tested",
	"Plastic-Neutral Packaging"
];
function Footer() {
	const ref = (0, import_react.useRef)(null);
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end end"]
	});
	const letterY = useTransform(scrollYProgress, [.35, 1], reduce ? ["0%", "0%"] : ["70%", "0%"]);
	const [email, setEmail] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const submit = (e) => {
		e.preventDefault();
		if (!emailSchema.safeParse(email).success) {
			setError("Please enter a valid email address.");
			return;
		}
		setError(null);
		setEmail("");
		toast.success("You're on the harvest list", { description: "We'll write when the next pressing is ready." });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		ref,
		"aria-labelledby": "footer-title",
		className: "relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pt-[16vh] md:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "footer-title",
				className: "sr-only",
				children: "SRSTI footer"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-0 mx-auto mb-6 w-full max-w-[100rem] overflow-hidden",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					style: { y: letterY },
					className: "select-none text-center font-display text-[24vw] font-medium leading-[0.8] tracking-[0.04em] text-gold-gradient",
					children: "SRSTI"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-panel relative z-10 mx-auto grid w-full max-w-7xl gap-10 rounded-[2rem] p-7 md:grid-cols-[1.4fr_1fr_1fr] md:p-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "The Harvest List"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-sm font-display text-3xl leading-tight",
							children: "First word on each new pressing, and the farms behind it."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: submit,
							className: "mt-6 flex flex-col gap-3 sm:flex-row",
							noValidate: true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "newsletter-email",
									className: "sr-only",
									children: "Email address"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "newsletter-email",
									type: "email",
									inputMode: "email",
									autoComplete: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									placeholder: "you@example.com",
									"aria-invalid": !!error,
									"aria-describedby": error ? "newsletter-error" : void 0,
									className: "min-h-12 flex-1 rounded-full border border-foreground/20 bg-transparent px-5 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-gold"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
									type: "submit",
									strength: .2,
									children: ["Subscribe ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							id: "newsletter-error",
							role: "alert",
							className: "mt-2 text-sm text-destructive",
							children: error
						})
					] }),
					LINKS$1.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": col.title,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: col.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-1",
							children: col.items.map(([label, href]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href,
								onClick: (e) => {
									e.preventDefault();
									scrollToTarget(href);
								},
								className: "inline-flex min-h-10 items-center text-foreground/80 transition-colors hover:text-gold-ink",
								children: label
							}) }, label))
						})]
					}, col.title)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-wrap gap-2 md:col-span-3",
						"aria-label": "Certifications",
						children: CERTS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-full border border-glass-border px-3 py-1.5 text-xs text-muted-foreground",
							children: c
						}, c))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto flex w-full max-w-7xl flex-wrap justify-between gap-3 border-t border-foreground/10 py-6 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 SRSTI Naturals. Made slowly, in India." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Wood-pressed · Cold-pressed · Never refined" })]
			})
		]
	});
}
var sceneState = {
	/** pointer in normalised device coords (-1..1) */
	pointer: {
		x: 0,
		y: 0,
		moved: false
	},
	/** set true for one frame when the user taps/clicks, to drop a bigger ripple */
	tap: false,
	/** whole-page scroll progress 0..1 */
	progress: 0,
	/** scroll position in viewport heights */
	viewports: 0,
	/** smoothed absolute scroll velocity (px/frame-ish) */
	velocity: 0,
	mood: "drizzle",
	dark: false,
	reducedMotion: false
};
function setMood(mood) {
	sceneState.mood = mood;
	if (typeof document !== "undefined") document.documentElement.setAttribute("data-mood", mood);
}
function useTheme() {
	const [dark, setDark] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setDark(document.documentElement.classList.contains("dark"));
	}, []);
	return {
		dark,
		toggle: (0, import_react.useCallback)((origin) => {
			const root = document.documentElement;
			const next = !root.classList.contains("dark");
			const apply = () => {
				root.classList.toggle("dark", next);
				sceneState.dark = next;
				setDark(next);
				try {
					localStorage.setItem("srsti-theme", next ? "dark" : "light");
				} catch {}
				document.querySelector("meta[name=\"theme-color\"]")?.setAttribute("content", next ? "#0E0D0B" : "#FAF7F2");
			};
			const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			const doc = document;
			if (doc.startViewTransition && !reduce && origin) {
				const r = Math.hypot(Math.max(origin.x, window.innerWidth - origin.x), Math.max(origin.y, window.innerHeight - origin.y));
				doc.startViewTransition(apply).ready.then(() => {
					root.animate({ clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${r}px at ${origin.x}px ${origin.y}px)`] }, {
						duration: 900,
						easing: "cubic-bezier(0.22, 1, 0.36, 1)",
						pseudoElement: "::view-transition-new(root)"
					});
				}).catch(() => void 0);
			} else {
				root.classList.add("theme-fade");
				apply();
				window.setTimeout(() => root.classList.remove("theme-fade"), 700);
			}
		}, [])
	};
}
var LINKS = [
	{
		href: "#craft",
		label: "The Craft"
	},
	{
		href: "#collection",
		label: "Collection"
	},
	{
		href: "#purity",
		label: "Purity"
	},
	{
		href: "#rituals",
		label: "Rituals"
	}
];
function Header() {
	const { dark, toggle } = useTheme();
	const { count } = useCart();
	const { scrollY } = useScroll();
	const [solid, setSolid] = (0, import_react.useState)(false);
	const [hidden, setHidden] = (0, import_react.useState)(false);
	useMotionValueEvent(scrollY, "change", (y) => {
		const prev = scrollY.getPrevious() ?? 0;
		setSolid(y > 40);
		setHidden(y > prev && y > 400);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.header, {
		initial: {
			y: -40,
			opacity: 0
		},
		animate: {
			y: hidden ? -100 : 0,
			opacity: 1
		},
		transition: {
			duration: .7,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: "fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "#main",
			className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground",
			children: "Skip to content"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			"aria-label": "Primary",
			className: cn("mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2 transition-all duration-500 md:px-6", solid && "glass-panel"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#top",
					onClick: (e) => {
						e.preventDefault();
						scrollToTarget(0);
					},
					className: "flex min-h-12 items-center font-display text-2xl font-bold tracking-[0.22em]",
					"aria-label": "SRSTI — back to top",
					children: "SRSTI"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "hidden items-center gap-8 lg:flex",
					children: LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: l.href,
						onClick: (e) => {
							e.preventDefault();
							scrollToTarget(l.href);
						},
						className: "group relative py-2 font-mono text-xs uppercase tracking-widest text-foreground/80 transition-colors hover:text-foreground",
						children: [l.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" })]
					}) }, l.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: (e) => {
							const r = e.currentTarget.getBoundingClientRect();
							toggle({
								x: r.left + r.width / 2,
								y: r.top + r.height / 2
							});
						},
						"aria-label": dark ? "Switch to Sunlit Harvest light theme" : "Switch to Midnight Press dark theme",
						"aria-pressed": dark,
						className: "relative grid size-12 place-items-center overflow-hidden rounded-full transition-colors hover:bg-foreground/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
							className: cn("absolute size-5 transition-all duration-700", dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100"),
							strokeWidth: 1.4
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
							className: cn("absolute size-5 transition-all duration-700", dark ? "rotate-0 scale-100" : "-rotate-90 scale-0 opacity-0"),
							strokeWidth: 1.4
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-label": `Basket, ${count} ${count === 1 ? "item" : "items"}`,
						onClick: () => scrollToTarget("#collection"),
						className: "relative grid size-12 place-items-center rounded-full transition-colors hover:bg-foreground/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
							className: "size-5",
							strokeWidth: 1.4
						}), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							initial: { scale: .4 },
							animate: { scale: 1 },
							className: "absolute right-1.5 top-1.5 grid min-w-5 place-items-center rounded-full bg-gold-gradient px-1 text-[10px] font-semibold text-accent-foreground",
							children: count
						}, count)]
					})]
				})
			]
		})]
	});
}
var EASE = [
	.22,
	1,
	.36,
	1
];
function Hero() {
	const ref = (0, import_react.useRef)(null);
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	});
	const yFore = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -160]);
	const yMeta = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
	const fade = useTransform(scrollYProgress, [0, .65], [1, 0]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		id: "top",
		"aria-labelledby": "hero-title",
		className: "relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-16 pt-32 md:px-10 lg:pt-36",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: {
					y: yFore,
					opacity: fade
				},
				className: "relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						id: "hero-title",
						className: "font-display text-[clamp(3.8rem,9vw,9.2rem)] font-bold leading-[0.88] tracking-[-0.035em] text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitReveal, {
							text: "Pure. Real.",
							className: "block font-bold",
							delay: .35
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitReveal, {
							text: "Liquid Heritage.",
							className: "block font-medium italic text-gold-gradient",
							delay: .52
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						className: "mt-7 max-w-xl text-center font-sans text-base font-normal leading-relaxed text-foreground/85 md:text-lg",
						initial: {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: 1.1,
							ease: EASE,
							delay: .85
						},
						children: "Heirloom seeds, slow-turned in neem-wood ghanis below 35°C. Never blended, never refined — 100% single-origin cold-pressed vitality straight from the harvest."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						className: "mt-10 flex flex-wrap items-center justify-center gap-4",
						initial: {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: 1.1,
							ease: EASE,
							delay: 1.05
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
							onClick: () => scrollToTarget("#craft"),
							children: ["Explore the Harvest ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
							variant: "outline",
							onClick: () => scrollToTarget("#collection"),
							children: "Shop Collection"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.dl, {
				style: {
					y: yMeta,
					opacity: fade
				},
				className: "glass-panel relative z-10 mx-auto mt-16 grid w-full max-w-4xl grid-cols-3 divide-x divide-foreground/10 rounded-2xl p-5 md:p-6",
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: 1.1,
					ease: EASE,
					delay: 1.25
				},
				children: [
					[
						"< 35°C",
						"COLD EXTRACTION",
						"Preserving live nutrients"
					],
					[
						"0%",
						"SOLVENTS OR BLEACH",
						"Raw, unrefined purity"
					],
					[
						"12 RPM",
						"NEEM-WOOD GHANI",
						"Artisanal slow turn"
					]
				].map(([v, l, sub]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-3 text-center md:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[10px] font-medium tracking-[0.2em] text-foreground/60",
							children: [
								"[ ",
								l,
								" ]"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl mt-1",
							children: v
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 hidden font-sans text-xs text-foreground/65 md:block",
							children: sub
						})
					]
				}, l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => scrollToTarget("#craft"),
				className: "absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 font-mono text-xs uppercase tracking-[0.3em] text-foreground/70 transition-colors hover:text-foreground md:flex",
				"aria-label": "Scroll to the craft story",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "[ SCROLL DOWN ]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, {
					className: "size-3.5 animate-bounce",
					strokeWidth: 2
				})]
			})
		]
	});
}
function StaticWaterFallback() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "absolute inset-0 bg-[#b9d6a8]"
	});
}
/** Fixed, full-viewport Resadex liquid-water canvas that sits behind the whole page. */
function OilBackdrop() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, { fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaticWaterFallback, {}) })
	});
}
var purity_farm_default = "/assets/purity-farm-CfpAMlm1.webp";
var purity_refinery_default = "/assets/purity-refinery-GIZV0psr.webp";
var COMPARE = [
	[
		"Extraction heat",
		"Under 35°C",
		"200–270°C"
	],
	[
		"Chemical solvents",
		"None",
		"Hexane"
	],
	[
		"Bleaching & deodorising",
		"Never",
		"Clay, steam, caustic soda"
	],
	[
		"Natural aroma & colour",
		"Intact",
		"Stripped"
	],
	[
		"Farm traceability",
		"Every batch",
		"Blended, untraceable"
	]
];
function Purity() {
	const ref = (0, import_react.useRef)(null);
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	const k = reduce ? 0 : 1;
	const ySlow = useTransform(scrollYProgress, [0, 1], [60 * k, -60 * k]);
	const yFast = useTransform(scrollYProgress, [0, 1], [180 * k, -180 * k]);
	const yMid = useTransform(scrollYProgress, [0, 1], [110 * k, -110 * k]);
	const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref,
		id: "purity",
		"aria-labelledby": "purity-title",
		className: "relative bg-veil px-5 py-28 md:px-10 md:py-40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-12 lg:gap-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-5 lg:pt-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow mb-5",
								children: "Purity & Traceability"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitReveal, {
								as: "h2",
								text: "What we leave out matters most.",
								className: "font-display text-[clamp(2.6rem,5vw,5rem)] font-medium leading-[0.95] tracking-tight"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								id: "purity-title",
								className: "sr-only",
								children: "Purity and traceability"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeUp, {
								delay: .15,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-8 max-w-md text-lg leading-relaxed text-muted-foreground",
									children: "Supermarket oil is pressed hot, washed in solvent, bleached and steamed until it has no smell, no colour — and no story. Ours keeps all three."
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.figure, {
						style: { y: ySlow },
						className: "relative lg:col-span-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-glass md:aspect-[5/4] lg:aspect-[4/5]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
								style: { scale: imgScale },
								src: purity_farm_default,
								alt: "A farmer holding freshly harvested groundnuts above red soil at golden hour",
								loading: "lazy",
								width: 1100,
								height: 1375,
								className: "absolute inset-0 size-full object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
							className: "glass-panel absolute bottom-5 left-5 right-5 rounded-2xl p-4 text-sm md:right-auto md:max-w-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "SRSTI"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1",
								children: "Single-origin harvest, Anantapur. Pressed within 21 days of pulling from the soil."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.figure, {
						style: { y: yFast },
						className: "relative lg:col-span-4 lg:col-start-2 lg:-mt-40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative aspect-[4/3] overflow-hidden rounded-[1.5rem]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: purity_refinery_default,
								alt: "A sterile industrial oil refinery with steel tanks",
								loading: "lazy",
								width: 1100,
								height: 825,
								className: "absolute inset-0 size-full object-cover grayscale"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
							className: "mt-3 text-sm text-muted-foreground",
							children: "Industrial refined oil — heated, solvent-washed, bleached."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						style: { y: yMid },
						className: "lg:col-span-6 lg:col-start-7 lg:mt-16",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-sm md:text-base",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
									className: "sr-only",
									children: "SRSTI compared with industrial refined oils"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-foreground/15",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											className: "py-3 font-normal text-muted-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "sr-only",
												children: "Attribute"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											className: "py-3 font-display text-xl font-medium",
											children: "SRSTI"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											className: "py-3 font-display text-xl font-medium text-muted-foreground",
											children: "Refined"
										})
									]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: COMPARE.map(([k2, a, b]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-border",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "row",
											className: "py-4 pr-4 font-normal text-muted-foreground",
											children: k2
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-4 pr-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
														className: "size-4 text-gold-ink",
														"aria-hidden": true
													}),
													" ",
													a
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-4 text-muted-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
														className: "size-4",
														"aria-hidden": true
													}),
													" ",
													b
												]
											})
										})
									]
								}, k2)) })
							]
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-28 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-foreground/10 pt-12 lg:grid-cols-4",
				children: [
					{
						to: 0,
						suffix: "%",
						label: "Solvents, bleach or additives"
					},
					{
						to: 35,
						prefix: "<",
						suffix: "°C",
						label: "Cold extraction ceiling"
					},
					{
						to: 100,
						suffix: "%",
						label: "Traceable farm batches"
					},
					{
						to: 14,
						label: "Partner family farms"
					}
				].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "font-display text-[clamp(3.2rem,6vw,5.5rem)] font-medium leading-none text-gold-gradient",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
						to: c.to,
						prefix: c.prefix,
						suffix: c.suffix
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "mt-3 max-w-[14rem] text-sm text-muted-foreground",
					children: c.label
				})] }, c.label))
			})]
		})
	});
}
var RITUALS = [
	{
		id: "drizzle",
		label: "Drizzle",
		title: "Finish raw, taste everything.",
		body: "Unheated, a cold-pressed oil shows its full character — peanut sweetness, coconut cream, the toastiness of til. Pour it last, over the warm or the fresh.",
		oil: "Virgin Coconut · Groundnut",
		temp: "Room temperature",
		image: "/assets/ritual-drizzle-Cb9Q7V0Y.webp",
		alt: "Golden oil drizzled over a heirloom tomato and burrata salad",
		steps: [
			"Over warm dal and rice",
			"On ripe tomatoes and curd",
			"Into chutneys and podi"
		]
	},
	{
		id: "saute",
		label: "Sauté",
		title: "The crackle of a true tadka.",
		body: "High smoke points mean mustard seeds can pop and curry leaves can blister without the oil breaking down. Bold heat, clean flavour.",
		oil: "A2 Ghee · Groundnut",
		temp: "Up to 225–250°C",
		image: "/assets/ritual-saute-Bwc5qrUT.webp",
		alt: "Mustard seeds and curry leaves crackling in hot oil in a cast iron kadai",
		steps: [
			"Heat until it shimmers",
			"Mustard, then cumin, then curry leaf",
			"Pour over while it sings"
		]
	},
	{
		id: "ritual",
		label: "Ayurvedic Ritual",
		title: "Abhyanga, at dusk.",
		body: "Warm black sesame oil, massaged from crown to feet before a bath — the daily ritual Ayurveda prescribes for grounding Vata and nourishing skin.",
		oil: "Black Sesame",
		temp: "Gently warmed, ~40°C",
		image: "/assets/ritual-ayurveda-Dlx38E8-.webp",
		alt: "A brass bowl of sesame oil beside a lit diya, marigolds and jasmine",
		steps: [
			"Warm a small bowl in water",
			"Long strokes on limbs, circles on joints",
			"Rest fifteen minutes, then bathe"
		]
	},
	{
		id: "water",
		label: "Living Water",
		title: "Crystal clarity, sacred hydration.",
		body: "Sacred mountain spring water, living with natural minerals. Experience pure crystal liquid dynamics, sapphire oceanic depth, sunlit caustic shimmer, and diamond crest sparkles.",
		oil: "Spring Water · Vitality",
		temp: "Chilled or room temp, ~18°C",
		image: craft_pour_default,
		alt: "Pure living spring water pouring with crystalline sunlight reflections",
		steps: [
			"Infused in a pure copper vessel",
			"Sipped slowly at morning dawn",
			"Revitalising every cell with clarity"
		]
	}
];
function Rituals() {
	const [active, setActive] = (0, import_react.useState)("drizzle");
	const [travelDir, setTravelDir] = (0, import_react.useState)(1);
	const sectionRef = (0, import_react.useRef)(null);
	const tabs = (0, import_react.useRef)([]);
	const isManualRef = (0, import_react.useRef)(false);
	const activeIndexRef = (0, import_react.useRef)(0);
	const timeoutRef = (0, import_react.useRef)(null);
	const activeIndex = RITUALS.findIndex((r) => r.id === active);
	const current = RITUALS[activeIndex !== -1 ? activeIndex : 0];
	const triggerWaterRipple = (idx) => {
		if (typeof window === "undefined") return;
		const btn = tabs.current[idx];
		if (!btn) return;
		const rect = btn.getBoundingClientRect();
		const normX = (rect.left + rect.width / 2) / window.innerWidth * 2 - 1;
		const normY = -((rect.top + rect.height / 2) / window.innerHeight) * 2 + 1;
		window.dispatchEvent(new CustomEvent("srsti-water-ripple", { detail: {
			x: normX * 1.8,
			y: normY * 1.2,
			strength: 1.25
		} }));
	};
	const select = (m, i) => {
		const idx = i ?? RITUALS.findIndex((r) => r.id === m);
		if (idx === -1) return;
		const prevIdx = activeIndexRef.current;
		if (idx !== prevIdx) setTravelDir(idx > prevIdx ? 1 : -1);
		setActive(m);
		setMood(m);
		activeIndexRef.current = idx;
		triggerWaterRipple(idx);
		const sec = sectionRef.current;
		if (sec) {
			isManualRef.current = true;
			const rect = sec.getBoundingClientRect();
			const startY = window.scrollY + rect.top;
			const scrollableDistance = sec.offsetHeight - window.innerHeight;
			scrollToTarget(startY + (idx + .5) / RITUALS.length * scrollableDistance);
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			timeoutRef.current = setTimeout(() => {
				isManualRef.current = false;
			}, 850);
		}
	};
	const onKey = (e, i) => {
		const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
		if (!dir) return;
		e.preventDefault();
		const next = (i + dir + RITUALS.length) % RITUALS.length;
		select(RITUALS[next].id, next);
		tabs.current[next]?.focus();
	};
	(0, import_react.useEffect)(() => {
		gsapWithCSS.registerPlugin(ScrollTrigger);
		const sec = sectionRef.current;
		if (!sec) return;
		const trigger = ScrollTrigger.create({
			trigger: sec,
			start: "top top",
			end: "bottom bottom",
			scrub: true,
			onUpdate: (self) => {
				if (isManualRef.current) return;
				const p = self.progress;
				const idx = Math.min(RITUALS.length - 1, Math.max(0, Math.floor(p * RITUALS.length)));
				if (idx !== activeIndexRef.current) {
					const prevIdx = activeIndexRef.current;
					setTravelDir(idx > prevIdx ? 1 : -1);
					activeIndexRef.current = idx;
					const target = RITUALS[idx];
					setActive(target.id);
					setMood(target.id);
					triggerWaterRipple(idx);
				}
			}
		});
		return () => {
			trigger.kill();
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref: sectionRef,
		id: "rituals",
		"aria-labelledby": "rituals-title",
		className: "relative min-h-[360vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sticky top-0 flex min-h-screen flex-col justify-center px-5 py-8 md:px-10 md:py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-7xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl bg-veil p-5 md:bg-transparent md:p-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow mb-4",
								children: "Culinary & Wellness Rituals"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitReveal, {
								as: "h2",
								text: "Choose your ritual.",
								className: "font-display text-[clamp(2.6rem,5.5vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-foreground"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								id: "rituals-title",
								className: "sr-only",
								children: "Rituals"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "self-start md:self-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							role: "tablist",
							"aria-label": "Ritual mood",
							className: "glass-panel relative inline-flex rounded-full p-1.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.08),0_8px_25px_-8px_rgba(0,0,0,0.12)] backdrop-blur-md",
							children: RITUALS.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								ref: (el) => {
									tabs.current[i] = el;
								},
								role: "tab",
								id: `tab-${r.id}`,
								"aria-selected": active === r.id,
								"aria-controls": "ritual-panel",
								tabIndex: active === r.id ? 0 : -1,
								onClick: () => select(r.id, i),
								onKeyDown: (e) => onKey(e, i),
								className: cn("relative min-h-11 rounded-full px-4 font-mono text-xs uppercase tracking-wider transition-colors duration-300 md:px-5", active === r.id ? "text-white font-semibold" : "text-foreground/75 hover:text-foreground"),
								children: [active === r.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
									layoutId: "ritual-pill",
									className: "pointer-events-none absolute inset-0 z-0",
									transition: {
										type: "spring",
										stiffness: 280,
										damping: 20,
										mass: .65
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
										initial: {
											scaleX: 1.18,
											scaleY: .88,
											skewX: travelDir * -6
										},
										animate: {
											scaleX: [
												1.18,
												.94,
												1.05,
												.99,
												1
											],
											scaleY: [
												.88,
												1.1,
												.97,
												1.01,
												1
											],
											skewX: [
												travelDir * -8,
												travelDir * 4,
												travelDir * -1.5,
												0
											],
											borderRadius: [
												"9999px",
												travelDir >= 0 ? "18px 28px 18px 28px" : "28px 18px 28px 18px",
												travelDir >= 0 ? "26px 20px 26px 20px" : "20px 26px 20px 26px",
												"9999px"
											]
										},
										transition: {
											duration: .65,
											ease: [
												.22,
												1,
												.36,
												1
											]
										},
										className: cn("absolute inset-0 block rounded-full overflow-hidden transition-colors duration-500", r.id === "saute" && "bg-gradient-to-b from-[#5c6674] via-[#454e5b] to-[#343b46]", r.id === "ritual" && "bg-gradient-to-b from-[#6e3c20] via-[#522a15] to-[#3a1c0d]", r.id === "drizzle" && "bg-gradient-to-b from-[#256332] via-[#1a4a24] to-[#103017]", r.id === "water" && "bg-gradient-to-b from-[#2691ad] via-[#186a80] to-[#0e4352]"),
										style: { boxShadow: "inset 0 1.5px 2px rgba(255, 255, 255, 0.65), inset 0 -2px 4px rgba(0, 0, 0, 0.35), 0 6px 18px -2px rgba(0, 0, 0, 0.32)" },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-x-2 top-0.5 h-[48%] rounded-full bg-gradient-to-b from-white/55 via-white/12 to-transparent" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-x-3 bottom-0.5 h-[28%] rounded-full bg-gradient-to-t from-white/20 to-transparent blur-[0.5px]" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
												initial: {
													x: travelDir >= 0 ? "-120%" : "120%",
													opacity: .85
												},
												animate: {
													x: travelDir >= 0 ? "140%" : "-140%",
													opacity: [
														.85,
														.45,
														0
													]
												},
												transition: {
													duration: .7,
													ease: [
														.16,
														1,
														.3,
														1
													]
												},
												className: "pointer-events-none absolute inset-y-0 w-3/5 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
											}, `sheen-${active}`)
										]
									}, `droplet-${active}`), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
										initial: {
											scale: .85,
											opacity: .85,
											borderWidth: "1.5px"
										},
										animate: {
											scale: 1.4,
											opacity: 0,
											borderWidth: "0.5px"
										},
										transition: {
											duration: .65,
											ease: [
												.16,
												1,
												.3,
												1
											]
										},
										className: cn("pointer-events-none absolute -inset-0.5 rounded-full border", r.id === "saute" && "border-zinc-300/80", r.id === "ritual" && "border-amber-200/75", r.id === "drizzle" && "border-emerald-200/75", r.id === "water" && "border-cyan-200/80")
									}, `ripple-${active}`)]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("relative z-10 transition-all duration-300", active === r.id && "drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"),
									children: r.label
								})]
							}, r.id))
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "ritual-panel",
					role: "tabpanel",
					"aria-labelledby": `tab-${active}`,
					className: cn("glass-panel grid max-h-[78vh] overflow-hidden rounded-[2rem] shadow-lg transition-colors duration-700 md:grid-cols-2", active === "saute" && "border-zinc-400/30", active === "ritual" && "border-[#7c4428]/35"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[480px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							mode: "popLayout",
							initial: false,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
								src: current.image,
								alt: current.alt,
								loading: "lazy",
								width: 1100,
								height: 1375,
								initial: {
									opacity: 0,
									scale: 1.08
								},
								animate: {
									opacity: 1,
									scale: 1
								},
								exit: {
									opacity: 0,
									scale: .96
								},
								transition: {
									duration: .85,
									ease: [
										.22,
										1,
										.36,
										1
									]
								},
								className: "absolute inset-0 size-full object-cover"
							}, current.id)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						initial: false,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: -12
							},
							transition: {
								duration: .5,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "flex flex-col justify-center overflow-y-auto p-6 md:p-10 lg:p-12",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-3xl font-bold leading-[1.02] text-foreground md:text-4xl lg:text-5xl",
									children: current.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 font-sans text-sm leading-relaxed text-foreground/80 md:mt-5 md:text-base",
									children: current.body
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "mt-6 space-y-2.5 font-sans md:space-y-3",
									children: current.steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-baseline gap-3 text-sm text-foreground/90 md:text-base",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: cn("font-mono text-xs font-semibold transition-colors duration-500", current.id === "saute" && "text-zinc-500", current.id === "ritual" && "text-[#8c5332]", current.id === "drizzle" && "text-emerald-700", current.id === "water" && "text-cyan-700"),
											children: ["0", i + 1]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s })]
									}, s))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "mt-8 grid grid-cols-2 gap-4 border-t border-foreground/10 pt-5 md:gap-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "eyebrow",
										children: "[ Best with ]"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 font-display text-lg font-semibold text-foreground md:text-xl",
										children: current.oil
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "eyebrow",
										children: "[ Temperature ]"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 font-display text-lg font-semibold text-foreground md:text-xl",
										children: current.temp
									})] })]
								})
							]
						}, current.id)
					})]
				})]
			})
		})
	});
}
var VS = `attribute vec2 p;
void main() {
  gl_Position = vec4(p, 0.0, 1.0);
}`;
var FS = `precision highp float;
uniform vec2 uResolution;
uniform vec2 uCenters[4];
uniform float uTimes[4];
uniform float uStrengths[4];

// Overhead natural directional light source
const vec3 LD = vec3(-0.35, 0.65, 0.68);

void main() {
  vec2 coord = gl_FragCoord.xy;
  float totalDhx = 0.0;
  float totalDhy = 0.0;
  float totalH = 0.0;
  float totalFade = 0.0;
  float maxAlpha = 0.0;

  for (int i = 0; i < 4; i++) {
    if (uStrengths[i] < 0.01) continue;
    float t = uTimes[i];
    if (t < 0.0 || t > 1.05) continue;

    vec2 delta = coord - uCenters[i];
    float dist = length(delta);
    // High-efficiency distance culling: discard calculations outside wave envelope radius
    if (dist > 460.0) continue;

    // Ultra-slow, serene liquid expansion (zen slow-motion)
    float speed = 75.0;
    float front = t * speed;
    float dDist = dist - front;

    // Massive, giant rolling water wave (wavelength 380px: majestic single swell)
    float wavelength = 380.0;
    float phase = dDist / wavelength * 6.28318;
    float packetWidth = 120.0 + t * 260.0; // Naturally blooms outward from touch point

    // Smooth asymmetric wave envelope
    float ahead = max(dDist, 0.0);
    float behind = min(dDist, 0.0);
    float envDist = (ahead * 1.4 + abs(behind) * 0.7) / packetWidth;

    // Organic liquid attack and release:
    // Smooth ease-in from 0.0, peaks smoothly, eases down seamlessly to exact 0.0 by t=0.95
    float easeIn = smoothstep(0.0, 0.20, t);
    float easeOut = 1.0 - smoothstep(0.45, 0.95, t);
    float envTime = easeIn * easeOut;
    totalFade = max(totalFade, envTime);

    float envelope = exp(-envDist * envDist * 0.7) * envTime * uStrengths[i];
    float wave = cos(phase) * envelope;

    // Massive, calm central fluid swell (starts and ends at exact 0.0)
    float coreDist = dist / 140.0;
    float coreEnv = exp(-coreDist * coreDist) * envTime * uStrengths[i];
    float core = -sin(clamp(t / 0.95, 0.0, 1.0) * 3.14159) * coreEnv * 1.2;

    float h = wave * 2.5 + core * 1.3;
    totalH += h;

    // Exact analytical spatial derivatives for physical surface normals
    float dEnv = -1.4 * (dDist / (packetWidth * packetWidth)) * envelope;
    float dWave = (-sin(phase) * (6.28318 / wavelength) * envelope + cos(phase) * dEnv) * 2.5;
    float dCore = (-2.0 * dist / (140.0 * 140.0) * core) * 1.3;
    float dhdr = dWave + dCore;

    vec2 dir = dist > 0.001 ? delta / dist : vec2(0.0);
    totalDhx += dhdr * dir.x;
    totalDhy += dhdr * dir.y;

    float slope = abs(dhdr);
    float alphaContrib = (abs(h) * 1.4 + slope * 26.0) * envTime;
    maxAlpha = max(maxAlpha, alphaContrib);
  }

  if (maxAlpha < 0.001 || totalFade < 0.001) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // Physical 3D surface normal from wave gradients (smooth, broad)
  vec3 N = normalize(vec3(-totalDhx * 22.0, -totalDhy * 22.0, 1.0));
  vec3 L = normalize(LD);
  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 R = reflect(-V, N);

  // Wide, silky caustic crest sheen for a massive rolling wave
  float spec = pow(max(dot(R, L), 0.0), 16.0) * 1.6;
  float broadSpec = pow(max(dot(R, L), 0.0), 4.0) * 0.5;

  // Physical Fresnel reflection for pure clear water (index of refraction ~ 1.33)
  float nv = max(dot(N, V), 0.0);
  float F = 0.02 + 0.98 * pow(1.0 - nv, 3.5);

  // Subtle refraction shadow in the wave trough (light deflection)
  float lightDot = dot(N, L);
  float slopeMag = length(vec2(totalDhx, totalDhy));
  float troughShadow = smoothstep(0.48, -0.25, lightDot) * clamp(slopeMag * 24.0, 0.0, 1.0) * 0.28;

  // 100% TRANSPARENT WATER: ZERO GREEN, ZERO COLOR PIGMENT
  // Pure brilliant white highlights for crests, soft crystal glass rim, subtle neutral refraction in troughs
  vec3 highlightCol = vec3(1.0, 1.0, 1.0);
  vec3 shadowCol = vec3(0.08, 0.10, 0.14); // Delicate neutral refraction depth

  float highlight = spec * 1.1 + broadSpec * 0.8 + F * 0.4;
  vec3 rgb = mix(highlightCol, shadowCol, troughShadow / (highlight + troughShadow + 0.001));

  // Transparent alpha: explicitly multiplied by totalFade so the entire ripple (highlights, caustics, shadows)
  // smoothly and seamlessly dissolves to exact 0.0000 before the end of the duration
  float rawAlpha = highlight * 0.85 + troughShadow * 0.35;
  float alpha = clamp(rawAlpha * totalFade, 0.0, 0.88);

  if (alpha < 0.0005) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // Premultiplied alpha: crystal-clear transparent water overlay
  gl_FragColor = vec4(rgb * alpha, alpha);
}`;
function WaterTouchRipple() {
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const gl = canvas.getContext("webgl", {
			alpha: true,
			premultipliedAlpha: true,
			antialias: true
		});
		if (!gl) return;
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
		function compile(type, src) {
			const s = gl.createShader(type);
			gl.shaderSource(s, src);
			gl.compileShader(s);
			return s;
		}
		const pr = gl.createProgram();
		gl.attachShader(pr, compile(gl.VERTEX_SHADER, VS));
		gl.attachShader(pr, compile(gl.FRAGMENT_SHADER, FS));
		gl.linkProgram(pr);
		gl.useProgram(pr);
		const buf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buf);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
			-1,
			-1,
			1,
			-1,
			-1,
			1,
			1,
			1
		]), gl.STATIC_DRAW);
		const locP = gl.getAttribLocation(pr, "p");
		gl.enableVertexAttribArray(locP);
		gl.vertexAttribPointer(locP, 2, gl.FLOAT, false, 0, 0);
		const uResolution = gl.getUniformLocation(pr, "uResolution");
		const uCenters = gl.getUniformLocation(pr, "uCenters");
		const uTimes = gl.getUniformLocation(pr, "uTimes");
		const uStrengths = gl.getUniformLocation(pr, "uStrengths");
		function resize() {
			const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
			canvas.width = Math.round(window.innerWidth * dpr);
			canvas.height = Math.round(window.innerHeight * dpr);
			gl.viewport(0, 0, canvas.width, canvas.height);
		}
		resize();
		window.addEventListener("resize", resize);
		const activeRipples = [];
		let animId = 0;
		let isRunning = false;
		function renderLoop(now) {
			const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
			const centersArr = [
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0
			];
			const timesArr = [
				-1,
				-1,
				-1,
				-1
			];
			const strengthsArr = [
				0,
				0,
				0,
				0
			];
			let anyActive = false;
			for (let i = activeRipples.length - 1; i >= 0; i--) if ((now - activeRipples[i].startTime) / 1e3 > 1.05) activeRipples.splice(i, 1);
			for (let i = 0; i < Math.min(4, activeRipples.length); i++) {
				const rip = activeRipples[i];
				const elapsed = (now - rip.startTime) / 1e3;
				centersArr[i * 2] = rip.x * dpr;
				centersArr[i * 2 + 1] = rip.y * dpr;
				timesArr[i] = elapsed;
				strengthsArr[i] = rip.strength;
				anyActive = true;
			}
			gl.clearColor(0, 0, 0, 0);
			gl.clear(gl.COLOR_BUFFER_BIT);
			if (anyActive) {
				gl.uniform2f(uResolution, canvas.width, canvas.height);
				gl.uniform2fv(uCenters, new Float32Array(centersArr));
				gl.uniform1fv(uTimes, new Float32Array(timesArr));
				gl.uniform1fv(uStrengths, new Float32Array(strengthsArr));
				let minX = canvas.width;
				let minY = canvas.height;
				let maxX = 0;
				let maxY = 0;
				const maxR = 460 * dpr;
				for (let i = 0; i < Math.min(4, activeRipples.length); i++) {
					const rip = activeRipples[i];
					const rx = rip.x * dpr;
					const ry = rip.y * dpr;
					minX = Math.max(0, Math.min(minX, rx - maxR));
					minY = Math.max(0, Math.min(minY, ry - maxR));
					maxX = Math.min(canvas.width, Math.max(maxX, rx + maxR));
					maxY = Math.min(canvas.height, Math.max(maxY, ry + maxR));
				}
				const boxW = Math.max(0, maxX - minX);
				const boxH = Math.max(0, maxY - minY);
				if (boxW > 0 && boxH > 0) {
					gl.enable(gl.SCISSOR_TEST);
					gl.scissor(minX, minY, boxW, boxH);
					gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
					gl.disable(gl.SCISSOR_TEST);
				}
				if (!document.hidden) animId = requestAnimationFrame(renderLoop);
				else isRunning = false;
			} else isRunning = false;
		}
		function triggerRipple(clientX, clientY, strength = 2.4) {
			const canvasY = window.innerHeight - clientY;
			activeRipples.push({
				x: clientX,
				y: canvasY,
				startTime: performance_default.now(),
				strength
			});
			if (activeRipples.length > 4) activeRipples.shift();
			if (!isRunning && !document.hidden) {
				isRunning = true;
				animId = requestAnimationFrame(renderLoop);
			}
		}
		const onPointerDown = (e) => {
			const target = e.target?.closest?.("button, [role=\"button\"], [role=\"tab\"], a, input[type=\"submit\"], input[type=\"button\"], .liquid-btn, [data-ripple]");
			if (!target) return;
			if (target.hasAttribute("data-no-ripple")) return;
			triggerRipple(e.clientX, e.clientY, 2.4);
		};
		const onCustomRipple = (e) => {
			const ce = e;
			if (ce.detail?.clientX != null && ce.detail?.clientY != null) triggerRipple(ce.detail.clientX, ce.detail.clientY, ce.detail.strength ?? 2.4);
		};
		const onVisibilityChange = () => {
			if (document.hidden) {
				cancelAnimationFrame(animId);
				isRunning = false;
				activeRipples.length = 0;
			}
		};
		const onContextLost = (e) => {
			e.preventDefault();
			cancelAnimationFrame(animId);
			isRunning = false;
		};
		window.addEventListener("pointerdown", onPointerDown, { passive: true });
		window.addEventListener("srsti-water-ripple", onCustomRipple);
		document.addEventListener("visibilitychange", onVisibilityChange);
		canvas.addEventListener("webglcontextlost", onContextLost);
		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener("resize", resize);
			window.removeEventListener("pointerdown", onPointerDown);
			window.removeEventListener("srsti-water-ripple", onCustomRipple);
			document.removeEventListener("visibilitychange", onVisibilityChange);
			canvas.removeEventListener("webglcontextlost", onContextLost);
			gl.deleteBuffer(buf);
			gl.deleteProgram(pr);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className: "pointer-events-none fixed inset-0 z-[99999] size-full block",
		"aria-hidden": "true"
	});
}
/**
* Wires Lenis smooth scroll to GSAP ScrollTrigger and feeds scroll + pointer
* data into the shared scene state. Mount once per page.
*/
function useExperience() {
	(0, import_react.useEffect)(() => {
		gsapWithCSS.registerPlugin(ScrollTrigger);
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
		sceneState.reducedMotion = reduce.matches;
		sceneState.dark = document.documentElement.classList.contains("dark");
		let lastY = window.scrollY;
		const updateScroll = (y) => {
			const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
			sceneState.progress = Math.min(1, Math.max(0, y / max));
			sceneState.viewports = y / window.innerHeight;
			const v = Math.abs(y - lastY);
			sceneState.velocity = sceneState.velocity * .85 + v * .15;
			lastY = y;
		};
		let lenis = null;
		let tick = null;
		const onNativeScroll = () => updateScroll(window.scrollY);
		if (!reduce.matches) {
			lenis = new Lenis({
				lerp: .09,
				smoothWheel: true,
				wheelMultiplier: .9
			});
			scrollRef.lenis = lenis;
			lenis.on("scroll", (l) => {
				ScrollTrigger.update();
				updateScroll(l.scroll);
			});
			tick = (time) => lenis?.raf(time * 1e3);
			gsapWithCSS.ticker.add(tick);
			gsapWithCSS.ticker.lagSmoothing(0);
		} else window.addEventListener("scroll", onNativeScroll, { passive: true });
		updateScroll(window.scrollY);
		const decay = gsapWithCSS.ticker.add(() => {
			sceneState.velocity *= .94;
		});
		const onPointer = (e) => {
			sceneState.pointer.x = e.clientX / window.innerWidth * 2 - 1;
			sceneState.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
			sceneState.pointer.moved = true;
		};
		const onDown = (e) => {
			onPointer(e);
			sceneState.tap = true;
		};
		window.addEventListener("pointermove", onPointer, { passive: true });
		window.addEventListener("pointerdown", onDown, { passive: true });
		const onReduce = () => {
			sceneState.reducedMotion = reduce.matches;
		};
		reduce.addEventListener("change", onReduce);
		const refresh = () => ScrollTrigger.refresh();
		window.addEventListener("load", refresh);
		document.fonts?.ready.then(refresh).catch(() => void 0);
		return () => {
			window.removeEventListener("pointermove", onPointer);
			window.removeEventListener("pointerdown", onDown);
			window.removeEventListener("scroll", onNativeScroll);
			window.removeEventListener("load", refresh);
			reduce.removeEventListener("change", onReduce);
			if (tick) gsapWithCSS.ticker.remove(tick);
			gsapWithCSS.ticker.remove(decay);
			lenis?.destroy();
			scrollRef.lenis = null;
		};
	}, []);
}
function Index() {
	useExperience();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OilBackdrop, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaterTouchRipple, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			id: "main",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Craft, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Purity, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rituals, {})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
	] });
}
//#endregion
export { Index as component };
