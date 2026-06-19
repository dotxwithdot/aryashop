export function productInquiryLink(productName, productId) {
  const params = new URLSearchParams({
    product: String(productId || ""),
    name: productName || "",
  });

  return `/contact?${params.toString()}`;
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
