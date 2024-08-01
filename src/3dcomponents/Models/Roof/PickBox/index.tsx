/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/rules-of-hooks */
import { Image } from "@react-three/drei";
import { useMemo } from "react";
import { useStoreSize } from "store";
import { DoubleSide, Shape } from "three";

interface IPickBox {
  pos: [number, number, number];
  rot: [number, number, number];
  roofCapLength: number;
  color: string;
  direction: boolean;
}

export const PickBox = ({
  pos,
  rot,
  roofCapLength,
  color,
  direction,
}: IPickBox) => {
  const { width, deltaHeight } = useStoreSize();
  const flatRidgeCapLength = 1.1;
  const roofSlopeAngle = Math.atan((2 * deltaHeight) / width);
  const pointX = Math.cos(roofSlopeAngle) * flatRidgeCapLength;
  const pointY = Math.sin(roofSlopeAngle) * flatRidgeCapLength;

  const roofCapModel = useMemo(() => {
    const modelShape = new Shape();

    modelShape.moveTo(0, 0);
    modelShape.lineTo(pointX, -pointY);
    modelShape.lineTo(pointX, -pointY - 0.7);
    modelShape.lineTo(-pointX, -pointY - 0.7);
    modelShape.lineTo(-pointX, -pointY);
    modelShape.closePath();

    return modelShape;
  }, [roofSlopeAngle, deltaHeight]);

  const pickBoxSetting = useMemo(() => {
    const setting = {
      depth: 0.626,
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
    <group
      visible={true}
      rotation={rot}
      position={pos}
    >
      <mesh
        castShadow
        receiveShadow
        position={direction ? [0, 0, -0.4] : [0, 0, -0.23]}
      >
        <extrudeGeometry args={[roofCapModel, pickBoxSetting]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.5}
        />
      </mesh>
      <mesh position={[0, -(0.7 + pointY), 0]}>
        <boxGeometry args={[2 * pointX, 0.4, 0.14]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.5}
        />
      </mesh>
      <Image
        url="/material/MBSN.png"
        scale={[1.8, 0.3]}
        transparent
        side={DoubleSide}
        opacity={0.9}
        position={
          direction ? [0, -(0.3 + pointY), -0.45] : [0, -(0.3 + pointY), 0.45]
        }
        rotation={direction ? [-Math.PI, 0, Math.PI] : [0, 0, 0]}
      />
    </group>
  );
};
