import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection("wix");

    const body = await req.json().catch(() => ({}));
    const { productId, slug } = body;

    // Validate inputs to prevent path traversal
    if (productId !== undefined && !/^[a-zA-Z0-9_-]{1,64}$/.test(productId)) {
      return Response.json({ error: "Invalid productId" }, { status: 400 });
    }
    if (slug !== undefined && !/^[a-zA-Z0-9_-]{1,128}$/.test(slug)) {
      return Response.json({ error: "Invalid slug" }, { status: 400 });
    }

    // Single product by ID
    if (productId) {
      const resp = await fetch(`https://www.wixapis.com/stores/v3/products/${encodeURIComponent(productId)}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) throw new Error(await resp.text());
      const data = await resp.json();
      return Response.json({ product: data.product });
    }

    // Single product by slug
    if (slug) {
      const resp = await fetch(`https://www.wixapis.com/stores/v3/products/slugs/${encodeURIComponent(slug)}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) throw new Error(await resp.text());
      const data = await resp.json();
      return Response.json({ product: data.product });
    }

    // List all visible products
    const resp = await fetch("https://www.wixapis.com/stores/v3/products/query", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: ["MEDIA_ITEMS_INFO", "CURRENCY", "PLAIN_DESCRIPTION", "DESCRIPTION", "DIRECT_CATEGORIES_INFO", "URL"],
        query: {
          filter: { visible: { $eq: true } },
          sort: [{ field_name: "createdDate", order: "ASC" }],
          paging: { limit: 100 },
        },
      }),
    });

    if (!resp.ok) throw new Error(await resp.text());
    const data = await resp.json();
    return Response.json({ products: data.products || [] });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}