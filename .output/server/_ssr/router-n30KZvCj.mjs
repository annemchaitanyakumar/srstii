import { n as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { p as useCart, r as cn, s as formatINR, t as CartProvider } from "./products-BZ1Gg1xG.mjs";
import { _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, x as useRouter, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$4 } from "../_slug-BuIF6vBM.mjs";
import { T as ArrowRight, d as Plus, f as Package, i as Trash2, l as ShoppingBag, m as Minus, r as Truck, t as X, u as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-n30KZvCj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DqPmd597.css";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var Sheet = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
function CartDrawer() {
	const { items, count, subtotal, isCartOpen, setIsCartOpen, updateQuantity, removeItem, freeShippingThreshold, remainingForFreeShipping, isFreeShipping } = useCart();
	const progressPercent = Math.min(100, Math.round(subtotal / freeShippingThreshold * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: isCartOpen,
		onOpenChange: setIsCartOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "flex w-full flex-col border-l border-glass-border bg-background p-0 sm:max-w-md md:max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
					className: "border-b border-border/60 px-6 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-9 place-items-center rounded-full bg-gold/15 text-gold-ink",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
								className: "font-display text-2xl font-medium tracking-tight",
								children: "Your Harvest Basket"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
								className: "text-xs text-muted-foreground",
								children: count === 0 ? "Empty basket" : `${count} ${count === 1 ? "bottle" : "bottles"} reserved from current pressing`
							})] })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-xl border border-glass-border bg-foreground/[0.03] p-3 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between font-mono",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5 text-foreground/85",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-3.5 text-gold-ink" }), isFreeShipping ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-gold-ink",
									children: "You unlocked Complimentary Farm Shipping!"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Add ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: formatINR(remainingForFreeShipping)
									}),
									" for Free Shipping"
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [progressPercent, "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-gold-gradient transition-all duration-500 ease-out",
								style: { width: `${progressPercent}%` }
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto px-6 py-4",
					children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-full flex-col items-center justify-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-16 place-items-center rounded-full border border-border bg-foreground/5 text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, {
									className: "size-8",
									strokeWidth: 1.3
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 font-display text-2xl font-medium",
								children: "Your basket is waiting"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-xs text-sm text-muted-foreground",
								children: "Explore our cold-pressed, wood-ghani oils and pure Vedic A2 ghee, traceable to single-origin farms."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/products",
								onClick: () => setIsCartOpen(false),
								className: "mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-gold hover:text-accent-foreground",
								children: ["Browse The Pressing Room ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-4 divide-y divide-border/60",
						children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "pt-4 first:pt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative flex size-20 shrink-0 items-center justify-center rounded-2xl border border-glass-border bg-linen p-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: item.image,
										alt: item.name,
										className: "max-h-full max-w-full object-contain drop-shadow"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-1 flex-col justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-display text-lg font-medium leading-tight text-foreground",
											children: item.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded bg-foreground/5 px-2 py-0.5 font-medium text-foreground/80",
													children: item.volume
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.batch })
											]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => removeItem(item.id),
											"aria-label": `Remove ${item.name}`,
											className: "text-muted-foreground transition-colors hover:text-destructive",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center rounded-full border border-border bg-background px-2 py-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => updateQuantity(item.id, item.quantity - 1),
													className: "p-1 text-muted-foreground transition-colors hover:text-foreground",
													"aria-label": "Decrease quantity",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "min-w-6 text-center font-mono text-xs font-medium",
													children: item.quantity
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => updateQuantity(item.id, item.quantity + 1),
													className: "p-1 text-muted-foreground transition-colors hover:text-foreground",
													"aria-label": "Increase quantity",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" })
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-lg font-medium text-foreground",
											children: formatINR(item.price * item.quantity)
										})]
									})]
								})]
							})
						}, item.id))
					})
				}),
				items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border/60 bg-foreground/[0.02] px-6 py-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-foreground",
										children: formatINR(subtotal)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Farm Shipping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-foreground",
										children: isFreeShipping ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-gold-ink",
											children: "FREE"
										}) : formatINR(99)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between border-t border-border/40 pt-2 font-display text-xl font-medium text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Estimated Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatINR(subtotal + (isFreeShipping ? 0 : 99)) })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								window.alert("Thank you for exploring SRSTI! Checkout gateway integration will connect to your payment processor.");
							},
							className: "mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-center font-medium text-primary-foreground transition-all duration-300 hover:bg-gold hover:text-accent-foreground",
							children: ["Proceed to Secure Checkout ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center justify-center gap-2 text-center text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-gold-ink" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Single-Origin · Plastic-Neutral Packaging · Lab Certified" })]
						})
					]
				})
			]
		})
	});
}
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message: describeThrown(error),
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var MAX_SERIALIZED_LENGTH = 2e3;
function describeThrown(error) {
	if (error instanceof Response) return `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
	if (error instanceof Error) return error.message;
	if (typeof error === "string") return error;
	const { message } = error ?? {};
	if (typeof message === "string" && message.length > 0) return message;
	try {
		return JSON.stringify(error)?.slice(0, MAX_SERIALIZED_LENGTH) ?? String(error);
	} catch {
		return String(error);
	}
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$3 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "SRSTI — Wood-Pressed Liquid Heritage" },
			{
				name: "description",
				content: "Ultra-premium cold-pressed and wood-pressed artisanal oils and A2 ghee, traceable to the farm."
			},
			{
				name: "author",
				content: "SRSTI"
			},
			{
				name: "theme-color",
				content: "#FAF7F2"
			},
			{
				property: "og:title",
				content: "SRSTI — Wood-Pressed Liquid Heritage"
			},
			{
				property: "og:description",
				content: "Ultra-premium cold-pressed and wood-pressed artisanal oils and A2 ghee, traceable to the farm."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,400;0,500;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
var THEME_INIT = `try{var t=localStorage.getItem("srsti-theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}`;
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: THEME_INIT } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$3.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "bottom-center" })
		] })
	});
}
var $$splitComponentImporter$2 = () => import("./routes-DBMXCsE_.mjs");
var Route$2 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "SRSTI — Wood-Pressed Oils & A2 Ghee | Liquid Heritage" },
		{
			name: "description",
			content: "Kachi ghani wood-pressed groundnut, coconut and black sesame oils plus A2 Gir cow ghee — pressed under 35°C, traceable to the farm."
		},
		{
			property: "og:title",
			content: "SRSTI — Pure. Unrefined. Liquid Heritage."
		},
		{
			property: "og:description",
			content: "Ultra-premium wood-pressed oils and A2 ghee, pressed under 35°C and traceable batch by batch."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./stride-C5rFAHso.mjs");
var Route$1 = createFileRoute("/stride")({
	head: () => ({ meta: [
		{ title: "SRSTI 3D Experience — 100% Raw Cold Pressed Oils" },
		{
			name: "description",
			content: "Experience SRSTI single-origin cold pressed oils in immersive 3D. Traditional neem-wood ghani extraction, unrefined and pure."
		},
		{
			property: "og:title",
			content: "SRSTI 3D Experience — Cold Pressed Oils"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./products-BMIFWBtr.mjs");
var Route = createFileRoute("/products/")({
	head: () => ({ meta: [
		{ title: "The Pressing Room — Single-Origin Cold-Pressed Oils & Ghee | SRSTI" },
		{
			name: "description",
			content: "Explore SRSTI's complete pantry collection of single-origin wood-pressed groundnut, coconut, black sesame oils, and A2 Gir cow cultured bilona ghee."
		},
		{
			property: "og:title",
			content: "The Pressing Room — SRSTI Artisanal Oils"
		},
		{
			property: "og:description",
			content: "Artisanal cold-pressed oils from native Indian seeds, pressed in wooden ghanis below 35°C with zero chemical solvents."
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$3
});
var StrideRoute = Route$1.update({
	id: "/stride",
	path: "/stride",
	getParentRoute: () => Route$3
});
var ProductsIndexRoute = Route.update({
	id: "/products/",
	path: "/products/",
	getParentRoute: () => Route$3
});
var rootRouteChildren = {
	IndexRoute,
	StrideRoute,
	ProductsSlugRoute: Route$4.update({
		id: "/products/$slug",
		path: "/products/$slug",
		getParentRoute: () => Route$3
	}),
	ProductsIndexRoute
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
