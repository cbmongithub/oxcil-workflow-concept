import type { ConnectionLineComponentProps } from "@xyflow/react";

var HALF = 0.5;
var CONNECTION_STROKE =
  "color-mix(in oklab, var(--oxcil-info-400) 58%, var(--oxcil-brand-300))";
var CONNECTION_RING = "var(--oxcil-brand-300)";
var CONNECTION_FILL = "var(--oxcil-neutral-950)";

export function Connection(props: ConnectionLineComponentProps) {
  var fromX = props.fromX;
  var fromY = props.fromY;
  var toX = props.toX;
  var toY = props.toY;

  return (
    <g>
      <path
        className="animated"
        d={`M${fromX},${fromY} C ${fromX + (toX - fromX) * HALF},${fromY} ${fromX + (toX - fromX) * HALF},${toY} ${toX},${toY}`}
        fill="none"
        stroke={CONNECTION_STROKE}
        strokeOpacity={0.96}
        strokeWidth={1.2}
      />
      <circle
        cx={toX}
        cy={toY}
        fill={CONNECTION_FILL}
        r={3}
        stroke={CONNECTION_RING}
        strokeWidth={1}
        opacity={0.95}
      />
    </g>
  );
}
