import * as React from "react";

import {
  OXCIL_LOGO_MARK_PATH,
  OXCIL_LOGO_MARK_VIEWBOX,
  OXCIL_LOGO_TILE_BACKGROUND_HEX,
  OXCIL_LOGO_TILE_FOREGROUND_HEX,
  OXCIL_LOGO_TILE_TRANSFORM,
} from "@/lib/brand";
import { cn } from "@/lib/utils";

type LogoProps = React.ComponentPropsWithoutRef<"svg"> & {
  title?: string;
};

type LogoTileProps = LogoProps & {
  background?: string;
  foreground?: string;
};

const wordmarkPaths = [
  "M 423.249 209.1 L 435.014 209.1 L 435.014 290.9 L 423.249 290.9 L 423.249 209.1 Z",
  "M 394.27 237.643 L 406.04 237.643 L 406.04 290.9 L 394.27 290.9 L 394.27 237.643 Z",
  "M 400.034 214.312 C 401.974 214.312 403.63 214.91 405.01 216.107 C 406.39 217.305 407.08 218.771 407.08 220.508 C 407.08 222.203 406.39 223.669 405.01 224.906 C 403.63 226.139 401.974 226.756 400.034 226.756 C 398.221 226.756 396.627 226.13 395.247 224.876 C 393.867 223.624 393.176 222.166 393.176 220.508 C 393.176 218.886 393.867 217.448 395.247 216.192 C 396.627 214.939 398.221 214.312 400.034 214.312 Z",
  "M 380.573 277.527 L 380.573 287.945 C 374.668 289.916 368.892 290.9 363.248 290.9 C 353.936 290.9 346.511 288.431 340.974 283.491 C 335.433 278.55 332.664 271.931 332.664 263.632 C 332.664 255.26 335.357 248.507 340.745 243.371 C 346.134 238.241 353.223 235.674 362.015 235.674 C 365.08 235.674 367.827 235.934 370.264 236.452 C 372.697 236.975 375.704 237.95 379.283 239.378 L 379.283 250.607 C 373.333 247.211 367.816 245.514 362.73 245.514 C 357.428 245.514 353.074 247.183 349.67 250.522 C 346.265 253.858 344.563 258.114 344.563 263.285 C 344.563 268.726 346.404 273.049 350.09 276.254 C 353.776 279.458 358.744 281.06 364.992 281.06 C 369.518 281.06 374.712 279.883 380.573 277.527 Z",
  "M 310.844 237.643 L 325.912 237.643 L 301.405 263.866 L 327.656 290.9 L 312.59 290.9 L 293.905 271.796 L 276.258 290.9 L 261.45 290.9 L 286.473 263.866 L 261.45 237.643 L 276.258 237.643 L 293.905 255.934 L 310.844 237.643 Z",
  "M 240.991 251.073 C 244.828 254.391 246.747 258.576 246.747 263.632 C 246.747 268.726 244.904 272.904 241.218 276.165 C 237.533 279.428 232.802 281.06 227.028 281.06 C 221.207 281.06 216.443 279.449 212.736 276.224 C 209.031 273.001 207.18 268.842 207.18 263.751 C 207.18 258.616 208.99 254.391 212.607 251.073 C 216.232 247.753 220.865 246.093 226.51 246.093 C 232.329 246.093 237.155 247.753 240.991 251.073 Z M 204.365 244.382 C 198.31 249.574 195.281 256.068 195.281 263.864 C 195.281 271.583 198.277 278.019 204.267 283.171 C 210.259 288.323 217.718 290.9 226.64 290.9 C 235.863 290.9 243.513 288.364 249.59 283.288 C 255.667 278.211 258.707 271.834 258.707 264.153 C 258.707 256.243 255.711 249.673 249.721 244.442 C 243.728 239.214 236.205 236.6 227.156 236.6 C 218.019 236.6 210.421 239.195 204.365 244.382 Z",
];

function LogoTitle({ title }: { title?: string }) {
  return title ? <title>{title}</title> : null;
}

function Logo({ className, title = "Oxcil", ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 200 61.2"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("text-foreground h-8 w-auto", className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <LogoTitle title={title} />
      <g transform="matrix(0.880552, 0, 0, 0.880552, 46.387924, -46.671234)">
        <g transform="matrix(3.655451, 0, 0, 3.65395, -748.323181, -170.982544)">
          <g transform="matrix(0.312736, 0, 0, 0.312736, 190.302826, 55.173069)">
            <path fill="currentColor" d={OXCIL_LOGO_MARK_PATH} />
          </g>
          <g transform="matrix(0.310274, 0, 0, 0.310274, 190.382706, 55.296169)">
            <g transform="matrix(0.513762, 0, 0, 0.51242, -23.49369, -78.105003)">
              {wordmarkPaths.map((path) => (
                <path key={path} fill="currentColor" d={path} />
              ))}
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

function LogoMark({ className, title = "Oxcil", ...props }: LogoProps) {
  return (
    <svg
      viewBox={OXCIL_LOGO_MARK_VIEWBOX}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("text-foreground size-8", className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <LogoTitle title={title} />
      <path fill="currentColor" d={OXCIL_LOGO_MARK_PATH} />
    </svg>
  );
}

function LogoTile({
  className,
  title = "Oxcil",
  background = OXCIL_LOGO_TILE_BACKGROUND_HEX,
  foreground = OXCIL_LOGO_TILE_FOREGROUND_HEX,
  ...props
}: LogoTileProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("size-8", className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <LogoTitle title={title} />
      <rect width="64" height="64" rx="12" fill={background} />
      <path
        fill={foreground}
        transform={OXCIL_LOGO_TILE_TRANSFORM}
        d={OXCIL_LOGO_MARK_PATH}
      />
    </svg>
  );
}

export { Logo, LogoMark, LogoTile };
