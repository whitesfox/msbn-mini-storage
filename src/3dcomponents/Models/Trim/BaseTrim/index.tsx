/* eslint-disable react/no-unknown-property */
import { useMemo } from "react";
import { DoubleSide, Shape } from "three";
import { useStoreColor } from "store";
import ExtrudeSetting from "assets/extrudeSetting.json";

const pointX1 = 0;
const pointY1 = 0;
const pointY7 = 0;
const radius = 0.03;
const thickness = 0.01;
const baseA3 = 5 / 8 / 12;
const baseAngle = Math.PI - (135 * Math.PI) / 180;
const baseA1 = (3 * 4 + 1) / 4 / 12;
const baseA2 = (1 * 4 + 3) / 4 / 12;
const pointX2 = pointX1;
const pointY2 = -baseA1;
const pointX3 = pointX2 + baseA2;
const pointY3 = pointY2;
const pointX4 = pointX3 + Math.cos(baseAngle) * baseA3;
const pointY4 = pointY3 - Math.sin(baseAngle) * baseA3;
const pointX5 = pointX4 - Math.cos(baseAngle) * (2 * thickness + radius);
const pointY5 = pointY4 - Math.sin(baseAngle) * (2 * thickness + radius);
const pointX6 = -thickness;
const pointY6 = pointY5;
const pointX7 = pointX6;

interface IBaseTrim {
  pos: [number, number, number];
  rot: [number, number, number];
  baseTrimLength: number;
}

export const BaseTrim = ({ pos, rot, baseTrimLength }: IBaseTrim) => {
  const { baseTrimColor } = useStoreColor();

  const baseTrimModel = useMemo(() => {
    const modelShape = new Shape();

    modelShape.moveTo(pointX1, pointY1);
    modelShape.lineTo(pointX2, pointY2);
    modelShape.lineTo(pointX3, pointY3);
    modelShape.lineTo(pointX4, pointY4);
    modelShape.bezierCurveTo(
      pointX4 + Math.cos(baseAngle) * (2 * thickness + radius),
      pointY4 - Math.sin(baseAngle) * (2 * thickness + radius),
      pointX4,
      pointY4 - (2 * thickness + radius) / Math.cos(baseAngle),
      pointX5,
      pointY5,
    );
    modelShape.lineTo(pointX6, pointY6);
    modelShape.lineTo(pointX7, pointY7);
    modelShape.closePath();

    return modelShape;
  }, []);

  return (
    <mesh
      position={pos}
      rotation={rot}
      castShadow
      receiveShadow
      renderOrder={6}
    >
      <extrudeGeometry
        args={[baseTrimModel, { ...ExtrudeSetting, depth: baseTrimLength }]}
      />
      <meshStandardMaterial
        color={baseTrimColor}
        side={DoubleSide}
      />
    </mesh>
  );
};
