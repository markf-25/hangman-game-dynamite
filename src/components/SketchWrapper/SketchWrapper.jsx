import { useState, useEffect, useRef } from "react";
import rough from "roughjs"; 
import styles from "./SketchWrapper.module.css"

const SketchWrapper = ({
  shape,
  children,
  reload,
  stroke = "black",
  fill,
  dynamicResize = true
}) => {
  const svgRef = useRef(null);
  const resizeTimeout = useRef(null);

  const shapeSettings = {
        fill: fill,
        stroke: stroke,
        strokeWidth: 2,
        roughness: 2.5,
        bowing: 3,
        fillStyle: "hachure",
        hachureGap: 2
  }

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
  if (!dynamicResize) return;

  const handleResize = () => {
    if (resizeTimeout.current) clearTimeout(resizeTimeout.current);

    resizeTimeout.current = setTimeout(() => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 300);
  };

  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
    if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
  };
}, [dynamicResize]);

  // Re-rendering every time the window is resized

const drawSketch = () => {
  const svg = svgRef.current;
  const rc = rough.svg(svg);

  while (svg.firstChild) svg.removeChild(svg.firstChild);

  const margin = Math.max(
    5,
    (shapeSettings.strokeWidth || 1) + Math.round((shapeSettings.roughness || 1) * 3)
  );

  let node;

  if (shape) {
    const width = svg.clientWidth;
    const height = svg.clientHeight;
    const rx = width / 2 - margin;
    const ry = height / 2 - margin;
    const cx = width / 2;
    const cy = height / 2;

    node = rc.ellipse(cx, cy, rx * 2, ry * 2, shapeSettings);
  } else {
    const padding = 5;
    node = rc.rectangle(padding, padding, svg.clientWidth - padding * 2, svg.clientHeight - padding * 2, shapeSettings);
  }

  if (node) svg.appendChild(node);
};

useEffect(() => {
  const frameId = window.requestAnimationFrame(drawSketch);
  return () => cancelAnimationFrame(frameId);
}, [fill, stroke, reload, screenSize]);

  return <>
    <div className={styles.container}>
      <svg ref={svgRef} className={styles.svg} />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  </>;
}

export default SketchWrapper
