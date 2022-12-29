import { component$ } from "@builder.io/qwik";

type AvatarProps = { size?: number; url: string; alt: string };

export const Avatar = component$(({ size = 40, url, alt }: AvatarProps) => (
  <img width={size} alt={alt} src={url} className="rounded-full" />
));
