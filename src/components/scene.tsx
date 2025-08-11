import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Background from "./background";

const Scene = () => {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
      onPointerMove={(e) => {

      }}
    >
      <Suspense fallback={null}>
        <Background />
      </Suspense>
    </Canvas>
  );
};

export default Scene;