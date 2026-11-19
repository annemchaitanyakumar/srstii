import { n as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Droplets, b as CircleCheck, d as ShieldCheck, l as Sparkles, o as ThermometerSnowflake } from "../_libs/lucide-react.mjs";
import { a as PRODUCTS, n as Footer, o as cn, r as Header } from "./products-BEvAe0zq.mjs";
import { t as ProductCard } from "./ProductCard-DiDexJo0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-DvrvZP5C.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductsCatalogPage() {
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("all");
	const [sortBy, setSortBy] = (0, import_react.useState)("featured");
	const filteredProducts = (0, import_react.useMemo)(() => {
		let list = [...PRODUCTS];
		if (selectedCategory !== "all") list = list.filter((p) => p.category === selectedCategory);
		switch (sortBy) {
			case "price-asc":
				list.sort((a, b) => a.price - b.price);
				break;
			case "price-desc":
				list.sort((a, b) => b.price - a.price);
				break;
			case "smoke-point":
				list.sort((a, b) => b.smokePointDeg - a.smokePointDeg);
				break;
			case "rating": list.sort((a, b) => b.rating.score - a.rating.score);
		}
		return list;
	}, [selectedCategory, sortBy]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground font-display selection:bg-gold/20 selection:text-gold-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main",
				className: "pt-28 md:pt-36 font-display",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "relative px-5 pb-10 pt-6 md:px-10 md:pb-14",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-7xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
									className: "mb-5 flex items-center gap-2 font-display text-sm text-muted-foreground/80",
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
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground",
											children: "The Pressing Room"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "max-w-3xl",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mb-3 font-display text-xs uppercase tracking-[0.22em] font-medium text-gold-ink",
											children: "Single-Origin Harvest Reserves · Current Pressing"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											className: "font-display text-[clamp(2.6rem,5.5vw,4.6rem)] font-normal md:font-medium leading-[1.02] tracking-tight text-foreground",
											children: "The Pressing Room"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 max-w-2xl font-display text-lg md:text-xl leading-relaxed text-muted-foreground/90",
											children: "Every bottle in our pantry is pressed from single-harvest native Indian seeds in traditional Vaagai and Neem wood ghanis turning under 14 RPM. Unfiltered, unbleached, and chemical-free."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-display text-sm text-muted-foreground/85",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThermometerSnowflake, { className: "size-3.5 text-gold-ink" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "< 35°C True Cold Press" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "opacity-30",
													children: "·"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-gold-ink" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "0.0% Hexane Solvents" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "opacity-30",
													children: "·"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "size-3.5 text-gold-ink" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "48h Gravity Settle" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "opacity-30",
													children: "·"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-gold-ink" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "NABL Batch Certified" })]
												})
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-5 font-display",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [
											{
												id: "all",
												label: "All Pressings",
												count: 20
											},
											{
												id: "cooking",
												label: "Daily Cooking Oils",
												count: 8
											},
											{
												id: "wellness",
												label: "Ayurveda & Wellness",
												count: 7
											},
											{
												id: "ghee",
												label: "Vedic Ghees & Nectar",
												count: 5
											}
										].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setSelectedCategory(tab.id),
											className: cn("rounded-full px-4 py-1.5 font-display text-sm md:text-base transition-all cursor-pointer flex items-center gap-2", selectedCategory === tab.id ? "bg-primary text-primary-foreground font-medium shadow-sm" : "border border-border/60 bg-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tab.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("text-xs opacity-70", selectedCategory === tab.id ? "text-primary-foreground" : "text-muted-foreground"),
												children: tab.count
											})]
										}, tab.id))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 font-display text-sm md:text-base",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Sort by:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "sort-select",
											value: sortBy,
											onChange: (e) => setSortBy(e.target.value),
											className: "rounded-full border border-border/60 bg-background/80 px-4 py-1.5 font-display text-sm md:text-base text-foreground outline-none transition-colors hover:border-foreground/30 focus:border-gold cursor-pointer",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "featured",
													children: "Featured Pressings"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "price-asc",
													children: "Price: Low to High"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "price-desc",
													children: "Price: High to Low"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "smoke-point",
													children: "Smoke Point: High to Low"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "rating",
													children: "Top Rated (Verified Reviews)"
												})
											]
										})]
									})]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "px-5 pb-24 md:px-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto max-w-7xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
								children: filteredProducts.map((product, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
									product,
									index: idx
								}, product.id))
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "border-t border-border/60 bg-veil px-5 py-20 md:px-10 md:py-28 font-display",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-7xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-w-2xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-xs uppercase tracking-[0.22em] font-medium text-gold-ink",
										children: "The SRSTI Standard"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-2 font-display text-4xl font-medium tracking-tight md:text-5xl",
										children: "How Ancient Cold-Pressing Outperforms Industrial Refining"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 font-display text-lg text-muted-foreground/90 leading-relaxed",
										children: "Modern vegetable oils are stripped by chemical solvents like petroleum hexane and deodorized at 240°C. Here is why our wooden ghani method remains irreplaceable."
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-14 grid gap-8 md:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "glass-panel rounded-3xl p-8 font-display",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-xs uppercase tracking-[0.2em] font-medium text-gold-ink",
												children: "01 · Frictionless Wood"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "mt-3 font-display text-2xl font-medium",
												children: "Neem & Vaagai Wood Ghani"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-3 font-display text-base leading-relaxed text-muted-foreground/90",
												children: "Unlike metal expellers that heat seeds to 90°C and leech metallic ions, our heavy mortar is carved from seasoned wild neem and vaagai timber. It absorbs friction, keeping seed temperature naturally below 35°C."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
												className: "mt-6 space-y-2 font-display text-sm text-foreground/80",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-gold-ink shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Gentle 12 to 14 rotations per minute" })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-gold-ink shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Preserves delicate polyphenols and Vitamin E" })]
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "glass-panel rounded-3xl p-8 font-display",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-xs uppercase tracking-[0.2em] font-medium text-gold-ink",
												children: "02 · Gravity Clarification"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "mt-3 font-display text-2xl font-medium",
												children: "48-Hour Gravity Sedimentation"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-3 font-display text-base leading-relaxed text-muted-foreground/90",
												children: "Industrial oil requires bleaching earths and caustic chemical neutralization to remove cloudiness. SRSTI oils rest untouched in stainless decanters for two days — micro seed fibers settle purely by earth’s gravity."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
												className: "mt-6 space-y-2 font-display text-sm text-foreground/80",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-gold-ink shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Zero artificial filtration chemicals" })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-gold-ink shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Filtered solely through pure handloom cotton cloth" })]
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "glass-panel rounded-3xl p-8 font-display",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-xs uppercase tracking-[0.2em] font-medium text-gold-ink",
												children: "03 · Verified Transparency"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "mt-3 font-display text-2xl font-medium",
												children: "NABL Laboratory Batch Reports"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-3 font-display text-base leading-relaxed text-muted-foreground/90",
												children: "Trust is verifiable. Every harvest batch undergoes independent laboratory gas chromatography to certify 0.0 ppm hexane solvents, zero argemone adulteration, and minimal free fatty acids."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
												className: "mt-6 space-y-2 font-display text-sm text-foreground/80",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-gold-ink shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Batch code printed on each bottle label" })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-gold-ink shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Full certificate viewable on the product page" })]
												})]
											})
										]
									})
								]
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
export { ProductsCatalogPage as component };
