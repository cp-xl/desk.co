import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const FIELDS = [
  "MEDIA_ITEMS_INFO",
  "CURRENCY",
  "PLAIN_DESCRIPTION",
  "DESCRIPTION",
  "DIRECT_CATEGORIES_INFO",
  "URL",
];

// Wix returns only category ids on products, so names come from the categories API.
async function fetchCategoryNames(accessToken: string) {
  const resp = await fetch("https://www.wixapis.com/categories/v1/categories/query", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: { paging: { limit: 100 } }, treeReference: { appNamespace: "@wix/stores" } }),
  });
  if (!resp.ok) return {};
  const data = await resp.json();
  const map: Record<string, string> = {};
  for (const c of data.categories || []) map[c.id] = c.name;
  return map;
}

function withCategoryNames(products: any[], names: Record<string, string>) {
  return products.map((p) => ({
    ...p,
    categoryNames: (p.directCategoriesInfo?.categories || [])
      .map((c: any) => names[c.id])
      .filter(Boolean),
    mainCategoryName: names[p.mainCategoryId] || null,
  }));
}

async function queryProducts(accessToken: string, filter: Record<string, unknown>, limit: number) {
  const resp = await fetch("https://www.wixapis.com/stores/v3/products/query", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: FIELDS,
      query: {
        filter,
        sort: [{ field_name: "createdDate", order: "DESC" }],
        paging: { limit },
      },
    }),
  });
  if (!resp.ok) throw new Error(`Wix query failed (${resp.status}): ${await resp.text()}`);
  const data = await resp.json();
  return data.products || [];
}

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection("wix");

    const body = await req.json().catch(() => ({}));
    const { productId, slug } = body;

    // Validate inputs before they reach the outbound request
    if (productId !== undefined && !/^[a-zA-Z0-9_-]{1,64}$/.test(productId)) {
      return Response.json({ error: "Invalid productId" }, { status: 400 });
    }
    if (slug !== undefined && !/^[a-zA-Z0-9_-]{1,128}$/.test(slug)) {
      return Response.json({ error: "Invalid slug" }, { status: 400 });
    }

    if (productId || slug) {
      const filter = productId
        ? { id: { $eq: productId }, visible: { $eq: true } }
        : { slug: { $eq: slug }, visible: { $eq: true } };
      const products = await queryProducts(accessToken, filter, 1);
      const names = await fetchCategoryNames(accessToken);
      return Response.json({ product: withCategoryNames(products, names)[0] || null });
    }

    const products = await queryProducts(accessToken, { visible: { $eq: true } }, 100);
    const names = await fetchCategoryNames(accessToken);
    return Response.json({ products: withCategoryNames(products, names) });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}