/* eslint-disable react/no-unknown-property */
import MovableInfoList from "utils/movable.json";
import { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { useStoreColor } from "store";

interface IMovable {
  name: string;
  type: string;
  width: number;
  height: number;
  depth: number;
}

interface IWindow {
  name: string;
  color: any;
}

export const Window = ({ name, color }: IWindow) => {
  const { wallTrimColor } = useStoreColor();
  const rightWindowTrimRef = useRef<any>();
  const leftWindowTrimRef = useRef<any>();
  const topWindowTrimRef = useRef<any>();
  const bottomWindowTrimRef = useRef<any>();

  let movableInfo: IMovable = {
    name: "",
    type: "",
    width: 0,
    height: 0,
    depth: 0,
  };
  movableInfo = MovableInfoList.filter((item) => {
    if (item.type === "Window" && item.name === name) return item;
  })[0];

  //Change the window trim color
  useFrame((_state, delta) => {
    easing.dampC(rightWindowTrimRef.current.color, wallTrimColor, 0.2, delta);
    easing.dampC(leftWindowTrimRef.current.color, wallTrimColor, 0.2, delta);
    easing.dampC(topWindowTrimRef.current.color, wallTrimColor, 0.2, delta);
    easing.dampC(bottomWindowTrimRef.current.color, wallTrimColor, 0.2, delta);
  });

  return (
    <group position={[0, 0, 0]}>
      {/* window glass */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry
          args={[
            movableInfo.width - 0.2,
            movableInfo.height - 0.2,
            movableInfo.depth,
          ]}
        />
        <meshStandardMaterial
          ref={color}
          transparent
          roughness={0.1}
          metalness={0.8}
          opacity={0.5}
        />
      </mesh>
      {/* window trim */}
      <group>
        {/* right trim */}
        <mesh position={[-(movableInfo.width - 0.2) / 2 - 0.05, 0, 0]}>
          <boxGeometry args={[0.1, movableInfo.height, movableInfo.depth]} />
          <meshStandardMaterial ref={rightWindowTrimRef} />
        </mesh>
        {/* left trim */}
        <mesh position={[(movableInfo.width - 0.2) / 2 + 0.05, 0, 0]}>
          <boxGeometry args={[0.1, movableInfo.height, movableInfo.depth]} />
          <meshStandardMaterial ref={leftWindowTrimRef} />
        </mesh>
        {/* top trim */}
        <mesh position={[0, (movableInfo.height - 0.1) / 2 + 0, 0]}>
          <boxGeometry
            args={[movableInfo.width - 0.2, 0.1, movableInfo.depth]}
          />
          <meshStandardMaterial ref={topWindowTrimRef} />
        </mesh>
        {/* bottom trim */}
        <mesh position={[0, (-movableInfo.height + 0.1) / 2, 0]}>
          <boxGeometry
            args={[movableInfo.width - 0.2, 0.1, movableInfo.depth]}
          />
          <meshStandardMaterial ref={bottomWindowTrimRef} />
        </mesh>
      </group>
    </group>
  );
};
