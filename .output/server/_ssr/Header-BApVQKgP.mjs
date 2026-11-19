import { n as __toESM } from "../_runtime.mjs";
import { a as useSpring, c as useMotionValueEvent, i as useTransform, l as motion, o as useMotionValue, r as useReducedMotion, s as useScroll } from "../_libs/framer-motion+[...].mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { p as useCart, r as cn } from "./products-BZ1Gg1xG.mjs";
import { b as Link, p as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as ArrowRight, l as ShoppingBag, o as Sun, p as Moon } from "../_libs/lucide-react.mjs";
import { t as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Header-BApVQKgP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
var emailSchema = stringType().trim().email().max(255);
var LINKS = [{
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
					LINKS.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
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
function Header() {
	const { dark, toggle } = useTheme();
	const { count, openCart } = useCart();
	const { scrollY } = useScroll();
	const [solid, setSolid] = (0, import_react.useState)(false);
	const [hidden, setHidden] = (0, import_react.useState)(false);
	const location = useLocation();
	const isHome = location.pathname === "/";
	useMotionValueEvent(scrollY, "change", (y) => {
		const prev = scrollY.getPrevious() ?? 0;
		setSolid(y > 40);
		setHidden(y > prev && y > 400);
	});
	const handleSectionClick = (e, hash) => {
		if (isHome) {
			e.preventDefault();
			scrollToTarget(hash);
		}
	};
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
			className: cn("mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2 transition-all duration-500 md:px-6", solid ? "glass-panel" : "bg-linen/60 backdrop-blur-md border border-glass-border/40"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					onClick: (e) => {
						if (isHome) {
							e.preventDefault();
							scrollToTarget(0);
						}
					},
					className: "flex min-h-12 items-center font-display text-2xl font-bold tracking-[0.22em] text-foreground transition-opacity hover:opacity-85",
					"aria-label": "SRSTI — home",
					children: "SRSTI"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "hidden items-center gap-7 lg:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/products",
							className: cn("group relative py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:text-foreground", location.pathname.startsWith("/products") ? "text-gold-ink font-semibold" : "text-foreground/80"),
							children: ["All Pressings", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100", location.pathname.startsWith("/products") && "scale-x-100") })]
						}) }),
						[
							{
								href: "/#craft",
								hash: "#craft",
								label: "The Craft"
							},
							{
								href: "/#purity",
								hash: "#purity",
								label: "Purity"
							},
							{
								href: "/#rituals",
								hash: "#rituals",
								label: "Rituals"
							}
						].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: l.href,
							onClick: (e) => handleSectionClick(e, l.hash),
							className: "group relative py-2 font-mono text-xs uppercase tracking-widest text-foreground/80 transition-colors hover:text-foreground",
							children: [l.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" })]
						}) }, l.label)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/stride",
							className: cn("group relative inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-gold-ink transition-all hover:bg-gold hover:text-white", location.pathname === "/stride" && "bg-gold text-white shadow-gold font-semibold"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-gold animate-pulse" }), "Stride 3D"]
						}) })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/stride",
							className: cn("inline-flex md:hidden items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 font-mono text-[11px] font-medium text-gold-ink transition-all hover:bg-gold hover:text-white", location.pathname === "/stride" && "bg-gold text-white shadow-gold"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-gold animate-pulse" }), "Stride"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/products",
							className: "hidden sm:inline-flex items-center rounded-full border border-glass-border px-3.5 py-1.5 font-mono text-xs text-foreground/80 transition-all hover:border-gold hover:text-gold-ink",
							children: "The Pressing Room"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
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
							className: "relative grid size-11 place-items-center overflow-hidden rounded-full transition-colors hover:bg-foreground/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
								className: cn("absolute size-5 transition-all duration-700", dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100"),
								strokeWidth: 1.4
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
								className: cn("absolute size-5 transition-all duration-700", dark ? "rotate-0 scale-100" : "-rotate-90 scale-0 opacity-0"),
								strokeWidth: 1.4
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-label": `Harvest Basket, ${count} ${count === 1 ? "item" : "items"}`,
							onClick: openCart,
							className: "relative grid size-11 place-items-center rounded-full transition-colors hover:bg-foreground/5 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
								className: "size-5",
								strokeWidth: 1.4
							}), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
								initial: { scale: .4 },
								animate: { scale: 1 },
								className: "absolute right-1 top-1 grid min-w-5 place-items-center rounded-full bg-gold-gradient px-1 text-[10px] font-semibold text-accent-foreground",
								children: count
							}, count)]
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { scrollRef as a, sceneState as i, Header as n, scrollToTarget as o, MagneticButton as r, setMood as s, Footer as t };
