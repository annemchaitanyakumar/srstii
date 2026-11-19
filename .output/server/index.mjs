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
	"/stride.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"3ce73-BSS0tQYiWJ+0qDdXwNBU14hK/ks\"",
		"mtime": "2026-11-19T05:45:45.404Z",
		"size": 249459,
		"path": "../public/stride.html"
	},
	"/stride-showcase.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"3df21-lqjc2Nrxi1W8Ft8uxOkCA/falAY\"",
		"mtime": "2026-11-19T06:16:02.797Z",
		"size": 253729,
		"path": "../public/stride-showcase.html"
	},
	"/test-resadex.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"16be-Id8RzR3gs5eQVEwyHt8EhfijkWs\"",
		"mtime": "2026-11-16T17:07:07.342Z",
		"size": 5822,
		"path": "../public/test-resadex.html"
	},
	"/3d bottle2/Bottle_v1.mtl": {
		"type": "model/mtl",
		"etag": "\"3db-34XfEYrzhd07ZZ+NmEoxdLmkKIg\"",
		"mtime": "2026-11-17T07:56:26.210Z",
		"size": 987,
		"path": "../public/3d bottle2/Bottle_v1.mtl"
	},
	"/assets/AnimatePresence-C7iYd_Sr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13a7-bgEZxUdmZc2kJVy1KlXTjZvjdHs\"",
		"mtime": "2026-11-19T06:35:53.699Z",
		"size": 5031,
		"path": "../public/assets/AnimatePresence-C7iYd_Sr.js"
	},
	"/assets/craft-pour-DA4MGEuU.webp": {
		"type": "image/webp",
		"etag": "\"b708-zMjxqJDds3OkxuaR7Uyi4h08i4c\"",
		"mtime": "2026-11-19T06:35:53.709Z",
		"size": 46856,
		"path": "../public/assets/craft-pour-DA4MGEuU.webp"
	},
	"/3d bottle1/low+poly.FBX": {
		"type": "application/vnd.autodesk.fbx",
		"etag": "\"5c550-L1nzost8m6OX4C/vKyKJK7Fi4d0\"",
		"mtime": "2026-11-17T07:01:17.785Z",
		"size": 378192,
		"path": "../public/3d bottle1/low+poly.FBX"
	},
	"/assets/craft-press-N2Hbkd1c.webp": {
		"type": "image/webp",
		"etag": "\"31360-8F/tJnjbSIB71lci1NBX8tF2DYU\"",
		"mtime": "2026-11-19T06:35:53.710Z",
		"size": 201568,
		"path": "../public/assets/craft-press-N2Hbkd1c.webp"
	},
	"/assets/craft-seeds-CaW9cluN.webp": {
		"type": "image/webp",
		"etag": "\"253b4-FXbIpcP6hjgI2RD7+RRnmpPsD3Q\"",
		"mtime": "2026-11-19T06:35:53.712Z",
		"size": 152500,
		"path": "../public/assets/craft-seeds-CaW9cluN.webp"
	},
	"/assets/Header-D23d27O6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34d20-RcV7VmOFbxG4HGEWwWyS9P8+Vnc\"",
		"mtime": "2026-11-19T06:35:53.702Z",
		"size": 216352,
		"path": "../public/assets/Header-D23d27O6.js"
	},
	"/assets/product-ghee-CnLIfdBI.webp": {
		"type": "image/webp",
		"etag": "\"611e-v1GpA6a7kV5swN+jgmpbvDxLLzg\"",
		"mtime": "2026-11-19T06:35:53.713Z",
		"size": 24862,
		"path": "../public/assets/product-ghee-CnLIfdBI.webp"
	},
	"/assets/product-groundnut-H4LWVJOT.webp": {
		"type": "image/webp",
		"etag": "\"45f0-RlnuJowAXRQZMCAHw88DFhCe9i0\"",
		"mtime": "2026-11-19T06:35:53.715Z",
		"size": 17904,
		"path": "../public/assets/product-groundnut-H4LWVJOT.webp"
	},
	"/assets/products-C25TxXaL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30e7-+LONonib3g4dYrp3X9wab8VPkMo\"",
		"mtime": "2026-11-19T06:35:53.704Z",
		"size": 12519,
		"path": "../public/assets/products-C25TxXaL.js"
	},
	"/assets/product-sesame-NK76n0Pu.webp": {
		"type": "image/webp",
		"etag": "\"50aa-91m8+Mssb/xf+Ht0qC/00O4ojA8\"",
		"mtime": "2026-11-19T06:35:53.715Z",
		"size": 20650,
		"path": "../public/assets/product-sesame-NK76n0Pu.webp"
	},
	"/assets/purity-farm-CfpAMlm1.webp": {
		"type": "image/webp",
		"etag": "\"23f20-+RRhxg/N4rzvkY02o8/2yqelIZE\"",
		"mtime": "2026-11-19T06:35:53.718Z",
		"size": 147232,
		"path": "../public/assets/purity-farm-CfpAMlm1.webp"
	},
	"/assets/purity-refinery-GIZV0psr.webp": {
		"type": "image/webp",
		"etag": "\"12a76-VuDDQWeP5ed580FCh7aMWEQ0iMA\"",
		"mtime": "2026-11-19T06:35:53.719Z",
		"size": 76406,
		"path": "../public/assets/purity-refinery-GIZV0psr.webp"
	},
	"/assets/ritual-ayurveda-Dlx38E8-.webp": {
		"type": "image/webp",
		"etag": "\"1bc40-qSyXEH0WK0R2gNU2dfLxg9k7U24\"",
		"mtime": "2026-11-19T06:35:53.721Z",
		"size": 113728,
		"path": "../public/assets/ritual-ayurveda-Dlx38E8-.webp"
	},
	"/assets/ritual-drizzle-Cb9Q7V0Y.webp": {
		"type": "image/webp",
		"etag": "\"320fc-CJaBzgVsjiqVSCE9mwBmGDqvw4c\"",
		"mtime": "2026-11-19T06:35:53.722Z",
		"size": 205052,
		"path": "../public/assets/ritual-drizzle-Cb9Q7V0Y.webp"
	},
	"/assets/ritual-saute-Bwc5qrUT.webp": {
		"type": "image/webp",
		"etag": "\"243be-zGdIfWjwnMqtxt/lHACV4WeFr6Q\"",
		"mtime": "2026-11-19T06:35:53.724Z",
		"size": 148414,
		"path": "../public/assets/ritual-saute-Bwc5qrUT.webp"
	},
	"/assets/routes-oPhFGepM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34ace-H3VvgcWiFadaoy42kHG8ZMdlmdU\"",
		"mtime": "2026-11-19T06:35:53.705Z",
		"size": 215758,
		"path": "../public/assets/routes-oPhFGepM.js"
	},
	"/assets/srsti-apricot-BRCLap4v.svg": {
		"type": "image/svg+xml",
		"etag": "\"1e91f-zKlkTg8IVEIwwKwYTIZA7aNi1Vw\"",
		"mtime": "2026-11-19T06:35:53.728Z",
		"size": 125215,
		"path": "../public/assets/srsti-apricot-BRCLap4v.svg"
	},
	"/assets/srsti-almond-B1kJ2BUZ.svg": {
		"type": "image/svg+xml",
		"etag": "\"1e951-j0BjkxWLrsQtCa1it1Xs4qFj9sg\"",
		"mtime": "2026-11-19T06:35:53.725Z",
		"size": 125265,
		"path": "../public/assets/srsti-almond-B1kJ2BUZ.svg"
	},
	"/assets/srsti-bhringraj-hair-DfgBXT8h.svg": {
		"type": "image/svg+xml",
		"etag": "\"3d58b-DCkfkv24Er7b9BRSNopwDwL6hxw\"",
		"mtime": "2026-11-19T06:35:53.729Z",
		"size": 251275,
		"path": "../public/assets/srsti-bhringraj-hair-DfgBXT8h.svg"
	},
	"/assets/srsti-black-mustard-BWfKHoiE.svg": {
		"type": "image/svg+xml",
		"etag": "\"3d5ab-i+9o7yziMUr4wpDIEZ15YQgxwpg\"",
		"mtime": "2026-11-19T06:35:53.731Z",
		"size": 251307,
		"path": "../public/assets/srsti-black-mustard-BWfKHoiE.svg"
	},
	"/assets/srsti-black-sesame-DkN_xzdz.svg": {
		"type": "image/svg+xml",
		"etag": "\"3d5c3-Buu9HRXRhp5i+s5ICvt8gkpyerY\"",
		"mtime": "2026-11-19T06:35:53.732Z",
		"size": 251331,
		"path": "../public/assets/srsti-black-sesame-DkN_xzdz.svg"
	},
	"/assets/srsti-castor-C_JybnI4.svg": {
		"type": "image/svg+xml",
		"etag": "\"1e928-ngPnO6OGN9kXgfOxQBN+yHxh6gg\"",
		"mtime": "2026-11-19T06:35:53.734Z",
		"size": 125224,
		"path": "../public/assets/srsti-castor-C_JybnI4.svg"
	},
	"/assets/srsti-coconut-CBJ7d4fs.svg": {
		"type": "image/svg+xml",
		"etag": "\"1e4a9-anGXBsD2vOVkwwnB1GmAABjaCfc\"",
		"mtime": "2026-11-19T06:35:53.736Z",
		"size": 124073,
		"path": "../public/assets/srsti-coconut-CBJ7d4fs.svg"
	},
	"/assets/srsti-coconut-stout-cutout-CcGzz7T2.png": {
		"type": "image/png",
		"etag": "\"16a22-zaSTuppp2MMXe5fZsAZ75R3qfU0\"",
		"mtime": "2026-11-19T06:35:53.738Z",
		"size": 92706,
		"path": "../public/assets/srsti-coconut-stout-cutout-CcGzz7T2.png"
	},
	"/assets/srsti-coconut-stout-cutout.png": {
		"type": "image/png",
		"etag": "\"16a22-zaSTuppp2MMXe5fZsAZ75R3qfU0\"",
		"mtime": "2026-11-17T06:02:40.925Z",
		"size": 92706,
		"path": "../public/assets/srsti-coconut-stout-cutout.png"
	},
	"/assets/srsti-flaxseed-uf2pv9iF.svg": {
		"type": "image/svg+xml",
		"etag": "\"3d5cf-wqf8/L9lAX7mbwUVdV2t8rD/GtA\"",
		"mtime": "2026-11-19T06:35:53.740Z",
		"size": 251343,
		"path": "../public/assets/srsti-flaxseed-uf2pv9iF.svg"
	},
	"/assets/srsti-forest-honey-03TMfgIp.svg": {
		"type": "image/svg+xml",
		"etag": "\"8331-EPYerzwoFUZHIVdNuE2Mh2FNllA\"",
		"mtime": "2026-11-19T06:35:53.742Z",
		"size": 33585,
		"path": "../public/assets/srsti-forest-honey-03TMfgIp.svg"
	},
	"/assets/srsti-ghee-badri-D_gqorl3.svg": {
		"type": "image/svg+xml",
		"etag": "\"8331-8YBZsu8aw9cDeaE35uJEbzIyj1I\"",
		"mtime": "2026-11-19T06:35:53.743Z",
		"size": 33585,
		"path": "../public/assets/srsti-ghee-badri-D_gqorl3.svg"
	},
	"/assets/srsti-ghee-buffalo-C22OBkly.svg": {
		"type": "image/svg+xml",
		"etag": "\"8331-NP+PFxdgmQfTsxDWNkoQRO/b/N4\"",
		"mtime": "2026-11-19T06:35:53.745Z",
		"size": 33585,
		"path": "../public/assets/srsti-ghee-buffalo-C22OBkly.svg"
	},
	"/assets/srsti-ghee-gir-CY1MWIeb.svg": {
		"type": "image/svg+xml",
		"etag": "\"8261-SG1e7XZ1iTyUUcWfk73HGNSBMAg\"",
		"mtime": "2026-11-19T06:35:53.747Z",
		"size": 33377,
		"path": "../public/assets/srsti-ghee-gir-CY1MWIeb.svg"
	},
	"/assets/srsti-ghee-sahiwal-B3SuQnxV.svg": {
		"type": "image/svg+xml",
		"etag": "\"8331-8VTbrTzsiGBCQsV0VuzNlHMbJCA\"",
		"mtime": "2026-11-19T06:35:53.748Z",
		"size": 33585,
		"path": "../public/assets/srsti-ghee-sahiwal-B3SuQnxV.svg"
	},
	"/assets/srsti-groundnut-tall-cutout.png": {
		"type": "image/png",
		"etag": "\"2d9d9-1/FRQWKTYAY/6QJnwju9Jep86rM\"",
		"mtime": "2026-11-17T05:58:59.305Z",
		"size": 186841,
		"path": "../public/assets/srsti-groundnut-tall-cutout.png"
	},
	"/assets/srsti-groundnut-BPTzQF3L.svg": {
		"type": "image/svg+xml",
		"etag": "\"3cef5-rneUQnQ2+B4imWNAbIq4Qp06wfc\"",
		"mtime": "2026-11-19T06:35:53.749Z",
		"size": 249589,
		"path": "../public/assets/srsti-groundnut-BPTzQF3L.svg"
	},
	"/assets/srsti-groundnut-tall-cutout-hHD0vhLV.png": {
		"type": "image/png",
		"etag": "\"2d9d9-1/FRQWKTYAY/6QJnwju9Jep86rM\"",
		"mtime": "2026-11-19T06:35:53.751Z",
		"size": 186841,
		"path": "../public/assets/srsti-groundnut-tall-cutout-hHD0vhLV.png"
	},
	"/assets/srsti-kalonji-DnNWPcln.svg": {
		"type": "image/svg+xml",
		"etag": "\"1e9b3-0t2QNGFtdEKzmQGbNHhWnemkpnE\"",
		"mtime": "2026-11-19T06:35:53.752Z",
		"size": 125363,
		"path": "../public/assets/srsti-kalonji-DnNWPcln.svg"
	},
	"/assets/srsti-niger-seed-CrFnrVIT.svg": {
		"type": "image/svg+xml",
		"etag": "\"3d5c1-SOizPLcSLjSeQwbR/CZnvFT8n7w\"",
		"mtime": "2026-11-19T06:35:53.753Z",
		"size": 251329,
		"path": "../public/assets/srsti-niger-seed-CrFnrVIT.svg"
	},
	"/assets/srsti-safflower-BwS0UlQF.svg": {
		"type": "image/svg+xml",
		"etag": "\"3d5b4-law9I3mWMv43BeGoZ0FMVdIXx0Y\"",
		"mtime": "2026-11-19T06:35:53.754Z",
		"size": 251316,
		"path": "../public/assets/srsti-safflower-BwS0UlQF.svg"
	},
	"/assets/srsti-walnut-CZ8BLwJx.svg": {
		"type": "image/svg+xml",
		"etag": "\"3d581-MBuDain9qg5I7scgWGsqSrAd470\"",
		"mtime": "2026-11-19T06:35:53.756Z",
		"size": 251265,
		"path": "../public/assets/srsti-walnut-CZ8BLwJx.svg"
	},
	"/assets/srsti-white-sesame-BB60MOaT.svg": {
		"type": "image/svg+xml",
		"etag": "\"3d5c3-WdTtShZ5dRGsNsPfsxsRErvK+qM\"",
		"mtime": "2026-11-19T06:35:53.757Z",
		"size": 251331,
		"path": "../public/assets/srsti-white-sesame-BB60MOaT.svg"
	},
	"/assets/stride-BG_Y5nOn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14d-gkZxrdzY8zXLvmyAtTaxAJuj/wM\"",
		"mtime": "2026-11-19T06:35:53.706Z",
		"size": 333,
		"path": "../public/assets/stride-BG_Y5nOn.js"
	},
	"/assets/srsti-yellow-mustard-8mEJ71SB.svg": {
		"type": "image/svg+xml",
		"etag": "\"3d5ac-AhxlyMn0GEeuALEk+AZTgYno0UE\"",
		"mtime": "2026-11-19T06:35:53.759Z",
		"size": 251308,
		"path": "../public/assets/srsti-yellow-mustard-8mEJ71SB.svg"
	},
	"/assets/styles-DqPmd597.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1e946-IutUOn03tQizAeyi3enuIpOiazc\"",
		"mtime": "2026-11-19T06:35:53.760Z",
		"size": 125254,
		"path": "../public/assets/styles-DqPmd597.css"
	},
	"/assets/thermometer-snowflake-CtvXQAEz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c3-bH4bdioeg6mYGBSrfCufNHd54RI\"",
		"mtime": "2026-11-19T06:35:53.708Z",
		"size": 1475,
		"path": "../public/assets/thermometer-snowflake-CtvXQAEz.js"
	},
	"/assets/_slug-BHB24e8q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c200-hKUeJEe0qOGeHfJZ/Fe1A7GRbH0\"",
		"mtime": "2026-11-19T06:35:53.703Z",
		"size": 49664,
		"path": "../public/assets/_slug-BHB24e8q.js"
	},
	"/assets/particles/black-sesame-0.png": {
		"type": "image/png",
		"etag": "\"72ed2-c+RSFBUVgmXG4JVsuXV6FCWvbVI\"",
		"mtime": "2026-11-17T10:36:44.650Z",
		"size": 470738,
		"path": "../public/assets/particles/black-sesame-0.png"
	},
	"/assets/index-gimVSaSG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a2b5-xRwq0dyqA82mBzjo5+iT+2zrlZw\"",
		"mtime": "2026-11-19T06:35:53.698Z",
		"size": 565941,
		"path": "../public/assets/index-gimVSaSG.js"
	},
	"/assets/particles/black-sesame-2.png": {
		"type": "image/png",
		"etag": "\"7c0fd-y+RsHehcj9hn+5YricC5Ga0Hck0\"",
		"mtime": "2026-11-17T10:36:44.690Z",
		"size": 508157,
		"path": "../public/assets/particles/black-sesame-2.png"
	},
	"/assets/particles/cherry.png": {
		"type": "image/png",
		"etag": "\"10a25-sQx84xaX2SRyxvFMObijnwe/D0Y\"",
		"mtime": "2026-11-17T11:10:11.002Z",
		"size": 68133,
		"path": "../public/assets/particles/cherry.png"
	},
	"/assets/particles/coconut-0.png": {
		"type": "image/png",
		"etag": "\"7cf5f-FSNhxDKXFVnOadBQGQi56kOHlc0\"",
		"mtime": "2026-11-17T10:36:44.200Z",
		"size": 511839,
		"path": "../public/assets/particles/coconut-0.png"
	},
	"/assets/particles/ghee-1.png": {
		"type": "image/png",
		"etag": "\"4d33e-75wpoM22pJ1vPpgIKWukV/znFjc\"",
		"mtime": "2026-11-17T10:36:44.833Z",
		"size": 316222,
		"path": "../public/assets/particles/ghee-1.png"
	},
	"/assets/particles/ghee-0.png": {
		"type": "image/png",
		"etag": "\"4d434-wLBTM6Mfccduq4O1TAXhjnHF2bU\"",
		"mtime": "2026-11-17T10:36:44.820Z",
		"size": 316468,
		"path": "../public/assets/particles/ghee-0.png"
	},
	"/assets/particles/ghee-2.png": {
		"type": "image/png",
		"etag": "\"4c266-OwEGmEIm6N1juqWr6+31Jx5IQXg\"",
		"mtime": "2026-11-17T10:36:44.847Z",
		"size": 311910,
		"path": "../public/assets/particles/ghee-2.png"
	},
	"/assets/particles/ghee-3.png": {
		"type": "image/png",
		"etag": "\"4cb01-reF1ARMkKOW87AhTY3p5mvYYesI\"",
		"mtime": "2026-11-17T10:36:44.862Z",
		"size": 314113,
		"path": "../public/assets/particles/ghee-3.png"
	},
	"/assets/particles/ghee-4.png": {
		"type": "image/png",
		"etag": "\"4ca75-+hW9TaKlRyk2BBihEOgiQ2bHEFU\"",
		"mtime": "2026-11-17T10:36:44.875Z",
		"size": 313973,
		"path": "../public/assets/particles/ghee-4.png"
	},
	"/assets/particles/groundnut-0.png": {
		"type": "image/png",
		"etag": "\"7bba9-1796WGlBU9tOl9oSLGg/zcXW0Cg\"",
		"mtime": "2026-11-17T10:36:43.978Z",
		"size": 506793,
		"path": "../public/assets/particles/groundnut-0.png"
	},
	"/3d bottle1/bottle-baked.json": {
		"type": "application/json",
		"etag": "\"1a9aef-/azjCYzpmgmDPt8cATp/xi1BeTk\"",
		"mtime": "2026-11-17T07:14:30.785Z",
		"size": 1743599,
		"path": "../public/3d bottle1/bottle-baked.json"
	},
	"/assets/particles/black-sesame-1.png": {
		"type": "image/png",
		"etag": "\"8979e-tSOXtCJHKIc+E+z2rytcurxSPas\"",
		"mtime": "2026-11-17T10:36:44.670Z",
		"size": 563102,
		"path": "../public/assets/particles/black-sesame-1.png"
	},
	"/assets/particles/black-sesame-3.png": {
		"type": "image/png",
		"etag": "\"89e50-3zGSwMijJAYPqn4bt5kza+n9gqU\"",
		"mtime": "2026-11-17T10:36:44.709Z",
		"size": 564816,
		"path": "../public/assets/particles/black-sesame-3.png"
	},
	"/assets/particles/black-sesame-4.png": {
		"type": "image/png",
		"etag": "\"89a53-nwnsz0GRmIlxnZYn+6G6aFQD96g\"",
		"mtime": "2026-11-17T10:36:44.729Z",
		"size": 563795,
		"path": "../public/assets/particles/black-sesame-4.png"
	},
	"/assets/particles/coconut-1.png": {
		"type": "image/png",
		"etag": "\"a1088-DP7VMyBbUMD8N6drtWSodAh5/Is\"",
		"mtime": "2026-11-17T10:36:44.221Z",
		"size": 659592,
		"path": "../public/assets/particles/coconut-1.png"
	},
	"/assets/particles/coconut-2.png": {
		"type": "image/png",
		"etag": "\"8fdc0-qbP5hJ6NjXGOBxfjMN5PHPH0jgA\"",
		"mtime": "2026-11-17T10:36:44.242Z",
		"size": 589248,
		"path": "../public/assets/particles/coconut-2.png"
	},
	"/assets/particles/coconut-3.png": {
		"type": "image/png",
		"etag": "\"9e52f-XI1OYRVBDPn5HpF5+crXIL6OWK4\"",
		"mtime": "2026-11-17T10:36:44.263Z",
		"size": 648495,
		"path": "../public/assets/particles/coconut-3.png"
	},
	"/assets/particles/coconut-4.png": {
		"type": "image/png",
		"etag": "\"9e870-nf2nep/I6rJ9DRcwgL/ilZx5o8o\"",
		"mtime": "2026-11-17T10:36:44.286Z",
		"size": 649328,
		"path": "../public/assets/particles/coconut-4.png"
	},
	"/3d bottle2/Bottle_v1.glb": {
		"type": "model/gltf-binary",
		"etag": "\"2dfdfc-WJhCiW5wdk2DR6PsCNaPOlcc1x8\"",
		"mtime": "2026-11-17T07:56:43.910Z",
		"size": 3014140,
		"path": "../public/3d bottle2/Bottle_v1.glb"
	},
	"/assets/particles/olives-0.png": {
		"type": "image/png",
		"etag": "\"5d140-0kCxq7sitVkX4uqycmpzzLw/h0A\"",
		"mtime": "2026-11-17T10:36:44.999Z",
		"size": 381248,
		"path": "../public/assets/particles/olives-0.png"
	},
	"/assets/particles/olives-1.png": {
		"type": "image/png",
		"etag": "\"6815f-I9uHKleRs3HAxDCGII06+4XZUJE\"",
		"mtime": "2026-11-17T10:36:45.017Z",
		"size": 426335,
		"path": "../public/assets/particles/olives-1.png"
	},
	"/assets/particles/olives-2.png": {
		"type": "image/png",
		"etag": "\"5f5b0-mOXj7mqlUHAeCj0eUkhicqy6Fmc\"",
		"mtime": "2026-11-17T10:36:45.035Z",
		"size": 390576,
		"path": "../public/assets/particles/olives-2.png"
	},
	"/assets/particles/olives-3.png": {
		"type": "image/png",
		"etag": "\"65c8b-QvsgnxapviWvwf5NoQtSRjQiOEg\"",
		"mtime": "2026-11-17T10:36:45.053Z",
		"size": 416907,
		"path": "../public/assets/particles/olives-3.png"
	},
	"/3d bottle2/Bottle_v1.fbx": {
		"type": "application/vnd.autodesk.fbx",
		"etag": "\"34048c-IK+fSr1b5w3lhMkV7V44zU3EOWQ\"",
		"mtime": "2026-11-17T07:56:49.836Z",
		"size": 3409036,
		"path": "../public/3d bottle2/Bottle_v1.fbx"
	},
	"/assets/particles/olives-4.png": {
		"type": "image/png",
		"etag": "\"63bf8-rtZeGZ1G8q2IO3/iO5Bk9SkDKmU\"",
		"mtime": "2026-11-17T10:36:45.071Z",
		"size": 408568,
		"path": "../public/assets/particles/olives-4.png"
	},
	"/assets/particles/groundnut-3.png": {
		"type": "image/png",
		"etag": "\"bb668-d+KcFKWfeqxnR2pZzYqVHxBl88k\"",
		"mtime": "2026-11-17T10:36:44.051Z",
		"size": 767592,
		"path": "../public/assets/particles/groundnut-3.png"
	},
	"/assets/particles/groundnut-1.png": {
		"type": "image/png",
		"etag": "\"bd20a-abfM7VkNNThoAeT6BUuPA2Yom98\"",
		"mtime": "2026-11-17T10:36:44.007Z",
		"size": 774666,
		"path": "../public/assets/particles/groundnut-1.png"
	},
	"/models/bottle-baked.json": {
		"type": "application/json",
		"etag": "\"1a9aef-/azjCYzpmgmDPt8cATp/xi1BeTk\"",
		"mtime": "2026-11-17T07:14:30.785Z",
		"size": 1743599,
		"path": "../public/models/bottle-baked.json"
	},
	"/assets/particles/groundnut-2.png": {
		"type": "image/png",
		"etag": "\"8388f-m/+o2IX/LO1f9W66fPABkCW4g9s\"",
		"mtime": "2026-11-17T10:36:44.026Z",
		"size": 538767,
		"path": "../public/assets/particles/groundnut-2.png"
	},
	"/assets/particles/groundnut-4.png": {
		"type": "image/png",
		"etag": "\"81fdd-WxBhoTKcYDzPuo5SJXJRPdReTOc\"",
		"mtime": "2026-11-17T10:36:44.070Z",
		"size": 532445,
		"path": "../public/assets/particles/groundnut-4.png"
	},
	"/assets/particles/mustard-0.png": {
		"type": "image/png",
		"etag": "\"bd87f-TDLbLMbylgkrtIA/d2ctqM8M4x8\"",
		"mtime": "2026-11-17T10:36:44.451Z",
		"size": 776319,
		"path": "../public/assets/particles/mustard-0.png"
	},
	"/assets/particles/mustard-1.png": {
		"type": "image/png",
		"etag": "\"be684-/SIPKi8Ac/RkpjNgOMq3ZmiFXg8\"",
		"mtime": "2026-11-17T10:36:44.475Z",
		"size": 779908,
		"path": "../public/assets/particles/mustard-1.png"
	},
	"/assets/particles/mustard-2.png": {
		"type": "image/png",
		"etag": "\"b9d0d-s7Zml8xo5nkQJFEWRoihwSDTRPg\"",
		"mtime": "2026-11-17T10:36:44.498Z",
		"size": 761101,
		"path": "../public/assets/particles/mustard-2.png"
	},
	"/assets/particles/mustard-3.png": {
		"type": "image/png",
		"etag": "\"ba0f1-keYr2K7rjN8Hb2RWTXcXw7I6mmU\"",
		"mtime": "2026-11-17T10:36:44.521Z",
		"size": 762097,
		"path": "../public/assets/particles/mustard-3.png"
	},
	"/assets/particles/mustard-4.png": {
		"type": "image/png",
		"etag": "\"bb31a-ZGVd+OpLZDbq14/MUSCp3BIV7tA\"",
		"mtime": "2026-11-17T10:36:44.546Z",
		"size": 766746,
		"path": "../public/assets/particles/mustard-4.png"
	},
	"/3d bottle1/bottle-geometry.json": {
		"type": "application/json",
		"etag": "\"6581f5-JATmhjg4z+MUWj9JJetOqQRkWXs\"",
		"mtime": "2026-11-17T07:07:01.726Z",
		"size": 6652405,
		"path": "../public/3d bottle1/bottle-geometry.json"
	},
	"/3d bottle1/high+poly.FBX": {
		"type": "application/vnd.autodesk.fbx",
		"etag": "\"71c050-OGLz2qkf8M7d/4J+K7rb200JYw0\"",
		"mtime": "2026-11-17T07:01:16.578Z",
		"size": 7454800,
		"path": "../public/3d bottle1/high+poly.FBX"
	},
	"/3d bottle2/Bottle_v1.x3d": {
		"type": "model/x3d+xml",
		"etag": "\"77c631-X4FBemq9Tzgr2peniBtxpbknhp0\"",
		"mtime": "2026-11-17T07:56:56.675Z",
		"size": 7849521,
		"path": "../public/3d bottle2/Bottle_v1.x3d"
	},
	"/3d bottle2/Bottle_v1.obj": {
		"type": "model/obj",
		"etag": "\"851b7a-bogwqS2332S2PJjwv7YesDOjqgo\"",
		"mtime": "2026-11-17T07:57:02.706Z",
		"size": 8723322,
		"path": "../public/3d bottle2/Bottle_v1.obj"
	},
	"/3d bottle2/Bottle_v1.blend": {
		"type": "application/x-blender",
		"etag": "\"9ac9a4-RQeLofr/W8m9EyjBbbtAl+eGyRE\"",
		"mtime": "2026-11-17T07:56:38.582Z",
		"size": 10144164,
		"path": "../public/3d bottle2/Bottle_v1.blend"
	},
	"/3d bottle1/high+poly.obj": {
		"type": "model/obj",
		"etag": "\"f550d7-0cVYLgE+IerQvIKNNNPIdQqAcZ8\"",
		"mtime": "2026-11-17T07:01:23.320Z",
		"size": 16077015,
		"path": "../public/3d bottle1/high+poly.obj"
	},
	"/3d bottle main/GLB/texture_0.png": {
		"type": "image/png",
		"etag": "\"f4e25e-MusJBGmkHP0LaoxeLzv3+8ECuCA\"",
		"mtime": "2026-11-17T08:21:03.772Z",
		"size": 16048734,
		"path": "../public/3d bottle main/GLB/texture_0.png"
	},
	"/3d bottle main/STL/model.stl": {
		"type": "model/stl",
		"etag": "\"e4a588-q/1aRJrRjFkFDlHoAoVEGa2Sfo4\"",
		"mtime": "2026-11-17T08:17:19.779Z",
		"size": 14984584,
		"path": "../public/3d bottle main/STL/model.stl"
	},
	"/3d bottle main/STL/texture_0.png": {
		"type": "image/png",
		"etag": "\"f4e25e-MusJBGmkHP0LaoxeLzv3+8ECuCA\"",
		"mtime": "2026-11-17T08:17:19.877Z",
		"size": 16048734,
		"path": "../public/3d bottle main/STL/texture_0.png"
	},
	"/3d bottle main/GLB/model.glb": {
		"type": "model/gltf-binary",
		"etag": "\"18f6cb4-aWqtt48bbmwk8TBc3/GoGOyVE3w\"",
		"mtime": "2026-11-17T08:21:03.686Z",
		"size": 26176692,
		"path": "../public/3d bottle main/GLB/model.glb"
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
