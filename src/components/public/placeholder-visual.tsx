type PlaceholderVisualProps = {
  className?: string;
  variant?: "hero" | "work" | "detail";
  slot?: string;
};

export function PlaceholderVisual({
  className,
  variant = "work",
  slot = "temporary-media",
}: PlaceholderVisualProps) {
  return (
    <div
      className={["placeholder-visual", `placeholder-visual--${variant}`, className]
        .filter(Boolean)
        .join(" ")}
      data-media-slot={slot}
      aria-hidden="true"
    >
      <span className="placeholder-visual__grid" />
      <span className="placeholder-visual__glow placeholder-visual__glow--a" />
      <span className="placeholder-visual__glow placeholder-visual__glow--b" />
      <span className="placeholder-visual__ring placeholder-visual__ring--a" />
      <span className="placeholder-visual__ring placeholder-visual__ring--b" />
      <span className="placeholder-visual__core">
        <span className="placeholder-visual__core-face" />
        <span className="placeholder-visual__core-edge" />
      </span>
      <span className="placeholder-visual__node placeholder-visual__node--a" />
      <span className="placeholder-visual__node placeholder-visual__node--b" />
      <span className="placeholder-visual__node placeholder-visual__node--c" />
    </div>
  );
}
