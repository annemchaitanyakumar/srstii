import { l as motion, r as useReducedMotion } from "../_libs/framer-motion+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as ArrowUpRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-DiDexJo0.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ product, index }) {
	const reduce = useReducedMotion();
	const formattedIndex = String(index + 1).padStart(2, "0");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: reduce ? 0 : 20
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "50px"
		},
		transition: {
			duration: .5,
			ease: [
				.22,
				1,
				.36,
				1
			],
			delay: index % 8 * .04
		},
		className: "h-full font-display",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/products/$slug",
			params: { slug: product.slug },
			className: "group relative flex h-full min-h-[420px] sm:min-h-[440px] flex-col justify-between rounded-[2.2rem] bg-[#e2e6db] p-5 sm:p-6 transition-all duration-400 ease-out hover:-translate-y-2 hover:shadow-[0_22px_45px_rgba(20,29,24,0.12)] cursor-pointer overflow-hidden border border-[#d3d8cb]/60 font-display",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between font-display",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display font-bold text-lg md:text-xl text-[#1a382b] tracking-wider",
						children: formattedIndex
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-5 md:size-6 text-[#1a382b] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 stroke-[2.2]" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "my-auto flex flex-1 items-center justify-center py-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: product.image,
						alt: product.name,
						loading: "lazy",
						className: "max-h-[200px] sm:max-h-[220px] w-auto object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.15)] transition-transform duration-500 ease-silk group-hover:scale-[1.06]"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto pt-2 font-display",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl sm:text-2xl font-bold leading-tight tracking-tight text-[#141d18] group-hover:text-[#1a382b] transition-colors line-clamp-1",
						children: product.short || product.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-baseline justify-between gap-2 font-display",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm font-medium text-[#5a6b61] truncate",
							children: product.trace?.region ? product.trace.region.split(",")[0] : "Single-Origin Farm"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-sm sm:text-base font-bold text-[#141d18] shrink-0",
							children: ["From Rs. ", product.price]
						})]
					})]
				})
			]
		})
	});
}
//#endregion
export { ProductCard as t };
