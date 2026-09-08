type PlaceholderVisualProps = {
  className?: string;
};

export function PlaceholderVisual({ className }: PlaceholderVisualProps) {
  return (
    <div className={["placeholder-visual", className].filter(Boolean).join(" ")} aria-hidden="true">
      <span className="placeholder-visual__grid" />
      <span className="placeholder-visual__core" />
      <span className="placeholder-visual__node placeholder-visual__node--a" />
      <span className="placeholder-visual__node placeholder-visual__node--b" />
      <span className="placeholder-visual__node placeholder-visual__node--c" />
    </div>
  );
}
