// shopify.ts

const domain =
  process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN ||
  "npjasu-hr.myshopify.com";
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
  "76aafad82afc1334cc5d21c0a6a1c3ca";
const SHOPIFY_URL = `https://${domain}/api/2025-04/graphql.json`;

export async function fetchShopify(
  query: string,
  variables: Record<string, any> = {}
) {
  const res = await fetch(SHOPIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error("Shopify GraphQL errors:", json.errors);
    throw new Error("Error fetching from Shopify");
  }

  return json.data;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: Array<{
    id: string;
    src: string;
    altText: string;
  }>;
  variants: Array<{
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    compareAtPrice?: {
      amount: string;
      currencyCode: string;
    };
    availableForSale: boolean;
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
  }>;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  tags: string[];
  productType: string;
  vendor: string;
  availableForSale: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  description: string;
  handle: string;
  image?: {
    id: string;
    src: string;
    altText: string;
  };
  products: ShopifyProduct[];
}

export interface ShopifyCart {
  id: string;
  webUrl: string;
  lineItems: Array<{
    id: string;
    quantity: number;
    title: string;
    variant: {
      id: string;
      title: string;
      price: {
        amount: string;
        currencyCode: string;
      };
      image?: {
        src: string;
        altText: string;
      };
    };
  }>;
  subtotalPrice: {
    amount: string;
    currencyCode: string;
  };
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  totalTax: {
    amount: string;
    currencyCode: string;
  };
}

class ShopifyService {
  private isConfigured: boolean;

  constructor() {
    this.isConfigured = !!(
      process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN &&
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
    );
  }

  isShopifyConfigured(): boolean {
    return this.isConfigured;
  }

  /** Fetch all products (fallback empty array if unconfigured) */
  async getAllProducts(first: number = 20): Promise<ShopifyProduct[]> {
    if (!this.isConfigured) {
      console.warn("Shopify not configured, returning [].");
      return [];
    }

    const query = `
      query getProducts($first: Int!) {
        products(first: $first) {
          edges {
            node {
              id
              title
              description
              handle
              images(first: 5) {
                edges {
                  node {
                    id
                    src: url
                    altText
                  }
                }
              }
              variants(first: 5) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    availableForSale
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              tags
              productType
              vendor
              availableForSale
              createdAt
              updatedAt
            }
          }
        }
      }
    `;

    try {
      const data = await fetchShopify(query, { first });
      return data.products.edges.map((edge: any) =>
        this.transformProduct(edge.node)
      );
    } catch (e) {
      console.error("Error in getAllProducts:", e);
      return [];
    }
  }

  /** Fetch a single collection (by handle) and its products */
  async getProductsByCollection(
    handle: string,
    first: number = 50
  ): Promise<ShopifyCollection> {
    if (!this.isConfigured) {
      console.warn("Shopify not configured, returning empty collection.");
      return { id: "", title: "", description: "", handle, products: [] };
    }

    const query = `
      query getCollection($handle: String!, $first: Int!) {
        collectionByHandle(handle: $handle) {
          id
          title
          description
          handle
          image {
            id
            src: url
            altText
          }
          products(first: $first) {
            edges {
              node {
                id
                title
                description
                handle
                images(first: 5) {
                  edges {
                    node {
                      id
                      src: url
                      altText
                    }
                  }
                }
                variants(first: 5) {
                  edges {
                    node {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                      availableForSale
                      selectedOptions {
                        name
                        value
                      }
                    }
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                }
                tags
                productType
                vendor
                availableForSale
                createdAt
                updatedAt
              }
            }
          }
        }
      }
    `;

    try {
      const data = await fetchShopify(query, { handle, first });
      const col = data.collectionByHandle;
      if (!col) {
        console.warn(`Collection handle "${handle}" not found.`);
        return { id: "", title: "", description: "", handle, products: [] };
      }
      return {
        id: col.id,
        title: col.title,
        description: col.description,
        handle: col.handle,
        image: col.image
          ? {
              id: col.image.id,
              src: col.image.src,
              altText: col.image.altText,
            }
          : undefined,
        products: col.products.edges.map((e: any) =>
          this.transformProduct(e.node)
        ),
      };
    } catch (e) {
      console.error("Error in getProductsByCollection:", e);
      return { id: "", title: "", description: "", handle, products: [] };
    }
  }

  /** Create a new cart */
  async createCart(): Promise<ShopifyCart> {
    if (!this.isConfigured) {
      throw new Error("Shopify not configured.");
    }
    const mutation = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
            lines(first: 250) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      price { amount currencyCode }
                      image { url altText }
                      product { title }
                    }
                  }
                }
              }
            }
            cost {
              subtotalAmount { amount currencyCode }
              totalAmount { amount currencyCode }
              totalTaxAmount { amount currencyCode }
            }
          }
          userErrors { field message }
        }
      }
    `;
    try {
      const data = await fetchShopify(mutation, { input: { lines: [] } });
      const errs = data.cartCreate.userErrors;
      if (errs.length) {
        throw new Error(`Cart errors: ${JSON.stringify(errs)}`);
      }
      return this.transformCart(data.cartCreate.cart);
    } catch (e) {
      console.error("Error creating cart:", e);
      throw new Error("Failed to create cart.");
    }
  }

  /** Add items to existing cart */
  async addLinesToCart(
    cartId: string,
    lines: Array<{ variantId: string; quantity: number }>
  ): Promise<ShopifyCart> {
    if (!this.isConfigured) {
      throw new Error("Shopify not configured.");
    }
    const mutation = `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ...CartFields }
          userErrors { field message }
        }
      }
      fragment CartFields on Cart {
        id
        checkoutUrl
        lines(first:250) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  image { url altText }
                  product { title }
                }
              }
            }
          }
        }
        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
          totalTaxAmount { amount currencyCode }
        }
      }
    `;
    const vars = {
      cartId,
      lines: lines.map((l) => ({
        merchandiseId: l.variantId,
        quantity: l.quantity,
      })),
    };
    try {
      const data = await fetchShopify(mutation, vars);
      const errs = data.cartLinesAdd.userErrors;
      if (errs.length) {
        throw new Error(`Add lines errors: ${JSON.stringify(errs)}`);
      }
      return this.transformCart(data.cartLinesAdd.cart);
    } catch (e) {
      console.error("Error adding lines:", e);
      throw new Error("Failed to add items.");
    }
  }

  /** Update quantities in cart */
  async updateLinesInCart(
    cartId: string,
    lines: Array<{ id: string; quantity: number }>
  ): Promise<ShopifyCart> {
    if (!this.isConfigured) {
      throw new Error("Shopify not configured.");
    }
    const mutation = `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ...CartFields }
          userErrors { field message }
        }
      }
      fragment CartFields on Cart {
        id
        checkoutUrl
        lines(first:250) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  image { url altText }
                  product { title }
                }
              }
            }
          }
        }
        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
          totalTaxAmount { amount currencyCode }
        }
      }
    `;
    try {
      const data = await fetchShopify(mutation, { cartId, lines });
      const errs = data.cartLinesUpdate.userErrors;
      if (errs.length) {
        throw new Error(`Update lines errors: ${JSON.stringify(errs)}`);
      }
      return this.transformCart(data.cartLinesUpdate.cart);
    } catch (e) {
      console.error("Error updating lines:", e);
      throw new Error("Failed to update cart.");
    }
  }

  /** Remove items from cart */
  async removeLinesFromCart(
    cartId: string,
    lineIds: string[]
  ): Promise<ShopifyCart> {
    if (!this.isConfigured) {
      throw new Error("Shopify not configured.");
    }
    const mutation = `
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ...CartFields }
          userErrors { field message }
        }
      }
      fragment CartFields on Cart {
        id
        checkoutUrl
        lines(first:250) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  image { url altText }
                  product { title }
                }
              }
            }
          }
        }
        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
          totalTaxAmount { amount currencyCode }
        }
      }
    `;
    try {
      const data = await fetchShopify(mutation, { cartId, lineIds });
      const errs = data.cartLinesRemove.userErrors;
      if (errs.length) {
        throw new Error(`Remove lines errors: ${JSON.stringify(errs)}`);
      }
      return this.transformCart(data.cartLinesRemove.cart);
    } catch (e) {
      console.error("Error removing lines:", e);
      throw new Error("Failed to remove items.");
    }
  }

  /** Retrieve cart by ID */
  async getCart(cartId: string): Promise<ShopifyCart> {
    if (!this.isConfigured) {
      throw new Error("Shopify not configured.");
    }
    const query = `
      query getCart($id: ID!) {
        cart(id: $id) {
          id
          checkoutUrl
          lines(first:250) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price { amount currencyCode }
                    image { url altText }
                    product { title }
                  }
                }
              }
            }
          }
          cost {
            subtotalAmount { amount currencyCode }
            totalAmount { amount currencyCode }
            totalTaxAmount { amount currencyCode }
          }
        }
      }
    `;
    try {
      const data = await fetchShopify(query, { id: cartId });
      return this.transformCart(data.cart);
    } catch (e) {
      console.error("Error fetching cart:", e);
      throw new Error("Failed to fetch cart.");
    }
  }

  /** Internal: map raw product to ShopifyProduct */
  private transformProduct(node: any): ShopifyProduct {
    return {
      id: node.id,
      title: node.title,
      description: node.description,
      handle: node.handle,
      images: node.images.edges.map((e: any) => ({
        id: e.node.id,
        src: e.node.src,
        altText: e.node.altText || "",
      })),
      variants: node.variants.edges.map((e: any) => ({
        id: e.node.id,
        title: e.node.title,
        price: {
          amount: e.node.price.amount,
          currencyCode: e.node.price.currencyCode,
        },
        compareAtPrice: e.node.compareAtPrice
          ? {
              amount: e.node.compareAtPrice.amount,
              currencyCode: e.node.compareAtPrice.currencyCode,
            }
          : undefined,
        availableForSale: e.node.availableForSale,
        selectedOptions: e.node.selectedOptions.map((o: any) => ({
          name: o.name,
          value: o.value,
        })),
      })),
      priceRange: {
        minVariantPrice: {
          amount: node.priceRange.minVariantPrice.amount,
          currencyCode: node.priceRange.minVariantPrice.currencyCode,
        },
        maxVariantPrice: {
          amount: node.priceRange.maxVariantPrice.amount,
          currencyCode: node.priceRange.maxVariantPrice.currencyCode,
        },
      },
      tags: node.tags,
      productType: node.productType,
      vendor: node.vendor,
      availableForSale: node.availableForSale,
      createdAt: node.createdAt,
      updatedAt: node.updatedAt,
    };
  }

  /** Internal: map raw cart to ShopifyCart */
  private transformCart(cart: any): ShopifyCart {
    return {
      id: cart.id,
      webUrl: cart.checkoutUrl,
      lineItems: cart.lines.edges.map((e: any) => ({
        id: e.node.id,
        quantity: e.node.quantity,
        title: e.node.merchandise.product.title,
        variant: {
          id: e.node.merchandise.id,
          title: e.node.merchandise.title,
          price: {
            amount: e.node.merchandise.price.amount,
            currencyCode: e.node.merchandise.price.currencyCode,
          },
          image: e.node.merchandise.image
            ? {
                src: e.node.merchandise.image.url,
                altText: e.node.merchandise.image.altText,
              }
            : undefined,
        },
      })),
      subtotalPrice: {
        amount: cart.cost.subtotalAmount.amount,
        currencyCode: cart.cost.subtotalAmount.currencyCode,
      },
      totalPrice: {
        amount: cart.cost.totalAmount.amount,
        currencyCode: cart.cost.totalAmount.currencyCode,
      },
      totalTax: {
        amount: cart.cost.totalTaxAmount.amount,
        currencyCode: cart.cost.totalTaxAmount.currencyCode,
      },
    };
  }

  /** Format a price in CLP for display */
  formatPrice(amount: string, currencyCode: string = "CLP"): string {
    const value = parseFloat(amount);
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }
}

export const shopifyService = new ShopifyService();
