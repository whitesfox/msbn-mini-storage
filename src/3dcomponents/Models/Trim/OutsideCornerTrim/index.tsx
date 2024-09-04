/* eslint-disable react/no-unknown-property */
import { Shape } from "three";
import { easing } from "maath";
import { useStoreColor } from "store";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

interface IOutsideCornerTrim {
  count: number;
  pos: [number, number, number];
  rot: [number, number, number];
  eaveHeight: number;
  trimLength: number;
}

const trimRadius = 0.03;
const trimThickness = 0.01;

export const OutsideCornerTrim = ({
  pos,
  rot,
  trimLength,
}: IOutsideCornerTrim) => {
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

  useFrame((_state, delta) => {
    if (trimRef.current)
      easing.dampC(trimRef.current.color, wallTrimColor, 0.2, delta);
  });

  return (
    <group>
      <mesh
        rotation={rot}
        position={[pos[0], 0, pos[2]]}
        castShadow
        receiveShadow
      >
        <extrudeGeometry
          args={[
            trimModel,
            {
              depth: trimLength,
              steps: 1,
              bevelEnabled: false,
              bevelThickness: 0,
              bevelSize: 0,
              bevelOffset: 0,
              bevelSegments: 1,
            },
          ]}
        />
        <meshStandardMaterial
          metalness={0.7}
          roughness={0.5}
          ref={trimRef}
        />
      </mesh>
    </group>
  );
};
