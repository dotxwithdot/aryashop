export default function AryaLoader({ label = "Loading", fullScreen = false, compact = false, className = "" }) {
  const dots = ["one", "two", "three"];
  const body = (
    <div className={`arya-loader ${compact ? "arya-loader-compact" : ""} ${className}`}>
      <div className="arya-loader-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="text-center">
        <p className="arya-loader-brand">AryaShop</p>
        <p className="arya-loader-label">
          {label}
          <span className="arya-loader-dots" aria-hidden="true">
            {dots.map((dot) => (
              <span key={dot}>.</span>
            ))}
          </span>
        </p>
      </div>
    </div>
  );

  if (fullScreen) {
    return <div className="grid min-h-screen place-items-center bg-[#f8f1e8] px-4 text-[#261f18]">{body}</div>;
  }

  return body;
}
