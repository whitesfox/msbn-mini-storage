/* eslint-disable react/no-unknown-property */
import extrudeSetting from "assets/extrudeSetting.json";
import { DoubleSide } from "three";
import { useMemo } from "react";
import { Shape } from "three";

interface IFramingModel {
  pos: [number, number, number];
  rot: [number, number, number];
  rafter: boolean;
  rigidDepth: number;
  outSideDepth: number;
  outSideDeviation: number;
  roofSlopeAngle: number;
  increaseLength: number;
}

export const FramingModel = ({
  pos,
  rot,
  rafter,
  rigidDepth,
  outSideDepth,
  outSideDeviation,
  roofSlopeAngle,
  increaseLength,
}: IFramingModel) => {
  const modelShapes = useMemo(() => {
    const smallModelShape = new Shape();

    smallModelShape.moveTo(-0.425 / 2, 0);
    smallModelShape.lineTo(0.425 / 2, 0);
    smallModelShape.lineTo(0.425 / 2, -0.05);
    smallModelShape.lineTo(-0.425 / 2, -0.05);

    smallModelShape.closePath();

    const midModelShape = new Shape();

    midModelShape.moveTo(-0.05, 0);
    midModelShape.lineTo(0.05, 0);
    midModelShape.lineTo(0.05, -0.9);
    midModelShape.lineTo(-0.05, -0.9);

    midModelShape.closePath();

    return {
      smallModelShape: smallModelShape,
      midModelShape: midModelShape,
    };
  }, []);

  return (
    <group
      rotation={rot}
      position={pos}
    >
      {/* inside */}
      <mesh position={[0, -0.9, -outSideDeviation + increaseLength]}>
        <extrudeGeometry
          args={[
            modelShapes.smallModelShape,
            {
              ...extrudeSetting,
              depth: rafter
                ? -rigidDepth + outSideDepth - 0.16 + increaseLength
                : -rigidDepth - Math.tan(roofSlopeAngle) * 0.5 + increaseLength,
            },
          ]}
        />
        <meshPhysicalMaterial
          side={DoubleSide}
          metalness={1}
          roughness={0.6}
          color={"#C0072C"}
        />
      </mesh>
      {/* outside */}
      <mesh position={[0, 0, increaseLength]}>
        <extrudeGeometry
          args={[
            modelShapes.smallModelShape,
            {
              ...extrudeSetting,
              depth: rafter
                ? -rigidDepth - Math.tan(roofSlopeAngle) - 0.4 + increaseLength
                : -rigidDepth + increaseLength,
            },
          ]}
        />
        <meshPhysicalMaterial
          side={DoubleSide}
          metalness={1}
          roughness={0.6}
          color={"#C0072C"}
        />
      </mesh>
      {/* middle */}
      <mesh
        rotation={[0, 0, 0]}
        position={[0, 0, increaseLength]}
      >
        <extrudeGeometry
          args={[
            modelShapes.midModelShape,
            {
              ...extrudeSetting,
              depth: rafter
                ? -rigidDepth - Math.sin(roofSlopeAngle) * 1 + increaseLength
                : -rigidDepth - Math.tan(roofSlopeAngle) * 0.5 + increaseLength,
            },
          ]}
        />
        <meshPhysicalMaterial
          side={DoubleSide}
          metalness={1}
          roughness={0.6}
          color={"#C0072C"}
        />
      </mesh>
    </group>
  );
};
