import type { ImageResponse } from "next/og";
import { renderAppIcon } from "@/lib/generate-app-icon";

export const contentType = "image/png";

export function generateImageMetadata() {
  return [
    { id: "180", size: { width: 180, height: 180 }, contentType: "image/png" },
    { id: "512", size: { width: 512, height: 512 }, contentType: "image/png" },
  ];
}

export default async function AppleIcon({
  id,
}: {
  id: Promise<string>;
}): Promise<ImageResponse> {
  const iconId = await id;
  const dim = Number(iconId) || 180;
  return renderAppIcon(dim);
}
