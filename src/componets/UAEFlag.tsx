export default function UAEFlag({ className = "" }: { className?: string }) {
  return (
    <svg
      width="26"
      height="17"
      viewBox="0 0 26 17"
      className={`inline-block align-middle rounded-sm shadow-sm ${className}`}
      aria-label="UAE Flag"
    >
      {/* White middle band (full background) */}
      <rect width="26" height="17" fill="#FFFFFF" />
      {/* Green top band */}
      <rect width="26" height="5.67" fill="#00732F" />
      {/* Black bottom band */}
      <rect y="11.33" width="26" height="5.67" fill="#000000" />
      {/* Red vertical stripe (hoist side) */}
      <rect width="8" height="17" fill="#FF0000" />
    </svg>
  );
}
