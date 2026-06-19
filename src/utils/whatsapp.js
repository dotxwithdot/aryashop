export function whatsappLink(productName, productId) {
  const phoneNumber = "917737717195"; // Dummy number (replace with your real number)

  const text = `Hi, I am interested in ${productName} (Product ID: ${productId}). Please share more details.`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}