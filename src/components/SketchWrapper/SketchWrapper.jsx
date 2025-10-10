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

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Aggiorna screenSize quando la finestra viene ridimensionata
  useEffect(() => {
    if (!dynamicResize) return;

    const handleResize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
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

  useEffect(() => {
  const svg = svgRef.current;
  const rc = rough.svg(svg);

  // Pulisce prima di ridisegnare
  while (svg.firstChild) svg.removeChild(svg.firstChild);

  let node;

  if (shape) {
     // Cerchio sketchato
    const r = Math.min(svg.clientWidth, svg.clientHeight) / 2 - 13;
    node = rc.circle(
      svg.clientWidth / 2,
      svg.clientHeight / 2,
      2 * r,
      {
        stroke,
        strokeWidth: 2,
        roughness: 2.5,
        bowing: 3,
        fill,
        fillStyle: "hachure",
        hachureGap: 2,
      }
    );
  } else {
    // Rettangolo sketchato
    node = rc.rectangle(
      5,
      5,
      svg.clientWidth - 10,
      svg.clientHeight - 10,
      {
        stroke,
        strokeWidth: 2,
        roughness: 2.5,
        bowing: 3,
        fill,
        fillStyle: "hachure",
        hachureGap: 2,
      }
    );
  }

  if (node) svg.appendChild(node);

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
