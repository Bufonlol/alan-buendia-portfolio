import Image from "next/image";

type AssetFrameProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export function AssetFrame({
  src,
  alt,
  className = "",
  imageClassName = "",
  sizes = "50vw",
  priority = false,
}: AssetFrameProps) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-contain ${imageClassName}`}
      />
    </div>
  );
}
