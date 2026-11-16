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
	"/assets/craft-pour-DA4MGEuU.webp": {
		"type": "image/webp",
		"etag": "\"b708-zMjxqJDds3OkxuaR7Uyi4h08i4c\"",
		"mtime": "2026-11-16T19:30:46.785Z",
		"size": 46856,
		"path": "../public/assets/craft-pour-DA4MGEuU.webp"
	},
	"/assets/craft-press-N2Hbkd1c.webp": {
		"type": "image/webp",
		"etag": "\"31360-8F/tJnjbSIB71lci1NBX8tF2DYU\"",
		"mtime": "2026-11-16T19:30:46.786Z",
		"size": 201568,
		"path": "../public/assets/craft-press-N2Hbkd1c.webp"
	},
	"/assets/craft-seeds-CaW9cluN.webp": {
		"type": "image/webp",
		"etag": "\"253b4-FXbIpcP6hjgI2RD7+RRnmpPsD3Q\"",
		"mtime": "2026-11-16T19:30:46.786Z",
		"size": 152500,
		"path": "../public/assets/craft-seeds-CaW9cluN.webp"
	},
	"/assets/index-OybPtS5U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"62ede-p7nYVpp8jNg6FsrtPpg4vm3HeJ4\"",
		"mtime": "2026-11-16T19:30:46.781Z",
		"size": 405214,
		"path": "../public/assets/index-OybPtS5U.js"
	},
	"/assets/product-coconut-wf10JjM0.webp": {
		"type": "image/webp",
		"etag": "\"4fd6-8KCIi3sqM7rixwMUFnk4BnPN538\"",
		"mtime": "2026-11-16T19:30:46.786Z",
		"size": 20438,
		"path": "../public/assets/product-coconut-wf10JjM0.webp"
	},
	"/assets/product-ghee-CnLIfdBI.webp": {
		"type": "image/webp",
		"etag": "\"611e-v1GpA6a7kV5swN+jgmpbvDxLLzg\"",
		"mtime": "2026-11-16T19:30:46.787Z",
		"size": 24862,
		"path": "../public/assets/product-ghee-CnLIfdBI.webp"
	},
	"/assets/product-groundnut-H4LWVJOT.webp": {
		"type": "image/webp",
		"etag": "\"45f0-RlnuJowAXRQZMCAHw88DFhCe9i0\"",
		"mtime": "2026-11-16T19:30:46.787Z",
		"size": 17904,
		"path": "../public/assets/product-groundnut-H4LWVJOT.webp"
	},
	"/assets/product-sesame-NK76n0Pu.webp": {
		"type": "image/webp",
		"etag": "\"50aa-91m8+Mssb/xf+Ht0qC/00O4ojA8\"",
		"mtime": "2026-11-16T19:30:46.787Z",
		"size": 20650,
		"path": "../public/assets/product-sesame-NK76n0Pu.webp"
	},
	"/assets/purity-farm-CfpAMlm1.webp": {
		"type": "image/webp",
		"etag": "\"23f20-+RRhxg/N4rzvkY02o8/2yqelIZE\"",
		"mtime": "2026-11-16T19:30:46.788Z",
		"size": 147232,
		"path": "../public/assets/purity-farm-CfpAMlm1.webp"
	},
	"/assets/purity-refinery-GIZV0psr.webp": {
		"type": "image/webp",
		"etag": "\"12a76-VuDDQWeP5ed580FCh7aMWEQ0iMA\"",
		"mtime": "2026-11-16T19:30:46.788Z",
		"size": 76406,
		"path": "../public/assets/purity-refinery-GIZV0psr.webp"
	},
	"/assets/ritual-ayurveda-Dlx38E8-.webp": {
		"type": "image/webp",
		"etag": "\"1bc40-qSyXEH0WK0R2gNU2dfLxg9k7U24\"",
		"mtime": "2026-11-16T19:30:46.788Z",
		"size": 113728,
		"path": "../public/assets/ritual-ayurveda-Dlx38E8-.webp"
	},
	"/assets/ritual-drizzle-Cb9Q7V0Y.webp": {
		"type": "image/webp",
		"etag": "\"320fc-CJaBzgVsjiqVSCE9mwBmGDqvw4c\"",
		"mtime": "2026-11-16T19:30:46.789Z",
		"size": 205052,
		"path": "../public/assets/ritual-drizzle-Cb9Q7V0Y.webp"
	},
	"/assets/ritual-saute-Bwc5qrUT.webp": {
		"type": "image/webp",
		"etag": "\"243be-zGdIfWjwnMqtxt/lHACV4WeFr6Q\"",
		"mtime": "2026-11-16T19:30:46.789Z",
		"size": 148414,
		"path": "../public/assets/ritual-saute-Bwc5qrUT.webp"
	},
	"/assets/styles-BIAS9Mve.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"19d9f-UXd1YAHTRWwf5gHhtL3HULKlXAo\"",
		"mtime": "2026-11-16T19:30:46.790Z",
		"size": 105887,
		"path": "../public/assets/styles-BIAS9Mve.css"
	},
	"/assets/routes-ieglTiKE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7a3c1-a8k6d+p4E5ayicElMDIE4TtgEas\"",
		"mtime": "2026-11-16T19:30:46.782Z",
		"size": 500673,
		"path": "../public/assets/routes-ieglTiKE.js"
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
