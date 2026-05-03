import { ImageResponse } from "next/og";

import {
  OXCIL_LOGO_MARK_PATH,
  OXCIL_LOGO_TILE_BACKGROUND_HEX,
  OXCIL_LOGO_TILE_FOREGROUND_HEX,
  OXCIL_LOGO_TILE_TRANSFORM,
} from "@/lib/brand";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg width="64" height="64" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="12" fill={OXCIL_LOGO_TILE_BACKGROUND_HEX} />
        <path
          fill={OXCIL_LOGO_TILE_FOREGROUND_HEX}
          transform={OXCIL_LOGO_TILE_TRANSFORM}
          d={OXCIL_LOGO_MARK_PATH}
        />
      </svg>
    ),
    size
  );
}
