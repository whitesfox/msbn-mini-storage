/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { memo, useMemo, useRef } from "react";
import { useStoreColor } from "store";
import { Shape } from "three";

interface ISingleSlopeOutsideCornerTrim {
  pos: [number, number, number];
  rot: [number, number, number];
  trimLength: number;
}

const trimRadius = 0.03;
const trimThickness = 0.01;

export const SingleSlopeOutsideCornerTrim = ({
  pos,
  rot,
  trimLength,
}: ISingleSlopeOutsideCornerTrim) => {
  const trimRef = useRef<any>();
  const { wallTrimColor } = useStoreColor();

  const trimModel = useMemo(() => {
    const modelShape = new Shape();
    modelShape.moveTo(0, 0);
    modelShape.lineTo(0, -0.4);
    modelShape.lineTo(0.1, -0.5);
    modelShape.lineTo(0.1, -0.5075);
    modelShape.bezierCurveTo(
      0.1,
      -0.55,
      0.1 + trimThickness * 2 + trimRadius,
      -0.55,
      0.1 + trimThickness * 2 + trimRadius,
      -0.5075,
    );
    modelShape.lineTo(0.1 + trimThickness * 2 + trimRadius, -0.5025);
    modelShape.lineTo(0.1 + trimThickness + trimRadius, -0.5025);
    modelShape.lineTo(0.1 + trimThickness + trimRadius, -0.5075);
    modelShape.bezierCurveTo(
      0.1 + trimThickness + trimRadius,
      -0.55,
      0.1 + trimThickness,
      -0.55,
      0.1 + trimThickness,
      -0.5075,
    );
    modelShape.lineTo(0.1 + trimThickness, -0.5);
    modelShape.lineTo(trimThickness, -0.4);
    modelShape.lineTo(trimThickness, -trimThickness);
    modelShape.lineTo(0.4, -trimThickness);
    modelShape.lineTo(0.5, -0.1);
    modelShape.lineTo(0.5075, -0.1 - trimThickness);
    modelShape.bezierCurveTo(
      0.55,
      -0.1 - trimThickness,
      0.55,
      -0.1 - trimThickness - trimRadius,
      0.5075,
      -0.1 - trimThickness - trimRadius,
    );
    modelShape.lineTo(0.5025, -0.1 - trimThickness - trimRadius);
    modelShape.lineTo(0.5025, -0.1 - 2 * trimThickness - trimRadius);
    modelShape.lineTo(0.5075, -0.1 - 2 * trimThickness - trimRadius);
    modelShape.bezierCurveTo(
      0.55,
      -0.1 - 2 * trimThickness - trimRadius,
      0.55,
      -0.1,
      0.5075,
      -0.1,
    );
    modelShape.lineTo(0.5, -0.1);
    modelShape.lineTo(0.4, 0);
    modelShape.closePath();

    return modelShape;
  }, []);

  const trimSetting = useMemo(() => {
    const setting = {
      depth: trimLength,
      steps: 1,
      bevelEnabled: false,
      bevelThickness: 0,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 1,
    };

    return setting;
  }, [trimLength]);

  useFrame((_state, delta) =>
    easing.dampC(trimRef.current.color, wallTrimColor, 0.2, delta),
  );

  return (
    <mesh
      rotation={rot}
      position={pos}
      castShadow
      receiveShadow
    >
      <extrudeGeometry args={[trimModel, trimSetting]} />
      <meshStandardMaterial
        metalness={0.7}
        roughness={0.5}
        ref={trimRef}
      />
    </mesh>
  );
};
