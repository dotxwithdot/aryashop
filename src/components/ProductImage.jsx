export default function ProductImage({ src, fallback, alt, className = "", ...props }) {
  function handleError(event) {
    if (!fallback || event.currentTarget.src === fallback) return;
    event.currentTarget.src = fallback;
  }

  return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" onError={handleError} {...props} />;
}
