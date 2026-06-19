const WHATSAPP_PHONE = "919768012907";

function isMobileDevice() {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function whatsappLink(message) {
  const params = new URLSearchParams({
    phone: WHATSAPP_PHONE,
    text: message,
  });

  const baseUrl = isMobileDevice() ? "https://api.whatsapp.com/send" : "https://web.whatsapp.com/send";
  return `${baseUrl}?${params.toString()}`;
}

export function productInquiryLink(productName, productId, productPrice) {
  const message = [
    "Hi AryaShop, I want to ask about this product.",
    `Product ID: ${productId || ""}`,
    `Product Name: ${productName || ""}`,
    `Price: ${formatPrice(productPrice || 0)}`,
  ].join("\n");

  return whatsappLink(message);
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
