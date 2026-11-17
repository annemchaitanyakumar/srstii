import { c as getProductBySlug } from "./_ssr/products-BZ1Gg1xG.mjs";
import { Wt as notFound, _ as lazyRouteComponent, v as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-C6_g5Pfl.js
var $$splitComponentImporter = () => import("./_slug-B0dFVa4k.mjs");
var Route = createFileRoute("/products/$slug")({
	loader: ({ params }) => {
		const product = getProductBySlug(params.slug);
		if (!product) throw notFound();
		return { product };
	},
	head: ({ loaderData }) => {
		const product = loaderData?.product;
		return { meta: [
			{ title: `${product?.name} — Wood-Pressed Liquid Heritage | SRSTI` },
			{
				name: "description",
				content: product?.tagline
			},
			{
				property: "og:title",
				content: `${product?.name} · ${product?.regionalName}`
			},
			{
				property: "og:description",
				content: product?.heroQuote
			},
			{
				property: "og:type",
				content: "product"
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
