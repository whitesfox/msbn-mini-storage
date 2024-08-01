/* eslint-disable react/no-unknown-property */
import MovableInfoList from "utils/movable.json";
import { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { useStoreColor } from "store";
import { DoorHandle } from "../DoorHandle/DoorHandle";

interface IMovable {
  name: string;
  type: string;
  width: number;
  height: number;
  depth: number;
}

interface IDoor {
  rotation: [number, number, number];
  color: any;
  name: string;
}

export const WalkDoor = ({ name, color, rotation }: IDoor) => {
  const { wallTrimColor } = useStoreColor();
  const rightWalkDoorTrimMaterialRef = useRef<any>();
  const leftWalkDoorTrimMaterialRef = useRef<any>();
  const topWalkDoorTrimMaterialRef = useRef<any>();

  let doorInfo: IMovable = {
    name: "",
    type: "",
    width: 0,
    height: 0,
    depth: 0,
  };
  doorInfo = MovableInfoList.filter((item) => {
    if (item.name === name && item.type === "Walk-door") return item;
  })[0];

  //Change the walk-door trim color
  useFrame((_state, delta) => {
    easing.dampC(
      rightWalkDoorTrimMaterialRef.current.color,
      wallTrimColor,
      0.2,
      delta,
    );
    easing.dampC(
      leftWalkDoorTrimMaterialRef.current.color,
      wallTrimColor,
      0.2,
      delta,
    );
    easing.dampC(
      topWalkDoorTrimMaterialRef.current.color,
      wallTrimColor,
      0.2,
      delta,
    );
  });

  return (
    <group rotation={rotation}>
      {/* walk-door main */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry
          args={[doorInfo.width - 0.2, doorInfo.height - 0.1, doorInfo.depth]}
        />
        <meshStandardMaterial ref={color} />
      </mesh>
      {/* walk-door trim */}
      <group>
        {/* right walk-door trim */}
        <mesh position={[-(doorInfo.width - 0.2) / 2 - 0.05, 0, 0]}>
          <boxGeometry args={[0.1, doorInfo.height, doorInfo.depth]} />
          <meshStandardMaterial ref={rightWalkDoorTrimMaterialRef} />
        </mesh>
        {/* left walk-door trim */}
        <mesh position={[(doorInfo.width - 0.2) / 2 + 0.05, 0, 0]}>
          <boxGeometry args={[0.1, doorInfo.height, doorInfo.depth]} />
          <meshStandardMaterial ref={leftWalkDoorTrimMaterialRef} />
        </mesh>
        {/* top walk-door trim */}
        <mesh position={[0, (doorInfo.height - 0.1) / 2, 0]}>
          <boxGeometry args={[doorInfo.width - 0.2, 0.1, doorInfo.depth]} />
          <meshStandardMaterial ref={topWalkDoorTrimMaterialRef} />
        </mesh>
      </group>
      {/* walk-door handle */}
      <DoorHandle
        scale={[0.1, 0.1, 0.1]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        position={[-1, 0, 0.19]}
      />
    </group>
  );
};
