import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stride-C5rFAHso.js
var import_jsx_runtime = require_jsx_runtime();
function StrideWrapper() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[9999] h-screen w-screen overflow-hidden bg-[#1c1a1f]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			src: "/stride.html",
			title: "Stride Experience",
			className: "h-full w-full border-0",
			allow: "autoplay; fullscreen"
		})
	});
}
//#endregion
export { StrideWrapper as component };
