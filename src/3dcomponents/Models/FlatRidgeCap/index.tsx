/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo } from "react";
import { useStoreSize } from "store";
import { Shape } from "three";

interface IFlatRidgeCap {
  pos: [number, number, number];
  rot: [number, number, number];
  roofCapLength: number;
  color: string;
}

export const FlatRidgeCap = ({
  pos,
  rot,
  roofCapLength,
  color,
}: IFlatRidgeCap) => {
  const { width, deltaHeight } = useStoreSize();

  const thickness = 0.01;
  const flatRidgeCapLength = (11 * 2 + 1) / 2 / 12;
  const radius = 0.05;

  const roofSlopeAngle = Math.atan((2 * deltaHeight) / width);
  const pointX = Math.cos(roofSlopeAngle) * flatRidgeCapLength;
  const pointY = Math.sin(roofSlopeAngle) * flatRidgeCapLength;

  const roofCapModel = useMemo(() => {
    const modelShape = new Shape();

    modelShape.moveTo(0, 0);
    modelShape.lineTo(pointX, -pointY);
    modelShape.bezierCurveTo(
      pointX + Math.cos(roofSlopeAngle) * 0.1,
      -pointY - Math.sin(roofSlopeAngle) * 0.1,
      pointX +
        Math.cos(roofSlopeAngle) * 0.1 -
        radius / Math.sin(roofSlopeAngle),
      -pointY -
        Math.sin(roofSlopeAngle) * 0.1 -
        radius / Math.cos(roofSlopeAngle),
      pointX - Math.cos(roofSlopeAngle) * radius,
      -pointY - Math.sin(roofSlopeAngle) * radius,
    );

    modelShape.lineTo(pointX - Math.sin(roofSlopeAngle) * radius, -pointY);
    modelShape.lineTo(pointX - Math.tan(roofSlopeAngle) * thickness, -pointY);

    modelShape.lineTo(0, -thickness);
    modelShape.lineTo(-pointX + Math.tan(roofSlopeAngle) * thickness, -pointY);
    modelShape.lineTo(-pointX + Math.sin(roofSlopeAngle) * radius, -pointY);
    modelShape.lineTo(
      -pointX + Math.cos(roofSlopeAngle) * radius,
      -pointY - Math.sin(roofSlopeAngle) * radius,
    );
    modelShape.bezierCurveTo(
      -pointX -
        Math.cos(roofSlopeAngle) * 0.1 +
        radius / Math.sin(roofSlopeAngle),
      -pointY -
        Math.sin(roofSlopeAngle) * 0.1 -
        radius / Math.cos(roofSlopeAngle),
      -pointX - Math.cos(roofSlopeAngle) * 0.1,
      -pointY - Math.sin(roofSlopeAngle) * 0.1,
      -pointX,
      -pointY,
    );

    modelShape.closePath();

    return modelShape;
  }, [roofSlopeAngle, deltaHeight]);

  const roofCapSetting = useMemo(() => {
    const setting = {
      depth: roofCapLength,
      steps: 1,
      bevelEnabled: false,
      bevelThickness: 0,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 1,
    };
    return setting;
  }, [roofCapLength]);
  return (
    <mesh
      rotation={[rot[0], rot[1], rot[2]]}
      position={[pos[0], pos[1] - 0.05, pos[2]]}
      castShadow
      receiveShadow
    >
      <extrudeGeometry args={[roofCapModel, roofCapSetting]} />
      <meshStandardMaterial
        color={color}
        metalness={0.7}
        roughness={0.5}
      />
    </mesh>
  );
};
