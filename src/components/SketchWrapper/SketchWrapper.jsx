import React, { useEffect, useRef } from "react";
import rough from "roughjs"; 
import styles from "./SketchWrapper.module.css"

const SketchWrapper = ({
  children,
  reload,
  stroke = "black",
  fill
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    const rc = rough.svg(svg);

    // Pulisce prima di ridisegnare
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    // Rettangolo sketchato
    const node = rc.rectangle(5, 5, svg.clientWidth - 10, svg.clientHeight - 10, {
      stroke,
  strokeWidth: 2,
  roughness: 2.5,
  bowing: 3,
  fill,
  fillStyle: "hachure",
  hachureGap: 2
    });

    svg.appendChild(node);

  }, [stroke, fill, reload]);

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