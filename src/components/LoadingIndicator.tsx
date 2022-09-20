import React from "react";

type LoadingIndicatorProps = {
  width?: string;
  height?: string;
};
export default function LoadingIndicator({
  width = "h-56",
  height = "w-56",
}: LoadingIndicatorProps) {
  return (
    <img
      src={"/ball-triangle.svg"}
      alt={"loading indicator"}
      className={`${width} ${height}`}
    />
  );
}
