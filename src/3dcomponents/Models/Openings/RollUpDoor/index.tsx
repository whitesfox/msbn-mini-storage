/* eslint-disable react/no-unknown-property */
import MovableInfoList from "utils/movable.json";
import extrudeSetting from "assets/extrudeSetting.json";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Shape } from "three";
import { easing } from "maath";
import { useStoreColor } from "store";

interface IMovable {
  name: string;
  type: string;
  width: number;
  height: number;
  depth: number;
}

interface IRollUpDoor {
  name: string;
  color: any;
}

export const RollUpDoor = ({ name, color }: IRollUpDoor) => {
  const { wallTrimColor } = useStoreColor();
  const rightRollUpDoorTrim = useRef<any>();
  const leftRollUpDoorTrim = useRef<any>();
  const topRollUpDoorTrim = useRef<any>();

  let movableInfo: IMovable = {
    name: "",
    type: "",
    width: 0,
    height: 0,
    depth: 0,
  };
  movableInfo = MovableInfoList.filter((item) => item.name === name)[0];

  //Roll Up door model shape
  const PBU_PanelModel = useMemo(() => {
    const modelShape = new Shape();
    modelShape.moveTo(0, 0);
    for (let i = 0; i < movableInfo.height - 1; i++) {
      modelShape.lineTo(0.05 + i, 0);
      modelShape.lineTo(0.1 + i, 0.05);
      modelShape.lineTo(0.15 + i, 0.05);
      modelShape.lineTo(0.2 + i, 0);
      modelShape.lineTo(0.3 + i, 0);
      modelShape.lineTo(0.35 + i, 0.05);
      modelShape.lineTo(0.4 + i, 0.05);
      modelShape.lineTo(0.45 + i, 0);
      modelShape.lineTo(0.55 + i, 0);
      modelShape.lineTo(0.6 + i, 0.05);
      modelShape.lineTo(0.65 + i, 0.05);
      modelShape.lineTo(0.7 + i, 0);
      modelShape.lineTo(0.8 + i, 0);
      modelShape.lineTo(0.85 + i, 0.05);
      modelShape.lineTo(0.9 + i, 0.05);
      modelShape.lineTo(0.95 + i, 0);
      modelShape.lineTo(1 + i, 0);
    }
    modelShape.lineTo(movableInfo.height - 0.1, 0);
    modelShape.lineTo(movableInfo.height - 0.1, -0.1);
    modelShape.lineTo(0, -0.1);
    modelShape.closePath();

    return modelShape;
  }, [movableInfo.height]);

  useFrame((_state, delta) => {
    easing.dampC(rightRollUpDoorTrim.current.color, wallTrimColor, 0.2, delta);
    easing.dampC(leftRollUpDoorTrim.current.color, wallTrimColor, 0.2, delta);
    easing.dampC(topRollUpDoorTrim.current.color, wallTrimColor, 0.2, delta);
  });

  return (
    <group position={[0, 0, 0]}>
      {/* roll-up door main */}
      <mesh
        position={[-movableInfo.width / 2 + 0.1, -movableInfo.height / 2, -0.5]}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
      >
        <extrudeGeometry
          args={[
            PBU_PanelModel,
            { ...extrudeSetting, depth: movableInfo.width - 0.2 },
          ]}
        />
        <meshStandardMaterial
          ref={color}
          metalness={0.7}
          roughness={0.1}
        />
      </mesh>
      {/* roll-up door trim */}
      <group position={[0, 0, -0.25]}>
        {/* right roll-up door trime */}
        <mesh position={[movableInfo.width / 2 - 0.05, -0.05, 0]}>
          <boxGeometry
            args={[0.1, movableInfo.height - 0.1, movableInfo.depth + 0.5]}
          />
          <meshStandardMaterial
            ref={rightRollUpDoorTrim}
            metalness={0.7}
            roughness={0.5}
          />
        </mesh>
        {/* left roll-up door trim */}
        <mesh position={[-movableInfo.width / 2 + 0.05, -0.05, 0]}>
          <boxGeometry
            args={[0.1, movableInfo.height - 0.1, movableInfo.depth + 0.5]}
          />
          <meshStandardMaterial
            ref={leftRollUpDoorTrim}
            metalness={0.7}
            roughness={0.5}
          />
        </mesh>
        {/* top roll-up door trim */}
        <mesh position={[0, movableInfo.height / 2 - 0.05, 0]}>
          <boxGeometry
            args={[movableInfo.width, 0.1, movableInfo.depth + 0.5]}
          />
          <meshStandardMaterial
            ref={topRollUpDoorTrim}
            metalness={0.7}
            roughness={0.5}
          />
        </mesh>
      </group>
    </group>
  );
};
