const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "npjasu-hr.myshopify.com";
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "76aafad82afc1334cc5d21c0a6a1c3ca";

const SHOPIFY_URL = `https://${domain}/api/2024-04/graphql.json`;

export async function fetchShopify(query: string) {
  const res = await fetch(SHOPIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
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
    // Check if Shopify environment variables are properly configured
    this.isConfigured = !!(
      process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN && 
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
    );
  }

  // Get all products using GraphQL
  async getAllProducts(first: number = 20): Promise<ShopifyProduct[]> {
    if (!this.isConfigured) {
      console.warn('Shopify is not configured. Returning empty products array.');
      return [];
    }

    try {
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
                      url
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

      const data = await fetchShopify(query);
      return data.products.edges.map((edge: any) => this.transformProduct(edge.node));
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  // Create cart using GraphQL
  async createCart(): Promise<ShopifyCart> {
    if (!this.isConfigured) {
      throw new Error('Shopify is not configured. Cannot create cart.');
    }

    try {
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
                        price {
                          amount
                          currencyCode
                        }
                        image {
                          url
                          altText
                        }
                        product {
                          title
                        }
                      }
                    }
                  }
                }
              }
              cost {
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                  amount
                  currencyCode
                }
              }
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const variables = {
        input: {
          lines: []
        }
      };

      const response = await fetch(SHOPIFY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        },
        body: JSON.stringify({ 
          query: mutation,
          variables 
        }),
      });

      const json = await response.json();
      
      if (json.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
      }

      if (json.data.cartCreate.userErrors.length > 0) {
        throw new Error(`Cart errors: ${JSON.stringify(json.data.cartCreate.userErrors)}`);
      }

      return this.transformCart(json.data.cartCreate.cart);
    } catch (error) {
      console.error('Error creating cart:', error);
      throw new Error('Failed to create cart. Please try again.');
    }
  }

  // Add line items to cart
  async addLinesToCart(cartId: string, lineItemsToAdd: Array<{
    variantId: string;
    quantity: number;
  }>): Promise<ShopifyCart> {
    if (!this.isConfigured) {
      throw new Error('Shopify is not configured. Cannot add items to cart.');
    }

    try {
      const mutation = `
        mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
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
                        price {
                          amount
                          currencyCode
                        }
                        image {
                          url
                          altText
                        }
                        product {
                          title
                        }
                      }
                    }
                  }
                }
              }
              cost {
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                  amount
                  currencyCode
                }
              }
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const variables = {
        cartId,
        lines: lineItemsToAdd.map(item => ({
          merchandiseId: item.variantId,
          quantity: item.quantity
        }))
      };

      const response = await fetch(SHOPIFY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        },
        body: JSON.stringify({ 
          query: mutation,
          variables 
        }),
      });

      const json = await response.json();
      
      if (json.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
      }

      if (json.data.cartLinesAdd.userErrors.length > 0) {
        throw new Error(`Cart errors: ${JSON.stringify(json.data.cartLinesAdd.userErrors)}`);
      }

      return this.transformCart(json.data.cartLinesAdd.cart);
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw new Error('Failed to add item to cart. Please try again.');
    }
  }

  // Update line items in cart
  async updateLinesInCart(cartId: string, lineItemsToUpdate: Array<{
    id: string;
    quantity: number;
  }>): Promise<ShopifyCart> {
    if (!this.isConfigured) {
      throw new Error('Shopify is not configured. Cannot update cart.');
    }

    try {
      const mutation = `
        mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
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
                        price {
                          amount
                          currencyCode
                        }
                        image {
                          url
                          altText
                        }
                        product {
                          title
                        }
                      }
                    }
                  }
                }
              }
              cost {
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                  amount
                  currencyCode
                }
              }
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const variables = {
        cartId,
        lines: lineItemsToUpdate
      };

      const response = await fetch(SHOPIFY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        },
        body: JSON.stringify({ 
          query: mutation,
          variables 
        }),
      });

      const json = await response.json();
      
      if (json.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
      }

      if (json.data.cartLinesUpdate.userErrors.length > 0) {
        throw new Error(`Cart errors: ${JSON.stringify(json.data.cartLinesUpdate.userErrors)}`);
      }

      return this.transformCart(json.data.cartLinesUpdate.cart);
    } catch (error) {
      console.error('Error updating cart:', error);
      throw new Error('Failed to update cart. Please try again.');
    }
  }

  // Remove line items from cart
  async removeLinesFromCart(cartId: string, lineItemIds: string[]): Promise<ShopifyCart> {
    if (!this.isConfigured) {
      throw new Error('Shopify is not configured. Cannot remove items from cart.');
    }

    try {
      const mutation = `
        mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
          cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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
                        price {
                          amount
                          currencyCode
                        }
                        image {
                          url
                          altText
                        }
                        product {
                          title
                        }
                      }
                    }
                  }
                }
              }
              cost {
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                  amount
                  currencyCode
                }
              }
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const variables = {
        cartId,
        lineIds: lineItemIds
      };

      const response = await fetch(SHOPIFY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        },
        body: JSON.stringify({ 
          query: mutation,
          variables 
        }),
      });

      const json = await response.json();
      
      if (json.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
      }

      if (json.data.cartLinesRemove.userErrors.length > 0) {
        throw new Error(`Cart errors: ${JSON.stringify(json.data.cartLinesRemove.userErrors)}`);
      }

      return this.transformCart(json.data.cartLinesRemove.cart);
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw new Error('Failed to remove item from cart. Please try again.');
    }
  }

  // Get cart by ID
  async getCart(cartId: string): Promise<ShopifyCart> {
    if (!this.isConfigured) {
      throw new Error('Shopify is not configured. Cannot fetch cart.');
    }

    try {
      const query = `
        query getCart($id: ID!) {
          cart(id: $id) {
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
                      price {
                        amount
                        currencyCode
                      }
                      image {
                        url
                        altText
                      }
                      product {
                        title
                      }
                    }
                  }
                }
              }
            }
            cost {
              subtotalAmount {
                amount
                currencyCode
              }
              totalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
            }
          }
        }
      `;

      const variables = { id: cartId };

      const response = await fetch(SHOPIFY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        },
        body: JSON.stringify({ 
          query,
          variables 
        }),
      });

      const json = await response.json();
      
      if (json.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
      }

      return this.transformCart(json.data.cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw new Error('Failed to fetch cart. Please try again.');
    }
  }

  // Check if Shopify is configured
  isShopifyConfigured(): boolean {
    return this.isConfigured;
  }

  // Transform GraphQL product to our interface
  private transformProduct(product: any): ShopifyProduct {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      handle: product.handle,
      images: product.images.edges.map((edge: any) => ({
        id: edge.node.id,
        src: edge.node.url,
        altText: edge.node.altText || product.title,
      })),
      variants: product.variants.edges.map((edge: any) => ({
        id: edge.node.id,
        title: edge.node.title,
        price: {
          amount: edge.node.price.amount,
          currencyCode: edge.node.price.currencyCode,
        },
        compareAtPrice: edge.node.compareAtPrice ? {
          amount: edge.node.compareAtPrice.amount,
          currencyCode: edge.node.compareAtPrice.currencyCode,
        } : undefined,
        availableForSale: edge.node.availableForSale,
        selectedOptions: edge.node.selectedOptions.map((option: any) => ({
          name: option.name,
          value: option.value,
        })),
      })),
      priceRange: {
        minVariantPrice: {
          amount: product.priceRange.minVariantPrice.amount,
          currencyCode: product.priceRange.minVariantPrice.currencyCode,
        },
        maxVariantPrice: {
          amount: product.priceRange.maxVariantPrice.amount,
          currencyCode: product.priceRange.maxVariantPrice.currencyCode,
        },
      },
      tags: product.tags,
      productType: product.productType,
      vendor: product.vendor,
      availableForSale: product.availableForSale,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  // Transform GraphQL cart to our interface
  private transformCart(cart: any): ShopifyCart {
    return {
      id: cart.id,
      webUrl: cart.checkoutUrl,
      lineItems: cart.lines.edges.map((edge: any) => ({
        id: edge.node.id,
        quantity: edge.node.quantity,
        title: edge.node.merchandise.product.title,
        variant: {
          id: edge.node.merchandise.id,
          title: edge.node.merchandise.title,
          price: {
            amount: edge.node.merchandise.price.amount,
            currencyCode: edge.node.merchandise.price.currencyCode,
          },
          image: edge.node.merchandise.image ? {
            src: edge.node.merchandise.image.url,
            altText: edge.node.merchandise.image.altText,
          } : undefined,
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
        amount: cart.cost.totalTaxAmount?.amount || '0',
        currencyCode: cart.cost.totalTaxAmount?.currencyCode || 'COP',
      },
    };
  }

  // Format price for display
  formatPrice(amount: string, currencyCode: string = 'COP'): string {
    const price = parseFloat(amount);
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }
}

export const shopifyService = new ShopifyService();