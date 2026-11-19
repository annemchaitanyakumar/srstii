import { n as __toESM } from "./_runtime.mjs";
import { l as motion, u as AnimatePresence } from "./_libs/framer-motion+[...].mjs";
import { a as AccordionTrigger$1, c as require_react, i as AccordionItem$1, n as AccordionContent$1, r as AccordionHeader, s as require_jsx_runtime, t as Accordion$1 } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { S as Check, _ as Droplets, c as Star, d as ShieldCheck, f as Plus, g as MapPin, h as Minus, i as Truck, l as Sparkles, r as Utensils, w as ArrowRight, x as ChevronDown, y as Compass } from "./_libs/lucide-react.mjs";
import { a as PRODUCTS, b as useCart, n as Footer, o as cn, r as Header, u as formatINR } from "./_ssr/products-BEvAe0zq.mjs";
import { t as Route } from "./_slug-CQjpb9mn.mjs";
import { t as ProductCard } from "./_ssr/ProductCard-DiDexJo0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-BCxKbNkL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Accordion = Accordion$1;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionItem$1, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionHeader, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionTrigger$1, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = AccordionTrigger$1.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent$1, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = AccordionContent$1.displayName;
function ProductDetailPage() {
	const { product } = Route.useLoaderData();
	const { addItem } = useCart();
	const [activeImageIndex, setActiveImageIndex] = (0, import_react.useState)(0);
	const [selectedVariant, setSelectedVariant] = (0, import_react.useState)(product.variants[0] || {
		id: "default",
		volume: product.volume,
		packaging: "Apothecary Decanter",
		price: product.price,
		perUnit: ""
	});
	const [quantity, setQuantity] = (0, import_react.useState)(1);
	const [activeTab, setActiveTab] = (0, import_react.useState)("craft");
	const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);
	const handleAddToCart = () => {
		addItem(product, selectedVariant.volume, selectedVariant.price, quantity);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground font-display selection:bg-gold/20 selection:text-gold-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main",
				className: "pt-28 md:pt-36 font-display",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-5 md:px-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "mx-auto flex max-w-7xl items-center gap-2 font-display text-xs text-muted-foreground/75",
							"aria-label": "Breadcrumb",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "hover:text-foreground transition-colors",
									children: "Home"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "opacity-40",
									children: "/"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/products",
									className: "hover:text-foreground transition-colors",
									children: "The Pressing Room"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "opacity-40",
									children: "/"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground truncate",
									children: product.name
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "px-5 py-6 md:px-10 md:py-12",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto max-w-7xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-12 lg:grid-cols-12 lg:gap-16 items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "lg:col-span-7",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative flex min-h-[480px] sm:min-h-[540px] md:min-h-[620px] w-full items-center justify-center py-8",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute inset-0 pointer-events-none opacity-40 blur-3xl rounded-full",
													style: { background: "radial-gradient(circle at center, rgba(200, 138, 44, 0.16) 0%, transparent 68%)" },
													"aria-hidden": "true"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
													mode: "wait",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
														initial: {
															opacity: 0,
															y: 12,
															scale: .97
														},
														animate: {
															opacity: 1,
															y: 0,
															scale: 1
														},
														exit: {
															opacity: 0,
															scale: 1.03
														},
														transition: {
															duration: .45,
															ease: [
																.22,
																1,
																.36,
																1
															]
														},
														className: "relative z-10 flex h-full w-full items-center justify-center",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															src: product.gallery[activeImageIndex]?.src || product.image,
															alt: product.gallery[activeImageIndex]?.caption || product.name,
															className: "max-h-[420px] sm:max-h-[500px] md:max-h-[580px] w-auto object-contain drop-shadow-[0_28px_50px_rgba(20,29,24,0.18)] transition-transform duration-700 ease-silk hover:scale-[1.02]"
														})
													}, activeImageIndex)
												})]
											}),
											product.gallery.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex items-center justify-center gap-3 mt-4",
												children: product.gallery.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setActiveImageIndex(idx),
													className: cn("relative size-16 md:size-20 rounded-2xl border p-2 transition-all cursor-pointer overflow-hidden flex items-center justify-center", activeImageIndex === idx ? "border-primary ring-1 ring-primary/40 bg-foreground/[0.04] opacity-100 shadow-sm" : "border-border/60 bg-transparent opacity-50 hover:opacity-100 hover:border-foreground/40"),
													"aria-label": `View ${item.caption}`,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: item.src,
														alt: item.caption,
														className: "max-h-full max-w-full object-contain"
													})
												}, idx))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "w-full mt-10 pt-6 border-t border-border/40 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-display text-xs text-muted-foreground/80 text-center",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Origin: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "font-medium text-foreground",
														children: product.trace.region ? product.trace.region.split(",")[0] : "Single-Origin"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "opacity-30",
														children: "·"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Method: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
														className: "font-medium text-foreground",
														children: [
															product.woodGhaniDetails.rpm,
															" RPM ",
															product.woodGhaniDetails.woodType
														]
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "opacity-30",
														children: "·"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Temperature: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "font-medium text-foreground",
														children: "< 35°C Press"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "opacity-30",
														children: "·"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Smoke: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "font-medium text-gold-ink",
														children: product.smokePoint
													})] })
												]
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "lg:col-span-5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "lg:sticky lg:top-28 space-y-7",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-display text-[11px] uppercase tracking-[0.22em] font-medium text-gold-ink",
															children: "Single-Origin Farm Reserve"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-muted-foreground/30",
															children: "·"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-display text-xs text-muted-foreground",
															children: product.trace.batch
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
													className: "mt-2 font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-medium leading-[1.02] tracking-[-0.02em] text-foreground",
													children: product.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 font-display text-lg sm:text-xl italic text-muted-foreground/80",
													children: product.regionalName
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-3 flex items-center gap-2.5 font-display text-xs",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "flex items-center gap-0.5 text-gold",
															children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-gold text-gold" }, i))
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-semibold text-foreground",
															children: product.rating.score
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-muted-foreground/40",
															children: "·"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
															href: "#reviews",
															className: "text-muted-foreground underline hover:text-foreground transition-colors",
															children: [product.rating.count, " harvest reviews"]
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-6 flex items-baseline gap-3",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-display text-4xl sm:text-5xl font-medium text-foreground",
															children: formatINR(selectedVariant.price * quantity)
														}),
														selectedVariant.originalPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-display text-base text-muted-foreground line-through",
															children: formatINR(selectedVariant.originalPrice * quantity)
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "font-display text-xs text-muted-foreground/80",
															children: [
																"(",
																selectedVariant.volume,
																" · All taxes included)"
															]
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-4 font-display text-base leading-relaxed text-muted-foreground/90",
													children: product.tagline
												})
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-3 pt-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between font-display text-xs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "uppercase tracking-[0.16em] font-medium text-muted-foreground",
														children: "Select Vessel & Volume"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-medium text-foreground",
														children: [
															selectedVariant.volume,
															" · ",
															selectedVariant.packaging
														]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "grid grid-cols-3 gap-2.5",
													children: product.variants.map((v) => {
														const isSelected = selectedVariant.id === v.id;
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
															type: "button",
															onClick: () => setSelectedVariant(v),
															className: cn("rounded-2xl p-3.5 text-left transition-all border cursor-pointer flex flex-col justify-between min-h-[82px]", isSelected ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-border/70 bg-transparent text-foreground hover:border-foreground/40"),
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-between gap-1",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-display text-base sm:text-lg font-medium",
																	children: v.volume
																}), v.popular && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: cn("rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider", isSelected ? "bg-primary-foreground/20 text-primary-foreground" : "bg-gold/15 text-gold-ink"),
																	children: "Popular"
																})]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "mt-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: cn("text-xs font-medium font-display", isSelected ? "text-primary-foreground" : "text-foreground"),
																	children: formatINR(v.price)
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: cn("text-[10px] truncate mt-0.5 font-display", isSelected ? "text-primary-foreground/75" : "text-muted-foreground"),
																	children: v.packaging.split(" ")[0]
																})]
															})]
														}, v.id);
													})
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-3 pt-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "inline-flex items-center rounded-full border border-border/80 bg-background px-3 py-2 shrink-0",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => setQuantity((q) => Math.max(1, q - 1)),
																className: "p-1 text-muted-foreground hover:text-foreground cursor-pointer",
																"aria-label": "Decrease quantity",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3.5" })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "w-8 text-center font-display text-sm font-semibold text-foreground",
																children: quantity
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => setQuantity((q) => q + 1),
																className: "p-1 text-muted-foreground hover:text-foreground cursor-pointer",
																"aria-label": "Increase quantity",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" })
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														onClick: handleAddToCart,
														className: "liquid-btn flex flex-1 items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-3.5 font-display text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-gold hover:text-accent-foreground cursor-pointer shadow-md",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Add to Harvest Basket · ", formatINR(selectedVariant.price * quantity)] })]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex items-center text-xs font-display text-muted-foreground/80 pt-2 border-t border-border/40",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "flex items-center gap-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-3.5 text-gold-ink" }), " Free delivery on orders over ₹1,500"]
													})
												})]
											})
										]
									})
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "border-t border-border/60 bg-veil px-5 py-16 md:px-10 md:py-24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-7xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap items-center justify-center gap-2 border-b border-border/50 pb-5",
									children: [
										{
											id: "craft",
											label: "The Press & Provenance",
											icon: Compass
										},
										{
											id: "culinary",
											label: "Culinary & Smoke Point",
											icon: Utensils
										},
										{
											id: "lab",
											label: "NABL Lab Report & Purity",
											icon: ShieldCheck
										},
										{
											id: "ayurveda",
											label: "Ayurvedic Wisdom & Rituals",
											icon: Sparkles
										}
									].map((tab) => {
										const Icon = tab.icon;
										const active = activeTab === tab.id;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setActiveTab(tab.id),
											className: cn("flex items-center gap-2 rounded-full px-5 py-2 font-display text-xs sm:text-sm transition-all cursor-pointer", active ? "bg-primary text-primary-foreground font-medium shadow-sm" : "border border-border/60 bg-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tab.label })]
										}, tab.id);
									})
								}),
								activeTab === "craft" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										y: 15
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: { duration: .5 },
									className: "mt-12 space-y-12",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-10 lg:grid-cols-2 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-display text-[11px] uppercase tracking-[0.22em] font-medium text-gold-ink",
												children: "Provenance & Farm Story"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "mt-2 font-display text-3xl sm:text-4xl font-medium tracking-tight md:text-5xl",
												children: "From Native Soil to Your Wooden Spoon"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-5 font-display text-base leading-relaxed text-muted-foreground/85",
												children: product.story
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
												className: "mt-6 border-l-2 border-gold pl-5 font-display text-lg italic text-foreground/90",
												children: [
													"\"",
													product.heroQuote,
													"\""
												]
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-3xl border border-border/60 bg-background/70 p-8 space-y-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between border-b border-border/50 pb-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-display text-xs uppercase tracking-wider text-muted-foreground",
													children: "Farm Origin"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "font-display text-2xl font-medium text-foreground",
													children: product.trace.farm
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "grid size-10 place-items-center rounded-full bg-gold/15 text-gold-ink",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-5" })
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-2 gap-4 text-xs font-display",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground",
														children: "Custodian / Farmer:"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 font-medium text-foreground",
														children: product.trace.farmerName
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground",
														children: "Region:"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 font-medium text-foreground",
														children: product.trace.region
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground",
														children: "Harvest Season:"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 font-medium text-foreground",
														children: product.trace.harvested
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground",
														children: "Press Date:"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 font-medium text-foreground",
														children: product.trace.pressed
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground",
														children: "Extraction Ghani:"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 font-medium text-foreground",
														children: product.woodGhaniDetails.woodType
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground",
														children: "GPS Location:"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 font-medium text-foreground",
														children: product.trace.geoCoordinates
													})] })
												]
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-3xl border border-border/60 bg-linen/50 p-8 md:p-10",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-display text-2xl font-medium tracking-tight text-center md:text-3xl text-foreground",
												children: "Temperature Extraction Spectrum: How Heat Destroys Oil"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mx-auto mt-2 max-w-2xl text-center font-display text-sm text-muted-foreground",
												children: "High temperatures oxidize unsaturated fats and create inflammatory free radicals. Our wooden ghani protects the living nutrients."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-8 grid gap-4 md:grid-cols-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded-2xl border-2 border-gold/60 bg-background/90 p-5 shadow-sm",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center justify-between",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-display text-xs uppercase text-gold-ink font-semibold",
																children: "SRSTI Wood Ghani"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "rounded-full bg-gold/15 px-2.5 py-0.5 font-display text-xs text-gold-ink font-bold",
																children: product.woodGhaniDetails.maxTemperature
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "mt-3 font-display text-xs leading-relaxed text-foreground/85",
															children: "Native wood absorbs frictional heat. Tocopherols, polyphenols, and fresh seed fragrance remain 100% active."
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded-2xl border border-border/60 bg-background/50 p-5 opacity-80",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center justify-between",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-display text-xs uppercase text-muted-foreground",
																children: "Metal Screw Expeller"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "rounded-full bg-foreground/10 px-2.5 py-0.5 font-display text-xs text-muted-foreground font-semibold",
																children: "85°C – 120°C"
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "mt-3 font-display text-xs leading-relaxed text-muted-foreground",
															children: "High-speed iron screws burn the seed mass, creating burnt undertones and depleting delicate vitamins."
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded-2xl border border-border/60 bg-background/50 p-5 opacity-70",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center justify-between",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-display text-xs uppercase text-muted-foreground",
																children: "Commercial Solvent Refined"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "rounded-full bg-foreground/10 px-2.5 py-0.5 font-display text-xs text-muted-foreground font-semibold",
																children: "200°C – 240°C"
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "mt-3 font-display text-xs leading-relaxed text-muted-foreground",
															children: "Bathed in hexane petroleum ether, bleached with acid clay, and deodorized at blistering temperatures. Completely dead fat."
														})]
													})
												]
											})
										]
									})]
								}),
								activeTab === "culinary" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										y: 15
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: { duration: .5 },
									className: "mt-12 space-y-12",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-10 lg:grid-cols-12 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "lg:col-span-6 space-y-6",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-display text-[11px] uppercase tracking-[0.22em] font-medium text-gold-ink",
														children: "Heat Tolerance & Aroma"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
														className: "mt-2 font-display text-3xl sm:text-4xl font-medium tracking-tight",
														children: ["Smoke Point: ", product.smokePoint]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 font-display text-xs text-gold-ink font-semibold",
														children: product.smokePointLevel
													})
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "font-display text-base leading-relaxed text-muted-foreground/85",
													children: [
														"Smoke point is the temperature at which cooking fat ceases to shimmer and begins to break down into smoke and acrid compounds. Because ",
														product.name,
														" is pure and free of moisture impurities, it maintains high thermal integrity."
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-2xl border border-border/60 bg-background/70 p-6",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
														className: "font-display text-xs uppercase tracking-wider text-muted-foreground",
														children: "Tasting Wheel & Descriptors"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "mt-4 flex flex-wrap gap-2",
														children: product.notes.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 font-display text-xs font-medium text-gold-ink",
															children: note
														}, note))
													})]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "lg:col-span-6 space-y-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-display text-2xl font-medium",
												children: "Recommended Culinary Pairings"
											}), product.pairings.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl border border-border/60 bg-background/70 p-5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
														className: "font-display text-xl font-medium text-foreground",
														children: p.title
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-display text-xs text-gold-ink font-medium",
														children: p.dish
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 font-display text-xs leading-relaxed text-muted-foreground",
													children: p.desc
												})]
											}, p.title))]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-3xl border border-border/60 bg-linen/60 p-8",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-2xl font-medium",
											children: "Kitchen Guidelines & Storage"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 grid gap-4 md:grid-cols-2 font-display",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs uppercase tracking-wider text-foreground/80 font-semibold",
													children: "How to Use:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
													className: "space-y-2 text-xs text-muted-foreground",
													children: product.howToUse.map((tip, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
														className: "flex items-start gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-gold font-bold",
															children: "·"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tip })]
													}, i))
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs uppercase tracking-wider text-foreground/80 font-semibold",
													children: "Pantry Storage:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs leading-relaxed text-muted-foreground",
													children: product.storage
												})]
											})]
										})]
									})]
								}),
								activeTab === "lab" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										opacity: 0,
										y: 15
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: { duration: .5 },
									className: "mt-12 space-y-10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-10 lg:grid-cols-12",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "lg:col-span-7 space-y-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-display text-[11px] uppercase tracking-[0.22em] font-medium text-gold-ink",
													children: "NABL Accredited Certificate"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
													className: "mt-2 font-display text-3xl font-medium tracking-tight md:text-4xl",
													children: ["Batch Purity Analysis · ", product.trace.batch]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 font-display text-sm text-muted-foreground",
													children: "Every single pressing is tested by independent ISO/IEC 17025 accredited laboratories to ensure zero pesticide residues, zero heavy metals, and no petroleum extraction solvents."
												})
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "overflow-hidden rounded-2xl border border-border/60 bg-background/80",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
													className: "w-full text-left text-xs font-display",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
														className: "border-b border-border/60 bg-foreground/[0.03] text-muted-foreground",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
																className: "p-3.5",
																children: "Analytical Parameter"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
																className: "p-3.5",
																children: "Observed Value"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
																className: "p-3.5",
																children: "FSSAI / Codex Standard"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
																className: "p-3.5 text-right",
																children: "Result"
															})
														] })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
														className: "divide-y divide-border/60",
														children: product.lab.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
															className: "hover:bg-foreground/[0.01]",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																	className: "p-3.5 font-medium text-foreground",
																	children: row.label
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																	className: "p-3.5 font-bold text-foreground",
																	children: row.value
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																	className: "p-3.5 text-muted-foreground",
																	children: row.standard
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																	className: "p-3.5 text-right",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold text-gold-ink",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), " PASS"]
																	})
																})
															]
														}, row.label))
													})]
												})
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "lg:col-span-5 space-y-6",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-3xl border border-border/60 bg-background/80 p-6",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "font-display text-2xl font-medium",
														children: "Nutritional Facts"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "font-display text-xs text-muted-foreground",
														children: ["Per serving size: ", product.nutrition.servingSize]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-6 space-y-3 font-display text-xs",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex justify-between border-b border-border/60 pb-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-muted-foreground",
																	children: "Energy"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "font-bold text-foreground",
																	children: [product.nutrition.energyKcal, " kcal"]
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex justify-between border-b border-border/60 pb-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-muted-foreground",
																	children: "Total Fat"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-bold text-foreground",
																	children: product.nutrition.totalFat
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex justify-between border-b border-border/60 pb-2 pl-4",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-muted-foreground",
																	children: "Monounsaturated (MUFA)"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-foreground",
																	children: product.nutrition.mufa
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex justify-between border-b border-border/60 pb-2 pl-4",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-muted-foreground",
																	children: "Polyunsaturated (PUFA)"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-foreground",
																	children: product.nutrition.pufa
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex justify-between border-b border-border/60 pb-2 pl-4",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-muted-foreground",
																	children: "Saturated Fat"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-foreground",
																	children: product.nutrition.saturatedFat
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex justify-between border-b border-border/60 pb-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-muted-foreground",
																	children: "Trans Fatty Acids"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "font-bold text-gold-ink",
																	children: [product.nutrition.transFat, " (0.0g)"]
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex justify-between border-b border-border/60 pb-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-muted-foreground",
																	children: "Cholesterol"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-foreground",
																	children: product.nutrition.cholesterol
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex justify-between pt-1",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-muted-foreground",
																	children: "Active Vitamin E"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-foreground",
																	children: product.nutrition.vitaminE
																})]
															})
														]
													})
												]
											})
										})]
									})
								}),
								activeTab === "ayurveda" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										opacity: 0,
										y: 15
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: { duration: .5 },
									className: "mt-12 space-y-10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-10 lg:grid-cols-2 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-display text-[11px] uppercase tracking-[0.22em] font-medium text-gold-ink",
												children: "Vedic Rasayana"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "mt-2 font-display text-3xl sm:text-4xl font-medium tracking-tight",
												children: "Dosha Balance & Tissue Nourishment"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-4 font-display text-base leading-relaxed text-muted-foreground",
												children: [
													"In classical Ayurveda, unrefined cold-pressed oils and cultured bilona ghee are classified not as inert calories, but as ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Sneha" }),
													" — sacred lubricating substances that penetrate the seven Dhatus (tissues) to support Ojas (vital radiance)."
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-6 space-y-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-2xl border border-border/60 bg-background/80 p-5 font-display",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs uppercase tracking-wider text-gold-ink font-semibold",
														children: "Dosha Profile:"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 font-display text-xl",
														children: product.ayurveda.dosha
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-2xl border border-border/60 bg-background/80 p-5 font-display",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs uppercase tracking-wider text-gold-ink font-semibold",
														children: "Sanskrit Properties (Gunas):"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 text-sm text-foreground/90",
														children: product.ayurveda.property
													})]
												})]
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-3xl border border-border/60 bg-background/80 p-8 space-y-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-display text-2xl font-medium",
												children: "Therapeutic Benefits"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												className: "space-y-4 font-display",
												children: product.ayurveda.benefits.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-start gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "grid size-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-ink text-xs font-bold",
														children: i + 1
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm leading-relaxed text-foreground/85",
														children: b
													})]
												}, i))
											})]
										})]
									})
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "reviews",
						className: "px-5 py-16 md:px-10 md:py-24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto max-w-7xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-10 lg:grid-cols-12",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "lg:col-span-4 space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-[11px] uppercase tracking-[0.22em] font-medium text-gold-ink",
											children: "Harvest Feedback"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-display text-3xl sm:text-4xl font-medium tracking-tight",
											children: "Customer Testimonials"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-baseline gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-5xl md:text-6xl font-medium",
												children: product.rating.score
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex text-gold",
												children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 fill-gold text-gold" }, i))
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 font-display text-xs text-muted-foreground",
												children: [
													"Based on ",
													product.rating.count,
													" reviews"
												]
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-xs text-muted-foreground leading-relaxed",
											children: "Real feedback from home cooks, chefs, and Ayurvedic doctors who have introduced SRSTI pressings into their kitchens."
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "lg:col-span-8 grid gap-4 sm:grid-cols-2",
									children: product.reviews.map((rev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-3xl border border-border/60 bg-background/70 p-6 flex flex-col justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex text-gold",
													children: [...Array(rev.rating)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-gold text-gold" }, i))
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-display text-xs text-muted-foreground",
													children: rev.date
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "mt-3 font-display text-lg font-medium leading-snug",
												children: rev.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 font-display text-xs leading-relaxed text-muted-foreground",
												children: rev.comment
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-6 flex items-center justify-between border-t border-border/50 pt-3 text-xs font-display",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-medium text-foreground",
												children: [
													rev.author,
													" · ",
													rev.location
												]
											}), rev.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-gold-ink font-semibold flex items-center gap-1 text-[11px]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), " Verified Buyer"]
											})]
										})]
									}, rev.id))
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "border-t border-border/60 bg-veil px-5 py-16 md:px-10 md:py-24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-4xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-[11px] uppercase tracking-[0.22em] font-medium text-gold-ink",
										children: "Knowledge & Clarity"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-2 font-display text-3xl sm:text-4xl font-medium tracking-tight",
										children: "Frequently Asked Questions"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 font-display text-sm text-muted-foreground",
										children: "Everything you should know about artisanal cold-pressing, natural sedimentation, and pantry care."
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
									type: "single",
									collapsible: true,
									className: "space-y-3",
									children: product.faqs.map((faq, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
										value: `faq-${i}`,
										className: "rounded-2xl border border-border/60 bg-background/80 px-6 py-2 transition-all hover:border-gold/30",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
											className: "font-display text-lg md:text-xl font-medium text-left text-foreground hover:no-underline",
											children: faq.q
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
											className: "font-display text-sm leading-relaxed text-muted-foreground pt-1 pb-4",
											children: faq.a
										})]
									}, i))
								})
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "px-5 py-16 md:px-10 md:py-24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-7xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-end justify-between gap-4 mb-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-[11px] uppercase tracking-[0.22em] font-medium text-gold-ink",
									children: "Complementary Pressings"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-3xl font-medium tracking-tight md:text-4xl",
									children: "Complete Your Kitchen Pantry"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/products",
									className: "inline-flex items-center gap-2 font-display text-xs uppercase tracking-wider text-gold-ink hover:underline",
									children: ["View all pressings ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-5 sm:grid-cols-2 md:grid-cols-3",
								children: relatedProducts.map((rel, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
									product: rel,
									index: idx
								}, rel.id))
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { ProductDetailPage as component };
