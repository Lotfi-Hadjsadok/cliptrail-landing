import type { ImageResponse } from "next/og";
import { renderAppIcon } from "@/lib/generate-app-icon";

export const contentType = "image/png";

export function generateImageMetadata() {
  return [
    { id: "32", size: { width: 32, height: 32 }, contentType: "image/png" },
    { id: "48", size: { width: 48, height: 48 }, contentType: "image/png" },
    { id: "96", size: { width: 96, height: 96 }, contentType: "image/png" },
    { id: "192", size: { width: 192, height: 192 }, contentType: "image/png" },
    { id: "512", size: { width: 512, height: 512 }, contentType: "image/png" },
  ];
}

export default async function Icon({
  id,
}: {
  id: Promise<string>;
}): Promise<ImageResponse> {
  const iconId = await id;
  const dim = Number(iconId) || 32;
  return renderAppIcon(dim);
}
