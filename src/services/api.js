const API_URL = import.meta.env.VITE_API_URL || "/api";

export function buildImageFallback(product, variant = "Product") {
  const categoryName = typeof product.category === "string" ? product.category : product.category?.name || "Product";
  const label = encodeURIComponent(`${categoryName}\n${variant}`);
  return `https://placehold.co/900x1125/fff8e8/8a641f.png?text=${label}&font=montserrat`;
}

export function normalizeProduct(product) {
  const categoryName = typeof product.category === "string" ? product.category : product.category?.name || "";
  const images = product.images?.length ? product.images : [product.image].filter(Boolean);
  const fallbackImage = product.fallbackImage || buildImageFallback({ ...product, category: categoryName }, product.name);

  return {
    ...product,
    id: product.id,
    category: categoryName,
    categoryId: typeof product.category === "object" ? product.category.id : product.category,
    image: product.image || fallbackImage,
    fallbackImage,
    images,
    fallbackImages: product.fallbackImages?.length
      ? product.fallbackImages
      : images.map((_image, index) => buildImageFallback({ ...product, category: categoryName }, index === 0 ? "Front View" : `View ${index + 1}`)),
    shortDescription: product.shortDescription || product.description || "",
    longDescription: product.longDescription || product.shortDescription || "",
    highlights: product.highlights?.length ? product.highlights : [product.material, "Easy product inquiry"].filter(Boolean),
    shipping: product.shipping || "Ships in 3-6 working days.",
    badgeLabel: product.badgeLabel || "Best Seller",
    rating: product.rating || 4.5,
    reviews: product.reviews || 0,
    reviewSummary: product.reviewSummary || "Customers love the comfort, styling, and easy product support from AryaShop.",
    in_stock: product.in_stock !== undefined ? Boolean(product.in_stock) : true,
    discountPercent: Number(product.discountPercent || 0),
  };
}

async function request(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const isFormData = options.body instanceof FormData;
  if (!isFormData) headers.set("Content-Type", "application/json");

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });
  const payload = await response.json().catch(() => ({
    success: false,
    message: "Invalid server response",
  }));

  if (!response.ok || payload.success === false) {
    const error = new Error(payload.message || "Request failed");
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

export const api = {
  auth: {
    register: (body) => request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
    login: (body) => request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
    logout: () => request("/auth/logout", { method: "POST" }),
    me: () => request("/auth/me"),
  },
  dashboard: {
    stats: () => request("/admin/stats"),
  },
  categories: {
    list: (params = {}) => request(`/categories?${new URLSearchParams(params)}`),
    get: (idOrSlug) => request(`/categories/${idOrSlug}`),
    create: (body) => request("/categories", { method: "POST", body: body instanceof FormData ? body : JSON.stringify(body) }),
    update: (id, body) => request(`/categories/${id}`, { method: "PATCH", body: body instanceof FormData ? body : JSON.stringify(body) }),
    delete: (id) => request(`/categories/${id}`, { method: "DELETE" }),
  },
  products: {
    list: (params = {}) => request(`/products?${new URLSearchParams(params)}`),
    get: (idOrSlug) => request(`/products/${idOrSlug}`),
    create: (body) => request("/products", { method: "POST", body: body instanceof FormData ? body : JSON.stringify(body) }),
    update: (id, body) => request(`/products/${id}`, { method: "PATCH", body: body instanceof FormData ? body : JSON.stringify(body) }),
    delete: (id) => request(`/products/${id}`, { method: "DELETE" }),
  },
};
