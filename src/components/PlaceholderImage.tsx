import Image from "next/image";

const GRADIENTS = [
  "linear-gradient(135deg, #dcdcd6 0%, #b8b8b0 100%)",
  "linear-gradient(135deg, #d6d2c4 0%, #a8a190 100%)",
  "linear-gradient(135deg, #cfd3d0 0%, #9ea6a0 100%)",
  "linear-gradient(135deg, #d9d0c8 0%, #b3a596 100%)",
  "linear-gradient(135deg, #d2d6da 0%, #a3aab2 100%)",
  "linear-gradient(135deg, #dad4cc 0%, #b6ab9c 100%)",
];

type PlaceholderImageProps = {
  tone: number;
  label?: string;
  className?: string;
  src?: string;
  /** Optional looping preview clip. Rendered over the cover image, which stays in the DOM as a
   *  poster/fallback (shown until the video can play, and instead of it under reduced motion). */
  video?: string;
  /** Optional — set together with `video` when the clip isn't square (e.g. a real screen
   *  recording). Instead of cropping the video to fill, it's shown at its own aspect ratio,
   *  inset with a shadow over this background image. */
  videoBackground?: string;
};

export default function PlaceholderImage({
  tone,
  label,
  className,
  src,
  video,
  videoBackground,
}: PlaceholderImageProps) {
  if (video && videoBackground) {
    return (
      <div
        className={className}
        style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}
      >
        <Image
          src={videoBackground}
          alt={label ?? ""}
          fill
          sizes="(max-width: 768px) 100vw, 1080px"
          loading="eager"
          className="object-cover"
        />
        <video
          src={video}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-hidden
          className="preview-video absolute top-1/2 left-1/2 w-[82%] -translate-x-1/2 -translate-y-1/2 shadow-[0_16px_40px_rgba(0,0,0,0.3)]"
        />
      </div>
    );
  }

  if (video) {
    return (
      <div
        className={className}
        style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}
      >
        {src && (
          <Image
            src={src}
            alt={label ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 1080px"
            loading="eager"
            className="object-cover"
          />
        )}
        <video
          src={video}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-hidden
          className="preview-video absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  if (src) {
    return (
      <div
        className={className}
        style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}
      >
        <Image
          src={src}
          alt={label ?? ""}
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          loading="eager"
          className="object-cover"
        />
      </div>
    );
  }

  const gradient = GRADIENTS[tone % GRADIENTS.length];

  return (
    <div
      className={className}
      role="img"
      aria-label={label ?? "Project preview placeholder"}
      style={{
        background: gradient,
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(20,20,18,0.035) 0px, rgba(20,20,18,0.035) 1px, transparent 1px, transparent 12px)",
        }}
      />
    </div>
  );
}
