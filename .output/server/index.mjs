globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"1db-W02yjnMQzsRCCt84xj1cuF4GttM\"",
		"mtime": "2026-11-16T16:29:38.700Z",
		"size": 475,
		"path": "../public/favicon.svg"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-11-16T16:29:43.360Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/test-resadex.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"16be-Id8RzR3gs5eQVEwyHt8EhfijkWs\"",
		"mtime": "2026-11-16T17:07:07.342Z",
		"size": 5822,
		"path": "../public/test-resadex.html"
	},
	"/assets/AnimatePresence-Cp9oeaVm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13a7-Dy5dsKXG/CFt+WMgDhp8lSWsc7Y\"",
		"mtime": "2026-11-17T06:25:40.860Z",
		"size": 5031,
		"path": "../public/assets/AnimatePresence-Cp9oeaVm.js"
	},
	"/assets/craft-pour-DA4MGEuU.webp": {
		"type": "image/webp",
		"etag": "\"b708-zMjxqJDds3OkxuaR7Uyi4h08i4c\"",
		"mtime": "2026-11-17T06:25:40.863Z",
		"size": 46856,
		"path": "../public/assets/craft-pour-DA4MGEuU.webp"
	},
	"/assets/craft-press-N2Hbkd1c.webp": {
		"type": "image/webp",
		"etag": "\"31360-8F/tJnjbSIB71lci1NBX8tF2DYU\"",
		"mtime": "2026-11-17T06:25:40.863Z",
		"size": 201568,
		"path": "../public/assets/craft-press-N2Hbkd1c.webp"
	},
	"/assets/craft-seeds-CaW9cluN.webp": {
		"type": "image/webp",
		"etag": "\"253b4-FXbIpcP6hjgI2RD7+RRnmpPsD3Q\"",
		"mtime": "2026-11-17T06:25:40.864Z",
		"size": 152500,
		"path": "../public/assets/craft-seeds-CaW9cluN.webp"
	},
	"/assets/Header-CiROtfja.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34ebc-xwKz6ewF1k2SrMcNKW2LC+471KA\"",
		"mtime": "2026-11-17T06:25:40.861Z",
		"size": 216764,
		"path": "../public/assets/Header-CiROtfja.js"
	},
	"/assets/product-ghee-CnLIfdBI.webp": {
		"type": "image/webp",
		"etag": "\"611e-v1GpA6a7kV5swN+jgmpbvDxLLzg\"",
		"mtime": "2026-11-17T06:25:40.865Z",
		"size": 24862,
		"path": "../public/assets/product-ghee-CnLIfdBI.webp"
	},
	"/assets/product-groundnut-H4LWVJOT.webp": {
		"type": "image/webp",
		"etag": "\"45f0-RlnuJowAXRQZMCAHw88DFhCe9i0\"",
		"mtime": "2026-11-17T06:25:40.865Z",
		"size": 17904,
		"path": "../public/assets/product-groundnut-H4LWVJOT.webp"
	},
	"/assets/product-sesame-NK76n0Pu.webp": {
		"type": "image/webp",
		"etag": "\"50aa-91m8+Mssb/xf+Ht0qC/00O4ojA8\"",
		"mtime": "2026-11-17T06:25:40.866Z",
		"size": 20650,
		"path": "../public/assets/product-sesame-NK76n0Pu.webp"
	},
	"/assets/products-Dyb8Nfgb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30e8-opObaK4bWUL3t/QeTM5LED/8e6g\"",
		"mtime": "2026-11-17T06:25:40.862Z",
		"size": 12520,
		"path": "../public/assets/products-Dyb8Nfgb.js"
	},
	"/assets/purity-refinery-GIZV0psr.webp": {
		"type": "image/webp",
		"etag": "\"12a76-VuDDQWeP5ed580FCh7aMWEQ0iMA\"",
		"mtime": "2026-11-17T06:25:40.866Z",
		"size": 76406,
		"path": "../public/assets/purity-refinery-GIZV0psr.webp"
	},
	"/assets/purity-farm-CfpAMlm1.webp": {
		"type": "image/webp",
		"etag": "\"23f20-+RRhxg/N4rzvkY02o8/2yqelIZE\"",
		"mtime": "2026-11-17T06:25:40.866Z",
		"size": 147232,
		"path": "../public/assets/purity-farm-CfpAMlm1.webp"
	},
	"/assets/ritual-ayurveda-Dlx38E8-.webp": {
		"type": "image/webp",
		"etag": "\"1bc40-qSyXEH0WK0R2gNU2dfLxg9k7U24\"",
		"mtime": "2026-11-17T06:25:40.867Z",
		"size": 113728,
		"path": "../public/assets/ritual-ayurveda-Dlx38E8-.webp"
	},
	"/assets/ritual-drizzle-Cb9Q7V0Y.webp": {
		"type": "image/webp",
		"etag": "\"320fc-CJaBzgVsjiqVSCE9mwBmGDqvw4c\"",
		"mtime": "2026-11-17T06:25:40.867Z",
		"size": 205052,
		"path": "../public/assets/ritual-drizzle-Cb9Q7V0Y.webp"
	},
	"/assets/ritual-saute-Bwc5qrUT.webp": {
		"type": "image/webp",
		"etag": "\"243be-zGdIfWjwnMqtxt/lHACV4WeFr6Q\"",
		"mtime": "2026-11-17T06:25:40.868Z",
		"size": 148414,
		"path": "../public/assets/ritual-saute-Bwc5qrUT.webp"
	},
	"/assets/routes-BCBSGBMy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33524-oFAX3fj7YZuRdbB+Y6eJ77HWTbQ\"",
		"mtime": "2026-11-17T06:25:40.862Z",
		"size": 210212,
		"path": "../public/assets/routes-BCBSGBMy.js"
	},
	"/assets/srsti-almond-B1kJ2BUZ.svg": {
		"type": "image/svg+xml",
		"etag": "\"1e951-j0BjkxWLrsQtCa1it1Xs4qFj9sg\"",
		"mtime": "2026-11-17T06:25:40.868Z",
		"size": 125265,
		"path": "../public/assets/srsti-almond-B1kJ2BUZ.svg"
	},
	"/assets/srsti-apricot-BRCLap4v.svg": {
		"type": "image/svg+xml",
		"etag": "\"1e91f-zKlkTg8IVEIwwKwYTIZA7aNi1Vw\"",
		"mtime": "2026-11-17T06:25:40.869Z",
		"size": 125215,
		"path": "../public/assets/srsti-apricot-BRCLap4v.svg"
	},
	"/assets/srsti-bhringraj-hair-DfgBXT8h.svg": {
		"type": "image/svg+xml",
		"etag": "\"3d58b-DCkfkv24Er7b9BRSNopwDwL6hxw\"",
		"mtime": "2026-11-17T06:25:40.869Z",
		"size": 251275,
		"path": "../public/assets/srsti-bhringraj-hair-DfgBXT8h.svg"
	},
	"/assets/srsti-black-mustard-BWfKHoiE.svg": {
		"type": "image/svg+xml",
		"etag": "\"3d5ab-i+9o7yziMUr4wpDIEZ15YQgxwpg\"",
		"mtime": "2026-11-17T06:25:40.870Z",
		"size": 251307,
		"path": "../public/assets/srsti-black-mustard-BWfKHoiE.svg"
	},
	"/assets/srsti-castor-C_JybnI4.svg": {
		"type": "image/svg+xml",
		"etag": "\"1e928-ngPnO6OGN9kXgfOxQBN+yHxh6gg\"",
		"mtime": "2026-11-17T06:25:40.871Z",
		"size": 125224,
		"path": "../public/assets/srsti-castor-C_JybnI4.svg"
	},
	"/assets/srsti-black-sesame-DkN_xzdz.svg": {
		"type": "image/svg+xml",
		"etag": "\"3d5c3-Buu9HRXRhp5i+s5ICvt8gkpyerY\"",
		"mtime": "2026-11-17T06:25:40.870Z",
		"size": 251331,
		"path": "../public/assets/srsti-black-sesame-DkN_xzdz.svg"
	},
	"/assets/srsti-coconut-CBJ7d4fs.svg": {
		"type": "image/svg+xml",
		"etag": "\"1e4a9-anGXBsD2vOVkwwnB1GmAABjaCfc\"",
		"mtime": "2026-11-17T06:25:40.871Z",
		"size": 124073,
		"path": "../public/assets/srsti-coconut-CBJ7d4fs.svg"
	},
	"/assets/srsti-coconut-stout-cutout-CcGzz7T2.png": {
		"type": "image/png",
		"etag": "\"16a22-zaSTuppp2MMXe5fZsAZ75R3qfU0\"",
		"mtime": "2026-11-17T06:25:40.872Z",
		"size": 92706,
		"path": "../public/assets/srsti-coconut-stout-cutout-CcGzz7T2.png"
	},
	"/assets/srsti-flaxseed-uf2pv9iF.svg": {
		"type": "image/svg+xml",
		"etag": "\"3d5cf-wqf8/L9lAX7mbwUVdV2t8rD/GtA\"",
		"mtime": "2026-11-17T06:25:40.872Z",
		"size": 251343,
		"path": "../public/assets/srsti-flaxseed-uf2pv9iF.svg"
	},
	"/assets/srsti-forest-honey-03TMfgIp.svg": {
		"type": "image/svg+xml",
		"etag": "\"8331-EPYerzwoFUZHIVdNuE2Mh2FNllA\"",
		"mtime": "2026-11-17T06:25:40.873Z",
		"size": 33585,
		"path": "../public/assets/srsti-forest-honey-03TMfgIp.svg"
	},
	"/assets/srsti-ghee-badri-D_gqorl3.svg": {
		"type": "image/svg+xml",
		"etag": "\"8331-8YBZsu8aw9cDeaE35uJEbzIyj1I\"",
		"mtime": "2026-11-17T06:25:40.873Z",
		"size": 33585,
		"path": "../public/assets/srsti-ghee-badri-D_gqorl3.svg"
	},
	"/assets/srsti-ghee-buffalo-C22OBkly.svg": {
		"type": "image/svg+xml",
		"etag": "\"8331-NP+PFxdgmQfTsxDWNkoQRO/b/N4\"",
		"mtime": "2026-11-17T06:25:40.873Z",
		"size": 33585,
		"path": "../public/assets/srsti-ghee-buffalo-C22OBkly.svg"
	},
	"/assets/srsti-ghee-gir-CY1MWIeb.svg": {
		"type": "image/svg+xml",
		"etag": "\"8261-SG1e7XZ1iTyUUcWfk73HGNSBMAg\"",
		"mtime": "2026-11-17T06:25:40.874Z",
		"size": 33377,
		"path": "../public/assets/srsti-ghee-gir-CY1MWIeb.svg"
	},
	"/assets/srsti-ghee-sahiwal-B3SuQnxV.svg": {
		"type": "image/svg+xml",
		"etag": "\"8331-8VTbrTzsiGBCQsV0VuzNlHMbJCA\"",
		"mtime": "2026-11-17T06:25:40.874Z",
		"size": 33585,
		"path": "../public/assets/srsti-ghee-sahiwal-B3SuQnxV.svg"
	},
	"/assets/srsti-groundnut-BPTzQF3L.svg": {
		"type": "image/svg+xml",
		"etag": "\"3cef5-rneUQnQ2+B4imWNAbIq4Qp06wfc\"",
		"mtime": "2026-11-17T06:25:40.874Z",
		"size": 249589,
		"path": "../public/assets/srsti-groundnut-BPTzQF3L.svg"
	},
	"/assets/srsti-groundnut-tall-cutout-hHD0vhLV.png": {
		"type": "image/png",
		"etag": "\"2d9d9-1/FRQWKTYAY/6QJnwju9Jep86rM\"",
		"mtime": "2026-11-17T06:25:40.875Z",
		"size": 186841,
		"path": "../public/assets/srsti-groundnut-tall-cutout-hHD0vhLV.png"
	},
	"/assets/srsti-kalonji-DnNWPcln.svg": {
		"type": "image/svg+xml",
		"etag": "\"1e9b3-0t2QNGFtdEKzmQGbNHhWnemkpnE\"",
		"mtime": "2026-11-17T06:25:40.875Z",
		"size": 125363,
		"path": "../public/assets/srsti-kalonji-DnNWPcln.svg"
	},
	"/assets/srsti-niger-seed-CrFnrVIT.svg": {
		"type": "image/svg+xml",
		"etag": "\"3d5c1-SOizPLcSLjSeQwbR/CZnvFT8n7w\"",
		"mtime": "2026-11-17T06:25:40.876Z",
		"size": 251329,
		"path": "../public/assets/srsti-niger-seed-CrFnrVIT.svg"
	},
	"/assets/srsti-safflower-BwS0UlQF.svg": {
		"type": "image/svg+xml",
		"etag": "\"3d5b4-law9I3mWMv43BeGoZ0FMVdIXx0Y\"",
		"mtime": "2026-11-17T06:25:40.876Z",
		"size": 251316,
		"path": "../public/assets/srsti-safflower-BwS0UlQF.svg"
	},
	"/assets/srsti-walnut-CZ8BLwJx.svg": {
		"type": "image/svg+xml",
		"etag": "\"3d581-MBuDain9qg5I7scgWGsqSrAd470\"",
		"mtime": "2026-11-17T06:25:40.877Z",
		"size": 251265,
		"path": "../public/assets/srsti-walnut-CZ8BLwJx.svg"
	},
	"/assets/srsti-white-sesame-BB60MOaT.svg": {
		"type": "image/svg+xml",
		"etag": "\"3d5c3-WdTtShZ5dRGsNsPfsxsRErvK+qM\"",
		"mtime": "2026-11-17T06:25:40.877Z",
		"size": 251331,
		"path": "../public/assets/srsti-white-sesame-BB60MOaT.svg"
	},
	"/assets/srsti-yellow-mustard-8mEJ71SB.svg": {
		"type": "image/svg+xml",
		"etag": "\"3d5ac-AhxlyMn0GEeuALEk+AZTgYno0UE\"",
		"mtime": "2026-11-17T06:25:40.878Z",
		"size": 251308,
		"path": "../public/assets/srsti-yellow-mustard-8mEJ71SB.svg"
	},
	"/assets/styles-B6GfnK07.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1df4c-4GBjbzoEW+c4GKtCz5UVXdRJVkw\"",
		"mtime": "2026-11-17T06:25:40.878Z",
		"size": 122700,
		"path": "../public/assets/styles-B6GfnK07.css"
	},
	"/assets/thermometer-snowflake-CB1_pMVF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"53b-5V1mY8n6XO4M5iPHBPqrrfwAti4\"",
		"mtime": "2026-11-17T06:25:40.863Z",
		"size": 1339,
		"path": "../public/assets/thermometer-snowflake-CB1_pMVF.js"
	},
	"/assets/_slug-D9Q93oQc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c206-n11O9q156ZmHR6bKrV6Rlh80Nig\"",
		"mtime": "2026-11-17T06:25:40.861Z",
		"size": 49670,
		"path": "../public/assets/_slug-D9Q93oQc.js"
	},
	"/assets/index-rJ9SeorE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a0d9-c5Y4Jscl6cdWgFFuVqJ0ItZUXYc\"",
		"mtime": "2026-11-17T06:25:40.860Z",
		"size": 565465,
		"path": "../public/assets/index-rJ9SeorE.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_ZIJ44T = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_ZIJ44T
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
