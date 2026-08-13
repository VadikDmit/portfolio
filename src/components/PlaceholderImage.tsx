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
};

export default function PlaceholderImage({
  tone,
  label,
  className,
}: PlaceholderImageProps) {
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
