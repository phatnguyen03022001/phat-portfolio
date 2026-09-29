import Image from "next/image";
import { PlaceholderVisual } from "./placeholder-visual";

export type MediaAsset =
  | {
      type: "image";
      src: string;
      alt: string;
      priority?: boolean;
      fit?: "cover" | "contain";
    }
  | {
      type: "video";
      src: string;
      poster?: string;
      ariaLabel?: string;
      fit?: "cover" | "contain";
    };

export type MediaSurfaceVariant =
  | "hero"
  | "work"
  | "detail"
  | "wide"
  | "knowledge"
  | "agentic"
  | "identity"
  | "architecture";

export type MediaSurfaceProps = {
  slot: string;
  variant?: MediaSurfaceVariant;
  asset?: MediaAsset | null;
  caption?: string;
  isEvidence?: boolean;
  className?: string;
};

export function MediaSurface({
  slot,
  variant = "work",
  asset = null,
  caption,
  isEvidence = false,
  className,
}: MediaSurfaceProps) {
  const isDecorative = !isEvidence && !asset;
  const mediaKind = isEvidence && asset ? "evidence" : "decorative";

  return (
    <figure
      className={["media-frame", `media-frame--${variant}`, className].filter(Boolean).join(" ")}
      data-media-slot={slot}
      data-media-kind={mediaKind}
      aria-hidden={isDecorative && !caption ? "true" : undefined}
    >
      <div className="media-frame__viewport">
        {asset?.type === "image" ? (
          <>
            <Image
              src={asset.src}
              alt={asset.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={asset.priority}
              loading={asset.priority ? "eager" : "lazy"}
              className={`media-asset media-asset--${asset.fit ?? "cover"}`}
            />
            <div className="media-frame__overlay" aria-hidden="true" />
          </>
        ) : asset?.type === "video" ? (
          <>
            <video
              src={asset.src}
              poster={asset.poster}
              aria-label={asset.ariaLabel ?? caption ?? "Video content"}
              autoPlay
              playsInline
              loop
              muted
              preload="metadata"
              className={`media-asset media-asset--${asset.fit ?? "cover"}`}
            >
              Your browser does not support the video tag.
            </video>
            <div className="media-frame__overlay" aria-hidden="true" />
          </>
        ) : (
          <PlaceholderVisual
            variant={variant}
            slot={slot}
            className="media-frame__placeholder"
          />
        )}
      </div>

      {caption ? (
        <figcaption className="media-frame__caption">
          {isEvidence ? (
            <span className="media-frame__badge media-frame__badge--evidence">Evidence Artifact</span>
          ) : (
            <span className="media-frame__badge media-frame__badge--decorative">
              Illustrative Reference
            </span>
          )}
          <span className="media-frame__caption-text">{caption}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
