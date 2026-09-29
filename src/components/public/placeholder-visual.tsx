import type { MediaSurfaceVariant } from "./media-surface";

export type PlaceholderVisualVariant =
  | "hero"
  | "knowledge"
  | "agentic"
  | "identity"
  | "architecture"
  | "work"
  | "detail"
  | "wide";

type PlaceholderVisualProps = {
  className?: string;
  variant?: MediaSurfaceVariant;
  slot?: string;
};

function resolveVariant(
  variant: MediaSurfaceVariant | undefined,
  slot: string
): "hero" | "knowledge" | "agentic" | "identity" | "architecture" | "work" | "detail" {
  if (
    variant === "hero" ||
    variant === "knowledge" ||
    variant === "agentic" ||
    variant === "identity" ||
    variant === "architecture"
  ) {
    return variant;
  }
  const s = slot.toLowerCase();
  if (s.includes("hero")) return "hero";
  if (s.includes("ielts") || s.includes("knowledge")) return "knowledge";
  if (s.includes("agentic") || s.includes("governed")) return "agentic";
  if (s.includes("about") || s.includes("identity")) return "identity";
  if (s.includes("arch")) return "architecture";
  if (variant === "wide") return "architecture";
  return variant === "detail" ? "detail" : "work";
}

export function PlaceholderVisual({
  className,
  variant,
  slot = "temporary-media",
}: PlaceholderVisualProps) {
  const activeVariant = resolveVariant(variant, slot);

  return (
    <div
      className={["placeholder-visual", `placeholder-visual--${activeVariant}`, className]
        .filter(Boolean)
        .join(" ")}
      data-media-slot={slot}
      data-resolved-variant={activeVariant}
      aria-hidden="true"
    >
      <span className="placeholder-visual__background-grid" />
      <span className="placeholder-visual__ambient-glow" />

      {activeVariant === "knowledge" && (
        <>
          <div className="pv-meta-bar pv-meta-bar--amber">
            <span className="pv-meta-tag">TAXONOMY_INDEX // CORPUS_ENGINE</span>
            <span className="pv-meta-id">SYS_L2:0x4E9A</span>
          </div>
          <div className="pv-knowledge">
            <div className="pv-knowledge__strata">
              <div className="pv-stratum pv-stratum--1">
                <span className="pv-token">LEXICAL_STRATA</span>
                <span className="pv-token-bar pv-token-bar--wide" />
                <span className="pv-token-pill">LEMMA</span>
              </div>
              <div className="pv-stratum pv-stratum--2">
                <span className="pv-token">SYNTAX_GRAPH</span>
                <span className="pv-token-bar pv-token-bar--mid" />
                <span className="pv-token-pill">PARSE_TREE</span>
              </div>
              <div className="pv-stratum pv-stratum--3">
                <span className="pv-token">COL_EVALUATION</span>
                <span className="pv-token-bar pv-token-bar--narrow" />
                <span className="pv-token-pill">ALIGN</span>
              </div>
            </div>
            <div className="pv-knowledge__grid">
              <span className="pv-cell pv-cell--active" />
              <span className="pv-cell" />
              <span className="pv-cell" />
              <span className="pv-cell pv-cell--active" />
              <span className="pv-cell" />
              <span className="pv-cell pv-cell--active" />
            </div>
          </div>
        </>
      )}

      {activeVariant === "agentic" && (
        <>
          <div className="pv-meta-bar pv-meta-bar--cyan">
            <span className="pv-meta-tag">CONTROL_PLANE // GOVERNANCE_VECT</span>
            <span className="pv-meta-id">STATUS: STRICT_BOUND</span>
          </div>
          <div className="pv-agentic">
            <div className="pv-agentic__graph">
              <div className="pv-graph-node pv-graph-node--root">
                <span className="pv-node-dot pv-node-dot--active" />
                <span className="pv-node-label">GATE_VERIFY</span>
              </div>
              <div className="pv-graph-conduit pv-graph-conduit--v" />
              <div className="pv-graph-node pv-graph-node--core">
                <span className="pv-node-dot" />
                <span className="pv-node-label">ORCHESTRATOR</span>
              </div>
              <div className="pv-graph-conduits-split">
                <span className="pv-graph-branch" />
                <span className="pv-graph-branch" />
              </div>
              <div className="pv-graph-cluster">
                <div className="pv-graph-node pv-graph-node--leaf">
                  <span className="pv-node-dot" />
                  <span className="pv-node-label">POLICY_GUARD</span>
                </div>
                <div className="pv-graph-node pv-graph-node--leaf">
                  <span className="pv-node-dot pv-node-dot--active" />
                  <span className="pv-node-label">STATE_STORE</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeVariant === "hero" && (
        <>
          <div className="pv-hero__corner pv-hero__corner--tl" />
          <div className="pv-hero__corner pv-hero__corner--tr" />
          <div className="pv-hero__corner pv-hero__corner--bl" />
          <div className="pv-hero__corner pv-hero__corner--br" />
          <div className="pv-meta-bar">
            <span className="pv-meta-tag">CALIBRATION_DATUM // LATENCY 0.12ms</span>
            <span className="pv-meta-id">21.02.40N / 105.85.38E</span>
          </div>
          <div className="pv-hero">
            <div className="pv-reticle">
              <span className="pv-reticle__ring pv-reticle__ring--outer" />
              <span className="pv-reticle__ring pv-reticle__ring--inner" />
              <span className="pv-reticle__axis-h" />
              <span className="pv-reticle__axis-v" />
              <div className="pv-monolith">
                <span className="pv-monolith__face" />
                <span className="pv-monolith__edge" />
                <span className="pv-monolith__core" />
              </div>
            </div>
          </div>
        </>
      )}

      {activeVariant === "identity" && (
        <>
          <div className="pv-meta-bar">
            <span className="pv-meta-tag">CALIBRATION_PRISM // REFERENCE_SYSTEM</span>
            <span className="pv-meta-id">DATUM: VERIFIED</span>
          </div>
          <div className="pv-identity">
            <div className="pv-identity__compass">
              <span className="pv-compass__tick pv-compass__tick--0" />
              <span className="pv-compass__tick pv-compass__tick--90" />
              <span className="pv-compass__tick pv-compass__tick--180" />
              <span className="pv-compass__tick pv-compass__tick--270" />
              <div className="pv-prism">
                <span className="pv-prism__facet pv-prism__facet--a" />
                <span className="pv-prism__facet pv-prism__facet--b" />
              </div>
            </div>
          </div>
        </>
      )}

      {activeVariant === "architecture" && (
        <>
          <div className="pv-meta-bar">
            <span className="pv-meta-tag">ARCHITECTURE_SPEC // SYSTEM_BOUNDARY</span>
            <span className="pv-meta-id">ISOLATION: STRICT</span>
          </div>
          <div className="pv-architecture">
            <div className="pv-pipeline">
              <div className="pv-pipe-stage">
                <span className="pv-pipe-badge">STAGE 01</span>
                <span className="pv-pipe-title">INGEST & VERIFY</span>
              </div>
              <div className="pv-pipe-conduit" />
              <div className="pv-pipe-stage pv-pipe-stage--active">
                <span className="pv-pipe-badge">STAGE 02</span>
                <span className="pv-pipe-title">CORE EXECUTION</span>
              </div>
              <div className="pv-pipe-conduit" />
              <div className="pv-pipe-stage">
                <span className="pv-pipe-badge">STAGE 03</span>
                <span className="pv-pipe-title">EVIDENCE LEDGER</span>
              </div>
            </div>
          </div>
        </>
      )}

      {(activeVariant === "work" || activeVariant === "detail") && (
        <div className="pv-default">
          <span className="placeholder-visual__ring placeholder-visual__ring--a" />
          <span className="placeholder-visual__ring placeholder-visual__ring--b" />
          <div className="placeholder-visual__core">
            <span className="placeholder-visual__core-face" />
            <span className="placeholder-visual__core-edge" />
          </div>
        </div>
      )}
    </div>
  );
}
