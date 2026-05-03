"use client";

import { useReactFlow } from "@xyflow/react";
import { ZoomIn, ZoomOut, Maximize2, MapPin, MapPinXInside } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { IconTile } from "@/components/ui/icon-tile";

export function Controls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const [showMinimap, setShowMinimap] = useState(false);

  function handleZoomIn() {
    zoomIn();
  }

  function handleZoomOut() {
    zoomOut();
  }

  function handleFitView() {
    fitView({ padding: 0.2, duration: 300 });
  }

  function handleToggleMinimap() {
    setShowMinimap(!showMinimap);
  }

  return (
    <ButtonGroup
      orientation="vertical"
      className="bg-oxcil-neutral-950 rounded-3xl border border-(--surface-feature-border) bg-[linear-gradient(to_bottom,oklch(20.3%_0.04_260/0.84),var(--oxcil-neutral-950))] p-1 shadow-[var(--surface-feature-shadow)]"
    >
      <Button
        className="border-border disabled:[&>svg]:text-muted-foreground bg-transparent hover:bg-(--button-icon-hover-bg) disabled:opacity-100"
        onClick={handleZoomIn}
        size="icon"
        title="Zoom in"
        variant="secondary"
      >
        <IconTile
          variant="brand"
          size="xxs"
          shape="pill"
          className="text-oxcil-brand-400 border-0 bg-transparent"
        >
          <ZoomIn className="size-4" />
        </IconTile>
      </Button>
      <Button
        className="border-border disabled:[&>svg]:text-muted-foreground bg-transparent hover:bg-(--button-icon-hover-bg) disabled:opacity-100"
        onClick={handleZoomOut}
        size="icon"
        title="Zoom out"
        variant="secondary"
      >
        <IconTile
          variant="neutral"
          size="xxs"
          shape="pill"
          className="text-oxcil-neutral-200 border-0 bg-transparent"
        >
          <ZoomOut className="size-4" />
        </IconTile>
      </Button>
      <Button
        className="border-border disabled:[&>svg]:text-muted-foreground bg-transparent hover:bg-(--button-icon-hover-bg) disabled:opacity-100"
        onClick={handleFitView}
        size="icon"
        title="Fit view"
        variant="secondary"
      >
        <IconTile
          variant="brand"
          size="xxs"
          shape="pill"
          className="border-0 bg-transparent text-[color:var(--oxcil-brand-400)]"
        >
          <Maximize2 className="size-4" />
        </IconTile>
      </Button>
      <Button
        className="border-border disabled:[&>svg]:text-muted-foreground bg-transparent hover:bg-[color:var(--button-icon-hover-bg)] disabled:opacity-100"
        onClick={handleToggleMinimap}
        size="icon"
        title={showMinimap ? "Hide minimap" : "Show minimap"}
        variant="secondary"
      >
      {showMinimap ? (
        <IconTile
          variant="success"
          size="xxs"
            shape="pill"
            className="text-oxcil-success-400 border-0 bg-transparent"
          >
            <MapPin className="size-4" />
          </IconTile>
        ) : (
          <IconTile
            variant="neutral"
            size="xxs"
            shape="pill"
            className="text-oxcil-neutral-200 border-0 bg-transparent"
          >
            <MapPinXInside className="size-4" />
          </IconTile>
        )}
      </Button>
    </ButtonGroup>
  );
}
