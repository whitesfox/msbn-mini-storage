/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Shape } from "three";
import { easing } from "maath";
import { useStoreColor } from "store";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

interface IHangOnTrimSidePall {
  pos: [number, number, number];
  rot: [number, number, number];
  trimLength: number;
}

const dim = 0.47;

export const HangOnTrimSidePall = ({
  pos,
  rot,
  trimLength,
}: IHangOnTrimSidePall) => {
  const { roofTrimColor } = useStoreColor();
  const trimRef = useRef<any>();

  const trimModel = useMemo(() => {
    const modelShape = new Shape();

    modelShape.moveTo(0, 0);
    modelShape.lineTo(-1 / 12, 0);
    modelShape.lineTo(
      -1 / 12 - Math.cos(Math.PI / 3) / 3,
      -Math.sin(Math.PI / 3) / 3,
    );
    modelShape.lineTo(-1 / 12, -(2 / 3) * Math.sin(Math.PI / 3));
    modelShape.lineTo(1 / 3 - 1 / 12, -(2 / 3) * Math.sin(Math.PI / 3));
    modelShape.lineTo(1 / 3 - 1 / 12, -(2 / 3) * Math.sin(Math.PI / 3) + dim);
    modelShape.lineTo(
      1 / 3 - 1 / 12 - 1 / 16,
      -(2 / 3) * Math.sin(Math.PI / 3) + dim,
    );
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
    easing.dampC(trimRef.current.color, roofTrimColor, 0.2, delta),
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
